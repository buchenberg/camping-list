import { createMutable } from "solid-js/store";
import { ICampingItem } from "./ICampingItem";

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
    const index: ICampingItem = this.items.find((b: ICampingItem) => b.name === item.name);
    const myindex = this.items.findIndex((b: ICampingItem) => b.name === index.name);
    this.items[myindex] = item;
    window.localStorage.setItem("items", JSON.stringify(this.items));
  },
  delete(name: string) {
    let newlist = this.items.filter((b: ICampingItem) => b.name !== name);
    this.items = newlist;
    window.localStorage.setItem("items", JSON.stringify(this.items));
  },
  deleteAll() {
    this.items = [];
    window.localStorage.setItem("items", JSON.stringify(this.items));
  },
});