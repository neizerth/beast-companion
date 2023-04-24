import {MapLocation} from "../../molecules/MapLocation/MapLocation";
import S from "../GameMap/GameMap.module.scss";
import {ILocationPath, IMapLocationItem} from "../../../util/interfaces";
import {getLocationVisitsCount, isLocationFirst, isLocationLast} from "../../helpers/locationPath";
import classnames from "classnames";
import {useEffect} from "react";

export interface MapLocationListProps {
    locations: IMapLocationItem[];
    ratio: number;
    onVisit: CallableFunction;
    locationPath: ILocationPath;
}

export const MapLocationList = (props: MapLocationListProps) => {
    const {
        locationPath,
        locations,
        ratio,
        onVisit = () => void(0),
    } = props;

    const isFirst = (item: IMapLocationItem) => isLocationFirst(locationPath, item);
    const isLast = (item: IMapLocationItem) => isLocationLast(locationPath, item);
    const getVisitsCount = (item: IMapLocationItem) => getLocationVisitsCount(locationPath, item);

    const onRemove = () => {
        console.log('location removed');
    }


    // useEffect()
    return <>
        {locations.map((item, key) =>
            <MapLocation
                {...item}
                onClick={() => onVisit(item)}
                onRemove={() => onRemove()}
                isFirst={isFirst(item)}
                isLast={isLast(item)}
                visitsCount={getVisitsCount(item)}
                className={S.location}
                ratio={ratio}
                key={key}
            />
        )}
    </>
}