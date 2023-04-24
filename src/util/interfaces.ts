export enum MapType {
    NONE = 'none',
    SMALL = 'small',
    LARGE = 'large'
}

export type ILocationPath = IMapLocationItem[];

export interface IPathItem {
    item: IMapLocationItem;
    visitsCount: number;
}

export interface IMapSize {
    width: number;
    height: number;
    ratio?: number;
}

export interface IMapLocationItem {
    top: number;
    left: number;
    size: number;
}

export interface IMapData {
    settings: {
        type: MapType,
        width: number;
        height: number;
        defaultSize: number
    };
    items: IMapLocationItem[]
}

export type IMapJSONData = [IMapJSONSettings, IMapJSONItem[]];

export type IMapJSONSettings = [
    width: number,
    height: number,
    defaultSize: number
];

export type IMapJSONItem = [
    top: number,
    left: number,
    links: number[],
    size: number | undefined
];