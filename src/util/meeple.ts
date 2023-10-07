import {MapLocationType, MapMeeple, MapMeepleType} from "./interfaces";

export const MEEPLE_TYPE = {
    [MapMeepleType.SHEEP]: 'sheep',
    [MapMeepleType.NOBLE]: 'noble',
    [MapMeepleType.BOAR]: 'boar',
    [MapMeepleType.FARMER]: 'farmer',
    [MapMeepleType.BEAR]: 'bear',
    [MapMeepleType.NO_MEEPLE]: null,
}

export const USER_MEEPLE_TYPES = [
    MapMeepleType.SHEEP,
    MapMeepleType.NOBLE,
    MapMeepleType.FARMER,
    MapMeepleType.BEAR,
    MapMeepleType.NO_MEEPLE,
];

export const MEEPLE_HEALTH = {
    [MapMeepleType.SHEEP]: 1,
    [MapMeepleType.NOBLE]: 3,
    [MapMeepleType.BOAR]: 2,
    [MapMeepleType.FARMER]: 2,
    [MapMeepleType.BEAR]: 2,
    [MapMeepleType.NO_MEEPLE]: 0,
}

export const toMeeple = (type: MapMeepleType): MapMeeple => ({
    type,
    health: MEEPLE_HEALTH[type],
    wounds: 0
});