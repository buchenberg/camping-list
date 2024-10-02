import { createMutable } from "solid-js/store";
import localforage from "localforage";
import { v4 as uuidv4 } from 'uuid';
import { IPersistedCampingTrip } from "./types";
import { eventBus } from "../App";
import { ICampingTrip } from "./types";

const campingTripStore = localforage.createInstance({
  driver: localforage.INDEXEDDB,
  name: 'campingList',
  version: 1.0,
  storeName: 'camping_trips'
});

const persistedItems: IPersistedCampingTrip[] = [];

export const campingTrips = createMutable({
  items: await campingTripStore.iterate(function (value: ICampingTrip, key, iterationNumber) {
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
    campingTripStore.setItem(item.key, item.value).then(function (value) {
      // Do other things once the value has been saved.
      eventBus.emit(`${item.key} added!`);
    }).catch(function (err) {
      // This code runs if there were any errors
      eventBus.emit(err);
    });
  },
  editItem(trip: IPersistedCampingTrip) {
    const persistedItem = this.items.find((b: IPersistedCampingTrip) => b.key === trip.key);
    if(!persistedItem){
      eventBus.emit(`${trip.key} doesn't exist!`);
      return;
    }
    const myindex = this.items.findIndex((b: IPersistedCampingTrip) => b.key === persistedItem.key);
    this.items[myindex].value = trip.value;
    campingTripStore.setItem(trip.key, trip).then(function (value) {
      // Do other things once the value has been saved.
      eventBus.emit(`Trip ${value.key} saved!`);
    }).catch(function (err) {
      // This code runs if there were any errors
      eventBus.emit(err);
    });
  },
  delete(key: string) {
    let newlist = this.items.filter((b: IPersistedCampingTrip) => b.key !== key);
    this.items = newlist;
    campingTripStore.removeItem(key).then(function () {
      // Run this code once the key has been removed.
      eventBus.emit(`${key} deleted!`);
    }).catch(function (err) {
      // This code runs if there were any errors
      eventBus.emit(err);
    });
  },
  deleteAll() {
    this.items.length = 0;
    campingTripStore.clear().then(function () {
      eventBus.emit(`List cleared!`);
    }).catch(function (err) {
      // This code runs if there were any errors
      eventBus.emit(err);
    });
  },
});