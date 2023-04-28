import {MapLocation} from "../../molecules/MapLocation/MapLocation";
import S from "../MapController/MapController.module.scss";
import {IMapLocationItem} from "../../../util/interfaces";
import {
    getLocationVisitsCount,
    isLocationFirst,
    isLocationLast, isNextLocation
} from "../../helpers/locationPath";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {addPathItem, removePathItem, selectPathData} from "../../../features/path/pathSlice";

export interface MapLocationListProps {
    locations: IMapLocationItem[];
    ratio: number;
}

export const MapLocationList = (props: MapLocationListProps) => {
    const {
        locations,
        ratio,
    } = props;

    const dispatch = useAppDispatch();
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
    const visitLocation = (item: IMapLocationItem) => dispatch(
        isLocationLast(locationPath, item) ?
            removePathItem(item) :
            addPathItem(item)
    );
    const onClick = (item: IMapLocationItem) => {
        if (!canClick(item)) {
            return;
        }
        visitLocation(item);
    }

    const onLurk = (item: IMapLocationItem) => void(item);

    return <>
        {locations.map((item, key) => (
            <MapLocation
                {...item}
                onClick={() => onClick(item)}
                onLurk={() => onLurk(item)}
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