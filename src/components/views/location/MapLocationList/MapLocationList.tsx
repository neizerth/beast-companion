import {MapLocation} from "../MapLocation/MapLocation";
import S from "../../common/MapController/MapController.module.scss";
import {IMapLocationItem, MapMeepleType} from "../../../../util/interfaces";
import {
    getLocationDirectedLinks,
    getLocationVisitsCount,
    getLocationWait,
    isLocationFirst,
    isLocationLast,
    isNextLocation
} from "../../../../helpers/locationPath";
import {useAppDispatch, useAppSelector} from "../../../../hooks";
import {addPathItem, selectPathData} from "../../../../features/path";
import {GameMode, MAX_WAIT_SIZE} from "../../../../util/common";
import {selectMode} from "../../../../features/gameMode";
import {
    changeLocationType,
    selectLocations,
    selectActiveHunters,
    addLocationHunter
} from "../../../../features/locations";
import {changeLocationMeeple, injureLocationMeeple} from "../../../../features/meeple";
import {USER_LOCATION_TYPES} from "../../../../util/locations";
import {toMeeple, USER_MEEPLE_TYPES} from "../../../../util/meeple";
import {eq} from "lodash/fp";
import {getNextAvailableHunter, toHunter} from "../../../../util/hunters";
import {setCurrentHunter} from "../../../../features/hunters";

export interface MapLocationListProps {
    ratio: number;
}

export const MapLocationList = (props: MapLocationListProps) => {
    const {
        ratio,
    } = props;

    const gameMode = useAppSelector(selectMode);
    const locations = useAppSelector(selectLocations);
    const activeHunters = useAppSelector(selectActiveHunters);

    const dispatch = useAppDispatch();
    const locationPath = useAppSelector(selectPathData);
    const isFirst = (item: IMapLocationItem) => isLocationFirst(locationPath, item);
    const isLast = (item: IMapLocationItem) => isLocationLast(locationPath, item);
    const getVisitsCount = (item: IMapLocationItem) => getLocationVisitsCount(locationPath, item);
    const isNext = (item: IMapLocationItem) => isNextLocation(locationPath, item);
    const getWait = (item: IMapLocationItem) => getLocationWait(locationPath, item);

    const isMode = eq(gameMode);

    const nextHunterType = getNextAvailableHunter(activeHunters);

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

    const onMeepleInjure = (item: IMapLocationItem) => {
        const { wounds, health } = item.meeple;

        if (health - wounds > 1) {
            return dispatch(injureLocationMeeple(item));
        }
        const meeple = toMeeple(MapMeepleType.NO_MEEPLE);
        dispatch(changeLocationMeeple(item, meeple));
    };

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

    const switchLocationMeeple = (item: IMapLocationItem) => {
        const meepleTypesList = USER_MEEPLE_TYPES
            .filter(type => type !== item.defaultMeepleType)
            .concat([item.defaultMeepleType]);
        const { type } = item.meeple;

        const currentTypeIndex = meepleTypesList.indexOf(type);
        const nextTypeIndex = currentTypeIndex === meepleTypesList.length - 1 ? 0 : currentTypeIndex + 1;
        const nextType = meepleTypesList[nextTypeIndex];
        const meeple = toMeeple(nextType);

        dispatch(
            changeLocationMeeple(item, meeple)
        );
    }

    const addHunter = (item: IMapLocationItem) => {
        if (!nextHunterType) {
            return;
        }
        const hunter = toHunter(nextHunterType);
        dispatch(
            addLocationHunter(item, hunter)
        );

        dispatch(
            setCurrentHunter(nextHunterType)
        )
    };

    const onClick = (item: IMapLocationItem) => {
        if (isMode(GameMode.MEEPLE)) {
            return switchLocationMeeple(item)
        }
        if (isMode(GameMode.LOCATIONS)) {
            return switchLocationType(item)
        }
        if (isMode(GameMode.HUNTERS)) {
            return addHunter(item);
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
                onMeepleInjure={() => onMeepleInjure(item)}
                onClick={() => onClick(item)}
                isFirst={isFirst(item)}
                isLast={isLast(item)}
                isNext={isNext(item)}
                waitList={getWait(item)}
                visitsCount={getVisitsCount(item)}
                className={S.location}
                meeple={item.meeple}
                type={item.type}
                hunters={item.hunters}
                canAddHunters={nextHunterType !== undefined}
                isDefaultType={item.type === item.defaultType}
                isDefaultMeeple={item.meeple.type === item.defaultMeepleType}
                ratio={ratio}
                links={getLocationDirectedLinks(locations, item)}
                key={key}
                gameMode={gameMode}
            />
        ))}
    </>
}