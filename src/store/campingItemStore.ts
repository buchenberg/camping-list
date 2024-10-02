import { createMutable } from "solid-js/store";
import { ICampingItem } from "./types";
import localforage from "localforage";
import { IPersistedCampingItem } from "./types";
import messageBus from "../events/messageBus";

var campingItemData = localforage.createInstance({
  driver: localforage.INDEXEDDB,
  name: 'campingList',
  version: 1.0,
  storeName: 'camping_list_items'
});

const persistedItems: IPersistedCampingItem[] = [];

export const campingItemStore = createMutable({
  items: await campingItemData.iterate(function (value: ICampingItem, key, iterationNumber) {
    persistedItems.push({ key, value });
  }).then(function () {
    return persistedItems;
  }),
  get count() {
    return this.items.length;
  },
  addItem(campingItem: ICampingItem) {
    if (this.items.find(x => x.key === campingItem.name)) {
      messageBus.emit(`${campingItem.name} already exists!`);
      return;
    }
    const item: IPersistedCampingItem = { key: campingItem.name, value: campingItem }
    this.items.push(item);
    campingItemData.setItem(item.key, item.value).then(function (value) {
      // Do other things once the value has been saved.
      messageBus.emit(`${item.key} added!`);
    }).catch(function (err) {
      // This code runs if there were any errors
      messageBus.emit(err);
    });
  },
  editItem(campingItem: ICampingItem) {
    const persistedItem = this.items.find((b: IPersistedCampingItem) => b.key === campingItem.name);
    if(!persistedItem){
      messageBus.emit(`${campingItem.name} doesn't exist!`);
      return;
    }
    const myindex = this.items.findIndex((b: IPersistedCampingItem) => b.key === persistedItem.key);
    this.items[myindex].value = campingItem;
    campingItemData.setItem(campingItem.name, campingItem).then(function (value) {
      // Do other things once the value has been saved.
      messageBus.emit(`${campingItem.name} saved!`);
    }).catch(function (err) {
      // This code runs if there were any errors
      messageBus.emit(err);
    });
  },
  delete(key: string) {
    let newlist = this.items.filter((b: IPersistedCampingItem) => b.key !== key);
    this.items = newlist;
    campingItemData.removeItem(key).then(function () {
      // Run this code once the key has been removed.
      messageBus.emit(`${key} deleted!`);
    }).catch(function (err) {
      // This code runs if there were any errors
      messageBus.emit(err);
    });
  },
  deleteAll() {
    this.items.length = 0;
    campingItemData.clear().then(function () {
      messageBus.emit(`List cleared!`);
    }).catch(function (err) {
      // This code runs if there were any errors
      messageBus.emit(err);
    });
  },
});