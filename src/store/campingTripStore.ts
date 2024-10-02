import { createMutable } from "solid-js/store";
import localforage from "localforage";
import { v4 as uuidv4 } from 'uuid';
import { IPersistedCampingTrip } from "./types";
import { ICampingTrip } from "./types";
import messageBus from "../events/messageBus";

const campingTripData = localforage.createInstance({
  driver: localforage.INDEXEDDB,
  name: 'campingList',
  version: 1.0,
  storeName: 'camping_trips'
});

const persistedItems: IPersistedCampingTrip[] = [];

export const campingTripStore = createMutable({
  items: await campingTripData.iterate(function (value: ICampingTrip, key, iterationNumber) {
    persistedItems.push({ key, value });
  }).then(function () {
    return persistedItems;
  }),
  get count() {
    return this.items.length;
  },
  addItem(trip: ICampingTrip) {

    const item: IPersistedCampingTrip = { key: uuidv4(), value: trip }
    this.items.push(item);
    campingTripData.setItem(item.key, item.value).then(function (value) {
      // Do other things once the value has been saved.
      messageBus.emit(`${item.key} added!`);
    }).catch(function (err) {
      // This code runs if there were any errors
      messageBus.emit(err);
    });
  },
  editItem(trip: IPersistedCampingTrip) {
    const persistedItem = this.items.find((b: IPersistedCampingTrip) => b.key === trip.key);
    if(!persistedItem){
      messageBus.emit(`${trip.key} doesn't exist!`);
      return;
    }
    const myindex = this.items.findIndex((b: IPersistedCampingTrip) => b.key === persistedItem.key);
    this.items[myindex].value = trip.value;
    campingTripData.setItem(trip.key, trip).then(function (value) {
      // Do other things once the value has been saved.
      messageBus.emit(`Trip ${value.key} saved!`);
    }).catch(function (err) {
      // This code runs if there were any errors
      messageBus.emit(err);
    });
  },
  delete(key: string) {
    let newlist = this.items.filter((b: IPersistedCampingTrip) => b.key !== key);
    this.items = newlist;
    campingTripData.removeItem(key).then(function () {
      // Run this code once the key has been removed.
      messageBus.emit(`${key} deleted!`);
    }).catch(function (err) {
      // This code runs if there were any errors
      messageBus.emit(err);
    });
  },
  deleteAll() {
    this.items.length = 0;
    campingTripData.clear().then(function () {
      messageBus.emit(`List cleared!`);
    }).catch(function (err) {
      // This code runs if there were any errors
      messageBus.emit(err);
    });
  },
});