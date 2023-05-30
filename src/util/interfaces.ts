export enum MapType {
    NONE = 'none',
    SMALL = 'small',
    SMALL_HD = 'small_hd',
    LARGE = 'large',
    LARGE_HD = 'large_hd',
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
    index: number;
    top: number;
    left: number;
    size: number;
    links?: number[];
}

export interface IMapData {
    settings: {
        type: MapType,
        width: number;
        height: number;
        defaultSize: number
        startLocation: number
    };
    items: IMapLocationItem[]
}

export type IMapJSONData = [IMapJSONSettings, IMapJSONItem[]];

export type IMapJSONSettings = [
    width: number,
    height: number,
    defaultSize: number,
    startLocation: number
];

export type IMapJSONItem = [
    top: number,
    left: number,
    links: number[],
    size: number | undefined
];

export interface ILocationLinkItem {
    location: IMapLocationItem;
    visitIndex: number;
}

export interface ILocationPathListItem {
    index: number;
    source: ILocationLinkItem;
    target: ILocationLinkItem;
    mutualVisitIndex: number;
}

export type ILocationPathList = ILocationPathListItem[];