import {ILocationPath, IMapLocationItem} from "../util/interfaces";

export const getLocationItem = (path: ILocationPath, locationItem: IMapLocationItem) =>
    path.find(item => eq(item, locationItem));

export const isLocationExists = (path: ILocationPath, locationItem: IMapLocationItem) =>
    getLocationItem(path, locationItem) !== undefined;

export const findLocationIndex = (path: ILocationPath, locationItem: IMapLocationItem) =>
    path.findIndex(item => eq(item, locationItem));

export const findLastLocationIndex = (path: ILocationPath, locationItem: IMapLocationItem) => {
    for (let i = path.length; i--; ) {
        if (eq(path[i], locationItem)) {
            return i;
        }
    }
}

export const isLocationFirst = (path: ILocationPath, item: IMapLocationItem) =>
    path.length > 0 && findLocationIndex(path, item) === 0;

export const isLocationLast = (path: ILocationPath, item: IMapLocationItem) =>
    path.length > 0 && findLastLocationIndex(path, item) === path.length - 1;

export type IPathItemAction = (path: ILocationPath, item: IMapLocationItem) => ILocationPath;

export const addLocation = (path: ILocationPath, item: IMapLocationItem) =>
    [...path, item];

export const clearLocationPath = () => [];

export const removeLocation = (path: ILocationPath, item: IMapLocationItem) => {
    const index = findLocationIndex(path, item);
    return [...path.slice(0, index), ...path.slice(index + 1)];
};

export const eq = (item1?: IMapLocationItem, item2?: IMapLocationItem) =>
    item1 && item2 && item1?.index === item2?.index;

export const getLocationVisitsCount = (path: ILocationPath, locationItem: IMapLocationItem) =>
    path.reduce((total, item, index, self) => {
        if (!eq(item, locationItem)) {
            return total;
        }
        if (eq(item, self[index - 1])) {
            return total;
        }
        return total + 1;
    }, 0);

export const getWaitVisits = (path: ILocationPath) => {
    const data = path.reduce((total, item, index, self) => {
            if (eq(item, self[index - 1])) {
                total.push(index);
            }
            return total;
        }, [] as number[])

    return groupWaitVisits(data);
}

export const groupWaitVisits = (waitList: number[]) => {
    let groupId = 0;
    return waitList.map((value, index, self) => {
        if (index === 0) {
            return groupId;
        }
        if (self[index - 1] !== value - 1) {
            return ++groupId
        }
        return groupId;
    });
}

export const getWaitVisitsCount = (path: ILocationPath) => getWaitVisits(path).length;

export const getLocationWait = (path: ILocationPath, locationItem: IMapLocationItem) => {
    const data = path.reduce((total, item, index, self) => {
            if (eq(item, locationItem) && eq(item, self[index - 1])) {
                total.push(index);
            }
            return total;
        }, [] as number[]);
    return groupWaitVisits(data);
}

export const getLocationWaitCount = (path: ILocationPath, locationItem: IMapLocationItem) =>
    getLocationWait(path, locationItem).length;

export const getLocationVisits = (path: ILocationPath, locationItem: IMapLocationItem) =>
    path.reduce((target, item, index, self) => {
        if (eq(self[index], locationItem)) {
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
    if (eq(item, self[index - 1])) {
        return target;
    }
    if (eq(item, from) && eq(self[index - 1], to)) {
        target.push(index);
    }
    if (eq(item, to) && eq(self[index - 1], from)) {
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