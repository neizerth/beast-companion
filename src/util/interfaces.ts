import {MapLocationItem} from "../components/organisms/GameMap/GameMap";

export enum MapType {
    NONE = 'none',
    SMALL = 'small',
    LARGE = 'large'
}

export type ILocationPath = MapLocationItem[];

export interface IPathItem {
    item: MapLocationItem;
    visitsCount: number;
}