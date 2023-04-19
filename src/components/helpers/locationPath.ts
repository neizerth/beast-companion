import { flowRight } from 'lodash'
import { add } from 'lodash/fp'
import {MapLocationItem} from "../organisms/GameMap/GameMap";
import {ILocationPath, IPathItem} from "../../util/interfaces";

export const getLocationItem = (path: ILocationPath, locationItem: MapLocationItem) =>
    path.find(item => item === locationItem);

export const isLocationExists = (path: ILocationPath, locationItem: MapLocationItem) =>
    getLocationItem(path, locationItem) !== undefined;

export const isLocationFirst = (path: ILocationPath, item: MapLocationItem) =>
    path.length > 0 && path.indexOf(item) === 0;

export const isLocationLast = (path: ILocationPath, item: MapLocationItem) =>
    path.length > 0 && path.lastIndexOf(item) === path.length - 1;

export const addLocation = (path: ILocationPath, item: MapLocationItem, visitsCount = 1) =>
    [...path, item];

export const removeLocation = (path: ILocationPath, item: MapLocationItem) => {
    const index = path.lastIndexOf(item);
    return [...path.slice(0, index), ...path.slice(index + 1)];
};

export const getLocationVisitsCount = (path: ILocationPath, locationItem: MapLocationItem) =>
    path.filter(item => item === locationItem).length;
