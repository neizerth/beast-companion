import {MapLocation} from "../../molecules/MapLocation/MapLocation";
import S from "../MapController/MapController.module.scss";
import {ILocationPath, IMapLocationItem} from "../../../util/interfaces";
import {
    getLocationVisitIndex,
    getLocationVisitsCount,
    isLocationFirst,
    isLocationLast, isNextLocation
} from "../../helpers/locationPath";
import {useAppSelector} from "../../../hooks";
import {selectPathData} from "../../../features/path/pathSlice";

export interface MapLocationListProps {
    locations: IMapLocationItem[];
    ratio: number;
    onLocationClick: CallableFunction;
}

export const MapLocationList = (props: MapLocationListProps) => {
    const {
        locations,
        ratio,
        onLocationClick = () => void(0),
    } = props;

    const locationPath = useAppSelector(selectPathData);
    const isFirst = (item: IMapLocationItem) => isLocationFirst(locationPath, item);
    const isLast = (item: IMapLocationItem) => isLocationLast(locationPath, item);
    const getVisitsCount = (item: IMapLocationItem) => getLocationVisitsCount(locationPath, item);
    const isNext = (item: IMapLocationItem) => isNextLocation(locationPath, item);

    const canClick = (item: IMapLocationItem) => {
        if (locationPath.length === 0) {
            return true;
        }
        if (isLast(item)) {
            return true;
        }
        if (isNext(item)) {
            return true;
        }
        return false;
    }
    const onClick = (item: IMapLocationItem) => {
        if (!canClick(item)) {
            return;
        }
        onLocationClick(item);
    }
    return <>
        {locations.map((item, key) => (
            <MapLocation
                {...item}
                onClick={() => onClick(item)}
                isFirst={isFirst(item)}
                isLast={isLast(item)}
                isNext={isNext(item)}
                visitsCount={getVisitsCount(item)}
                className={S.location}
                ratio={ratio}
                key={key}
            />
        ))}
    </>
}