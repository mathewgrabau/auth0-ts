// Defines the object type for the collection of the items.

import { Item } from "./item.interface";

export interface Items {
    [key: number]: Item;
}