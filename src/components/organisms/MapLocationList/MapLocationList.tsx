import {MapLocation} from "../../molecules/MapLocation/MapLocation";
import S from "../GameMap/GameMap.module.scss";
import {ILocationPath, MapLocationItem} from "../../../util/interfaces";
import {getLocationVisitsCount, isLocationFirst, isLocationLast} from "../../helpers/locationPath";
import classnames from "classnames";
import {useEffect} from "react";

export interface MapLocationListProps {
    locations: MapLocationItem[];
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

    const isFirst = (item: MapLocationItem) => isLocationFirst(locationPath, item);
    const isLast = (item: MapLocationItem) => isLocationLast(locationPath, item);
    const getVisitsCount = (item: MapLocationItem) => getLocationVisitsCount(locationPath, item);

    const onRemove = () => {
        console.log('location removed');
    }
    // useEffect()
    return <>
        {locations.map((item, key) =>
            <MapLocation
                {...item}
                onVisit={() => onVisit(item)}
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