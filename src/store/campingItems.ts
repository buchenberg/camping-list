import { createMutable } from "solid-js/store";
import { ICampingItem } from "./types";
import localforage from "localforage";
import { IPersistedCampingItem } from "./types";
import { eventBus } from "../App";

var campingItemStore = localforage.createInstance({
  driver: localforage.INDEXEDDB,
  name: 'campingList',
  version: 1.0,
  storeName: 'camping_list_items'
});

const persistedItems: IPersistedCampingItem[] = [];

export const campingItems = createMutable({
  items: await campingItemStore.iterate(function (value: ICampingItem, key, iterationNumber) {
    persistedItems.push({ key, value });
  }).then(function () {
    return persistedItems;
  }),
  get count() {
    return this.items.length;
  },
  addItem(campingItem: ICampingItem) {
    if (this.items.find(x => x.key === campingItem.name)) {
      eventBus.emit(`${campingItem.name} already exists!`);
      return;
    }
    const item: IPersistedCampingItem = { key: campingItem.name, value: campingItem }
    this.items.push(item);
    campingItemStore.setItem(item.key, item.value).then(function (value) {
      // Do other things once the value has been saved.
      eventBus.emit(`${item.key} added!`);
    }).catch(function (err) {
      // This code runs if there were any errors
      eventBus.emit(err);
    });
  },
  editItem(campingItem: ICampingItem) {
    const persistedItem = this.items.find((b: IPersistedCampingItem) => b.key === campingItem.name);
    if(!persistedItem){
      eventBus.emit(`${campingItem.name} doesn't exist!`);
      return;
    }
    const myindex = this.items.findIndex((b: IPersistedCampingItem) => b.key === persistedItem.key);
    this.items[myindex].value = campingItem;
    campingItemStore.setItem(campingItem.name, campingItem).then(function (value) {
      // Do other things once the value has been saved.
      eventBus.emit(`${campingItem.name} saved!`);
    }).catch(function (err) {
      // This code runs if there were any errors
      eventBus.emit(err);
    });
  },
  delete(key: string) {
    let newlist = this.items.filter((b: IPersistedCampingItem) => b.key !== key);
    this.items = newlist;
    campingItemStore.removeItem(key).then(function () {
      // Run this code once the key has been removed.
      eventBus.emit(`${key} deleted!`);
    }).catch(function (err) {
      // This code runs if there were any errors
      eventBus.emit(err);
    });
  },
  deleteAll() {
    this.items.length = 0;
    campingItemStore.clear().then(function () {
      eventBus.emit(`List cleared!`);
    }).catch(function (err) {
      // This code runs if there were any errors
      eventBus.emit(err);
    });
  },
});