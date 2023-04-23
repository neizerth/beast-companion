import {ILocationPath, MapLocationItem} from "../util/interfaces";
import {visitLocation} from "../components/helpers/locationPath";
import {useState} from "react";

export type ILocationHookResult = [ILocationPath, CallableFunction, CallableFunction];

export const useLocationPath = (): ILocationHookResult => {
    const [locationPath, setLocationPath] = useState<MapLocationItem[]>([]);

    const onLocationVisit = (item: MapLocationItem) => {
        const path = visitLocation(locationPath, item);
        setLocationPath(path);
        return path;
    };

    return [locationPath, setLocationPath, onLocationVisit];
};