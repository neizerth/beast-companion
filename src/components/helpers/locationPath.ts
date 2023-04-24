import { flowRight } from 'lodash'
import { add } from 'lodash/fp'
import {ILocationPath, IPathItem, IMapLocationItem} from "../../util/interfaces";

export const getLocationItem = (path: ILocationPath, locationItem: IMapLocationItem) =>
    path.find(item => item === locationItem);

export const isLocationExists = (path: ILocationPath, locationItem: IMapLocationItem) =>
    getLocationItem(path, locationItem) !== undefined;

export const isLocationFirst = (path: ILocationPath, item: IMapLocationItem) =>
    path.length > 0 && path.indexOf(item) === 0;

export const isLocationLast = (path: ILocationPath, item: IMapLocationItem) =>
    path.length > 0 && path.lastIndexOf(item) === path.length - 1;

export const addLocation = (path: ILocationPath, item: IMapLocationItem, visitsCount = 1) =>
    [...path, item];

export const clearPath = (path: ILocationPath) => [];

export const removeLocation = (path: ILocationPath, item: IMapLocationItem) => {
    const index = path.lastIndexOf(item);
    return [...path.slice(0, index), ...path.slice(index + 1)];
};


export const getLocationVisitsCount = (path: ILocationPath, locationItem: IMapLocationItem) =>
    path.filter(item => item === locationItem).length;