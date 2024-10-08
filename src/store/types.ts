export interface ICampingItem {
  name: string;
  uom: string;
  qty: number;
}


export interface ICampingTrip {
  location: string;
  dateStart: string;
  dateEnd: string;
  items: string[]
}

export interface IPersistedObject {
  key: string;
}

export interface IPersistedCampingItem extends IPersistedObject {
  value: ICampingItem;
}

export interface IPersistedCampingTrip extends IPersistedObject {
  value: ICampingTrip;
}


