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

export interface MapSize {
    width: number;
    height: number;
    ratio?: number;
}

export interface MapLocationItem {
    top: number;
    left: number;
    size: number;
}

export interface MapData {
    settings: {
        type: MapType,
        width: number;
        height: number;
        defaultSize: number
    };
    items: MapLocationItem[]
}

export type MapJSONData = [MapJSONSettings, MapJSONItem[]];

export type MapJSONSettings = [
    width: number,
    height: number,
    defaultSize: number
];

export type MapJSONItem = [
    top: number,
    left: number,
    links: number[],
    size: number | undefined
];