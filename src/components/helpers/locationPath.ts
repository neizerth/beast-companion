import { flowRight } from 'lodash'
import { add } from 'lodash/fp'
import {MapLocationItem} from "../organisms/GameMap/GameMap";
import {ILocationPath, IPathItem} from "../../util/interfaces";

export const getItem = (path: ILocationPath, locationItem: MapLocationItem) =>
    path.find(({ item }) => item === locationItem);

export const isLocationExists = (path: ILocationPath, locationItem: MapLocationItem) =>
    getItem(path, locationItem) !== undefined;

export const getItemIndex = (path: ILocationPath, locationItem: MapLocationItem) =>
    path.findIndex(({ item }) => item === locationItem);

const createPathItem = (item: MapLocationItem, visitsCount = 0): IPathItem => ({
    item,
    visitsCount
});

const isEmpty = (path: ILocationPath) => path.length === 0;

export const isLocationFirst = (path: ILocationPath, item: MapLocationItem) =>
    !isEmpty(path) && getItemIndex(path, item) === 0;

export const isLocationLast = (path: ILocationPath, item: MapLocationItem) =>
    !isEmpty(path) && getItemIndex(path, item) === path.length - 1;

export const addLocation = (path: ILocationPath, item: MapLocationItem, visitsCount = 1) =>
    [...path, createPathItem(item, visitsCount)];

export const removeLocation = (path: ILocationPath, locationItem: MapLocationItem) =>
    path.filter(({ item }) => item !== locationItem);

export const getLocationVisitsCount = (path: ILocationPath, locationItem: MapLocationItem) =>
    getItem(path, locationItem)?.visitsCount || 0;

export type SetVisitsValueFunction = (value: number) => number;

export const setLocationVisitsCount = (
    path: ILocationPath,
    locationItem: MapLocationItem,
    getVisits: SetVisitsValueFunction
) =>
    path
        .map(pathItem => pathItem.item === locationItem ?
            createPathItem(locationItem, getVisits(pathItem.visitsCount)) :
            pathItem
        )
        .filter(({ visitsCount }) => visitsCount > 0);

export type SetVisitsValueHOF = (handler: SetVisitsValueFunction) => SetVisitsValueFunction;

export const incVisitsCount = (
    path: ILocationPath,
    locationItem: MapLocationItem,
    getValue: SetVisitsValueFunction,
    incValue = 1
) =>
    setLocationVisitsCount(path, locationItem, flowRight(getValue, add(incValue)));

export const decVisitsCount = (
    path: ILocationPath,
    locationItem: MapLocationItem,
    getValue: SetVisitsValueHOF,
    decValue = 1
) =>
    setLocationVisitsCount(path, locationItem, flowRight(getValue, add(-decValue)));