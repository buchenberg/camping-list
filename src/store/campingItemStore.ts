import { createMutable } from "solid-js/store";
import { ICampingItem } from "./types";
import localforage from "localforage";
import { IPersistedCampingItem } from "./types";
import messageBus, { publishEvent } from "../events/messageBus";

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
      publishEvent('notification', { message: `${campingItem.name} already exists!` });
      return;
    }
    const item: IPersistedCampingItem = { key: campingItem.name, value: campingItem }
    this.items.push(item);
    campingItemData.setItem(item.key, item.value).then(function (value) {
      publishEvent('notification', { message: `${item.key} added!` });
    }).catch(function (err) {
      publishEvent('notification', { message: err.toString() });
    });
  },
  editItem(campingItem: ICampingItem) {
    const persistedItem = this.items.find((b: IPersistedCampingItem) => b.key === campingItem.name);
    if(!persistedItem){
      publishEvent('notification', { message: `${campingItem.name} doesn't exist!` });
      return;
    }
    const myindex = this.items.findIndex((b: IPersistedCampingItem) => b.key === persistedItem.key);
    this.items[myindex].value = campingItem;
    campingItemData.setItem(campingItem.name, campingItem).then(function (value) {
      publishEvent('notification', { message: `${campingItem.name} saved!` });
    }).catch(function (err) {
      publishEvent('notification', { message: err.toString() });
    });
  },
  delete(key: string) {
    let newlist = this.items.filter((b: IPersistedCampingItem) => b.key !== key);
    this.items = newlist;
    campingItemData.removeItem(key).then(function () {
      publishEvent('notification', { message: `${key} deleted!` });
    }).catch(function (err) {
      publishEvent('notification', { message: err.toString() });
    });
  },
  deleteAll() {
    this.items.length = 0;
    campingItemData.clear().then(function () {
      publishEvent('notification', { message: 'List cleared!' });
    }).catch(function (err) {
      publishEvent('notification', { message: err.toString() });
    });
  },
});