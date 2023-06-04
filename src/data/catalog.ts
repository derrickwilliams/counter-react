import { TallyItem } from "./types"
import { items } from './items';

export interface CatalogControl {
    getItems: () => TallyItem[]
}

export const initCatalog = (): Promise<CatalogControl> => {
    const getItems = () => {
        return items;
    }

    return new Promise((res, rej) => {
        // load from data source

        return res({ getItems });
    });
}
