import {MapLocationItem} from "../GameMap/GameMap";
import {MapLocation} from "../../molecules/MapLocation/MapLocation";
import S from "../GameMap/GameMap.module.scss";
import {ILocationPath} from "../../../util/interfaces";
import {getLocationVisitsCount, isLocationFirst, isLocationLast} from "../../helpers/locationPath";

export interface MapLocationListProps {
    items: MapLocationItem[];
    ratio: number;
    onVisit: CallableFunction;
    locationPath: ILocationPath;
}

export const MapLocationList = (props: MapLocationListProps) => {
    const {
        locationPath,
        items,
        ratio,
        onVisit = () => void(0),
    } = props;

    const isFirst = (item: MapLocationItem) => isLocationFirst(locationPath, item);
    const isLast = (item: MapLocationItem) => isLocationLast(locationPath, item);
    const getVisitsCount = (item: MapLocationItem) => getLocationVisitsCount(locationPath, item);

    return <>
        {items.map((item, key) =>
            <MapLocation
                onVisit={() => onVisit(item)}
                isFirst={isFirst(item)}
                isLast={isLast(item)}
                visitsCount={getVisitsCount(item)}
                className={S.location}
                {...item}
                ratio={ratio}
                key={key}
            />
        )}
    </>
}