import {GameMapHunter} from "./hunters";

export enum MapType {
  NONE = 'none',
  SMALL = 'small',
  LARGE = 'large',
}

export enum MapLocationType {
  CAVES = 0,
  FOREST = 1,
  MIXED = 2,
  SETTLEMENT = 3,
  SWAMP = 4,
}

export enum MapMeepleType {
  NO_MEEPLE = -1,
  BEAR = 0,
  BOAR = 1,
  FARMER = 2,
  NOBLE = 3,
  SHEEP = 4
}

export interface MapMeeple {
  type: MapMeepleType,
  health: number,
  wounds: number
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
  type: MapLocationType;
  defaultType: MapLocationType;
  top: number;
  left: number;
  size: number;
  links: Array<number | null>;
  defaultMeepleType: MapMeepleType;
  meeple: MapMeeple;
  hunters: GameMapHunter[];
}

export interface IMapData {
  settings: {
    type: MapType,
    width: number;
    height: number;
    defaultSize: number;
    startLocation: number;
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
  type: MapLocationType,
  size?: number | null,
  meepleType?: MapMeepleType
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