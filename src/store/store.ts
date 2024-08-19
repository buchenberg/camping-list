import { createStore, createMutable } from "solid-js/store";
import { ICampingItem } from '../CampingItemList';

// Initialize store
// const newlist = list.map((el) => el);
export const campingItemList = createMutable({
  items: JSON.parse(window.localStorage.getItem("items") ?? "[]"),
  get count() {
    return this.items.length;
  },
  addItem(item: ICampingItem) {
    this.items.push(item);
    window.localStorage.setItem("items", JSON.stringify(this.items));
  },
  editItem(item: ICampingItem) {
    console.log("jsr item id", item);
    console.log("hhr", this.items);
    const index: ICampingItem = this.items.find((b: ICampingItem) => b.name === item.name);
    console.log("index", index);
    console.log("print", this.items[index.name]);
    const myindex = this.items.findIndex((b: ICampingItem) => b.name === index.name);
    console.log("myindex", myindex);
    this.items[myindex] = item;
    window.localStorage.setItem("items", JSON.stringify(this.items));
  },
  delete(name: string) {
    let newlist = this.items.filter((b: ICampingItem) => b.name !== name);
    console.log("new list", newlist);
    this.items = newlist;
    window.localStorage.setItem("items", JSON.stringify(this.items));
  },
  deleteAll() {
    this.items = [];
    window.localStorage.setItem("items", JSON.stringify(this.items));
  },
});