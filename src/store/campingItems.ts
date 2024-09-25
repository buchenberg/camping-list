import { createMutable } from "solid-js/store";
import { ICampingItem } from "./ICampingItem";
import localforage from "localforage";
import { v4 as uuidv4 } from 'uuid';

localforage.config({
  driver: localforage.INDEXEDDB,
  name: 'campingList',
  version: 1.0,
  storeName: 'camping_list_items',
  description: 'some description'
});

export interface IItem {
  key: string,
  value: ICampingItem
}

const items: IItem[] = [];

export const campingItems = createMutable({
  items: await localforage.iterate(function (value: ICampingItem, key, iterationNumber) {
    items.push({ key, value });
  }).then(function () {
    return items;
  }),
  get count() {
    return this.items.length;
  },
  addItem(campingItem: ICampingItem) {
    const item: IItem = { key: uuidv4(), value: campingItem }
    this.items.push(item);
    localforage.setItem(item.key, item.value)
      .then(function () {
        return localforage.getItem(item.key);
      }).then(function (value) {
        console.log(value);
      }).catch(function (err) {
        console.log(err);
      });
  },
  editItem(campingItem: ICampingItem) {
    //const index: ICampingItem = this.items.find((b: ICampingItem) => b.name === item.name);
    //const myindex = this.items.findIndex((b: ICampingItem) => b.name === index.name);
    //this.items[myindex] = item;
    //window.localStorage.setItem("items", JSON.stringify(this.items));
  },
  delete(key: string) {
    let newlist = this.items.filter((b: IItem) => b.key !== key);
    this.items = newlist;
    localforage.removeItem(key).then(function () {
      // Run this code once the key has been removed.
      console.log('Key is cleared!');
    }).catch(function (err) {
      // This code runs if there were any errors
      console.log(err);
    });
  },
  deleteAll() {
    //this.items = [];
    //window.localStorage.setItem("items", JSON.stringify(this.items));
  },
});