import { flowRight } from 'lodash'
import { add } from 'lodash/fp'
import {ILocationPath, IPathItem, IMapLocationItem} from "../../util/interfaces";
import {link} from "d3";

export const getLocationItem = (path: ILocationPath, locationItem: IMapLocationItem) =>
    path.find(item => item === locationItem);

export const isLocationExists = (path: ILocationPath, locationItem: IMapLocationItem) =>
    getLocationItem(path, locationItem) !== undefined;

export const isLocationFirst = (path: ILocationPath, item: IMapLocationItem) =>
    path.length > 0 && path.indexOf(item) === 0;

export const isLocationLast = (path: ILocationPath, item: IMapLocationItem) =>
    path.length > 0 && path.lastIndexOf(item) === path.length - 1;

export type IPathItemAction = (path: ILocationPath, item: IMapLocationItem) => ILocationPath;

export const addLocation = (path: ILocationPath, item: IMapLocationItem) =>
    [...path, item];

export const clearPath = (path: ILocationPath) => [];

export const removeLocation = (path: ILocationPath, item: IMapLocationItem) => {
    const index = path.lastIndexOf(item);
    return [...path.slice(0, index), ...path.slice(index + 1)];
};

export const getLocationVisitsCount = (path: ILocationPath, locationItem: IMapLocationItem) =>
    path.filter(item => item === locationItem).length;

export const getLocationVisits = (path: ILocationPath, locationItem: IMapLocationItem) =>
    path.reduce((target, item, index, self) => {
        if (self[index] === locationItem) {
            target.push(index);
        }
        return target;
    }, [] as number[]);

export const getLocationVisitIndex = (
    path: ILocationPath,
    item: IMapLocationItem,
    start = 0
) => getLocationVisits(path, item).findIndex(index => index >= start) || 0;

export const getMutualLocationsVisits = (
    path: ILocationPath,
    from: IMapLocationItem,
    to: IMapLocationItem
) => path.reduce((target, item, index, self) => {
    if (index === 0) {
        return target;
    }
    if (item === from && self[index - 1] === to) {
        target.push(index);
    }
    if (item === to && self[index - 1] === from) {
        target.push(index);
    }
    return target;
}, [] as number[]);

export const getMutualLocationsVisitIndex = (
    path: ILocationPath,
    from: IMapLocationItem,
    to: IMapLocationItem,
    start = 0
) => getMutualLocationsVisits(path, from, to).findIndex(index => index >= start) || 0;

export const isNextLocation = (path: ILocationPath, item: IMapLocationItem) => {
    const last = path[path.length - 1];
    if (!last) {
        return false;
    }
    const { links = []} = last;
    return links.includes(item.index);
}

export const startFromLocation = (location: IMapLocationItem | null): ILocationPath => location ? [location] : [];

export const getLocationDirectedLinks = (locations: IMapLocationItem[], item: IMapLocationItem) => {
    const { links = [] } = item;

    const data = links.map(index => locations[index]);

    const leftOrder = [...data].sort((a, b) =>
        a.left > b.left ? 1 : a.left === b.left ? 0 : -1
    );
    const topOrder = [...data].sort((a, b) =>
        a.top > b.top ? 1 : a.top === b.top ? 0 : -1
    );
    const ACCURACY = 50;

    const left = leftOrder
        .filter(location => item.left - location.left > ACCURACY)[0];
    const right = leftOrder
        .filter(location => location.left - item.left > ACCURACY)
        .reverse()[0]
    const top = topOrder
        .filter(location => item.top - location.top > ACCURACY)[0];
    const bottom = topOrder
        .filter(location => location.top - item.top > ACCURACY)
        .reverse()[0];
    return {
        top,
        left,
        right,
        bottom
    };
}