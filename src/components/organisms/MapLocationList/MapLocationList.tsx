import {MapLocation} from "../../molecules/MapLocation/MapLocation";
import S from "../MapController/MapController.module.scss";
import {IMapLocationItem} from "../../../util/interfaces";
import {
    getLocationVisitsCount, getLocationWait, getLocationWaitCount, getWaitVisitsCount,
    isLocationFirst,
    isLocationLast, isNextLocation
} from "../../../helpers/locationPath";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {addPathItem, removePathItem, selectPathData} from "../../../features/path/pathSlice";
import {MAX_WAIT_SIZE} from "../../../util/common";

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
    const getWait = (item: IMapLocationItem) => getLocationWait(locationPath, item);
    const waitLeftCount = getWaitVisitsCount(locationPath);

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

    const onWait = (item: IMapLocationItem) => {
        if (waitLeftCount === MAX_WAIT_SIZE) {
            return;
        }
        // console.log('wait', item)
        const action = addPathItem(item);
        dispatch(action);
    };

    return <>
        {locations.map((item, key) => (
            <MapLocation
                {...item}
                onClick={() => onClick(item)}
                onWait={() => onWait(item)}
                isFirst={isFirst(item)}
                isLast={isLast(item)}
                isNext={isNext(item)}
                waitList={getWait(item)}
                waitLeftCount={waitLeftCount}
                visitsCount={getVisitsCount(item)}
                className={S.location}
                ratio={ratio}
                key={key}
            />
        ))}
    </>
}