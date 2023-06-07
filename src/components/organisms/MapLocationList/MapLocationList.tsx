import {MapLocation} from "../../molecules/MapLocation/MapLocation";
import S from "../MapController/MapController.module.scss";
import {IMapLocationItem, MapLocationType} from "../../../util/interfaces";
import {
    getLocationVisitsCount,
    getLocationWait,
    getWaitVisitsCount,
    isLocationFirst,
    isLocationLast,
    isNextLocation
} from "../../../helpers/locationPath";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {addPathItem, removePathItem, selectPathData} from "../../../features/path/pathSlice";
import {GameMode, MAX_WAIT_SIZE} from "../../../util/common";
import {selectMode} from "../../../features/gameMode/gameModeSlice";
import {changeLocationType, selectLocations} from "../../../features/locations/locationsSlice";
import {USER_LOCATION_TYPES} from "../../../util/locations";

export interface MapLocationListProps {
    ratio: number;
}

export const MapLocationList = (props: MapLocationListProps) => {
    const {
        ratio,
    } = props;

    const gameMode = useAppSelector(selectMode);
    const locations = useAppSelector(selectLocations);

    const dispatch = useAppDispatch();
    const locationPath = useAppSelector(selectPathData);
    const isFirst = (item: IMapLocationItem) => isLocationFirst(locationPath, item);
    const isLast = (item: IMapLocationItem) => isLocationLast(locationPath, item);
    const getVisitsCount = (item: IMapLocationItem) => getLocationVisitsCount(locationPath, item);
    const isNext = (item: IMapLocationItem) => isNextLocation(locationPath, item);
    const getWait = (item: IMapLocationItem) => getLocationWait(locationPath, item);

    const canClick = (item: IMapLocationItem) => {
        if (locationPath.length === 0) {
            return true;
        }
        const waitLeftCount = getWait(item).length;
        if (isLast(item) && waitLeftCount < MAX_WAIT_SIZE) {
            return true;
        }
        if (isNext(item)) {
            return true;
        }
        return false;
    }

    const visitLocation = (item: IMapLocationItem) => dispatch(
        addPathItem(item)
    );

    const switchLocationType = (item: IMapLocationItem) => {
        const locationTypesList = USER_LOCATION_TYPES
            .filter(type => type !== item.defaultType)
            .concat([item.defaultType]);
        const currentTypeIndex = locationTypesList.indexOf(item.type);
        const nextTypeIndex = currentTypeIndex === locationTypesList.length - 1 ? 0 : currentTypeIndex + 1;
        const nextType = locationTypesList[nextTypeIndex];

        dispatch(
            changeLocationType(item, nextType)
        );
    }
    const onClick = (item: IMapLocationItem) => {
        if (gameMode === GameMode.LOCATIONS) {
            return switchLocationType(item)
        }
        if (!canClick(item)) {
            return;
        }
        visitLocation(item);
    }

    return <>
        {locations.map((item, key) => (
            <MapLocation
                {...item}
                onClick={() => onClick(item)}
                isFirst={isFirst(item)}
                isLast={isLast(item)}
                isNext={isNext(item)}
                waitList={getWait(item)}
                visitsCount={getVisitsCount(item)}
                className={S.location}
                type={item.type}
                isDefaultType={item.type === item.defaultType}
                ratio={ratio}
                key={key}
                gameMode={gameMode}
            />
        ))}
    </>
}