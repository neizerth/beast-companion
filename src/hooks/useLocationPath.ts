import {ILocationPath, IMapLocationItem} from "../util/interfaces";
import {visitLocation} from "../components/helpers/locationPath";
import {useState} from "react";

export type ILocationHookResult = [ILocationPath, CallableFunction, CallableFunction];

export const useLocationPath = (): ILocationHookResult => {
    const [locationPath, setLocationPath] = useState<IMapLocationItem[]>([]);

    const onLocationVisit = (item: IMapLocationItem) => {
        const path = visitLocation(locationPath, item);
        setLocationPath(path);
        return path;
    };

    return [locationPath, setLocationPath, onLocationVisit];
};