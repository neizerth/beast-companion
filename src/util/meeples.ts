import {MapLocationType, MapMeepleType} from "./interfaces";

export const NO_MEEPLE_TYPE = null;

export const MEEPLE_TYPE = {
    [MapMeepleType.SHEEP]: 'sheep',
    [MapMeepleType.NOBLE]: 'noble',
    [MapMeepleType.BOAR]: 'boar',
    [MapMeepleType.FARMER]: 'farmer',
    [MapMeepleType.BEAR]: 'bear',
}

export const USER_MEEPLE_TYPES = [
    MapMeepleType.SHEEP,
    MapMeepleType.NOBLE,
    MapMeepleType.FARMER,
    MapMeepleType.BEAR,
    NO_MEEPLE_TYPE,
];