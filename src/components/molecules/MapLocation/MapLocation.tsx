import React from "react";

import S from "./MapLocation.module.scss";
import classnames from "classnames";
import {GameMode, px, scale} from "../../../util/common";
import {MapLocationImage, MapLocationWait} from "../..";
import {MapLocationType} from "../../../util/interfaces";
import {MapLocationImageList} from "../../../util/locations";

const TYPE_CLASS_NAMES = {
    [MapLocationType.FOREST]: S.forest,
    [MapLocationType.CAVES]: S.caves,
    [MapLocationType.MIXED]: S.mixed,
    [MapLocationType.SETTLEMENT]: S.settlement,
    [MapLocationType.SWAMP]: S.swamp,
}

export interface MapLocationProps {
    onClick: CallableFunction;
    onWait: CallableFunction;
    className: string;
    visitsCount: number;
    waitLeftCount: number;
    waitList: number[];
    isFirst: boolean;
    isLast: boolean;
    isNext: boolean;
    ratio: number;
    top: number;
    left: number;
    size: number;
    type: MapLocationType;
    gameMode: GameMode;
    isDefaultType: boolean;
}

export const MapLocation = (props: MapLocationProps) => {
    const {
        className,
        isFirst,
        isLast,
        isNext,
        visitsCount,
        onClick,
        onWait,
        ratio,
        size,
        top,
        left,
        waitList,
        waitLeftCount,
        gameMode,
        type,
        isDefaultType
    } = props;

    const isSelected = visitsCount > 0;
    const isPathMode = gameMode === GameMode.PATH;
    const isLocationsMode = gameMode === GameMode.LOCATIONS;

    const stateClassName = isLast ? S.last :
        isFirst ? S.first :
            isSelected && S.selected;

    const typeClassName = TYPE_CLASS_NAMES[type];

    const classList = [
        S.background,
        isLocationsMode && typeClassName,
        isLocationsMode && !isDefaultType && S.modified,
        isPathMode && stateClassName,
        isNext && S.next,
    ];

    const k = (x: number) => px(scale(x, ratio));

    const style = {
        fontSize: k(size),
        width: k(size),
        height: k(size),
        top: k(top),
        left: k(left)
    };
    const canWait = isPathMode && (isLast || waitList.length > 0);

    const locationTypeItem = MapLocationImageList[type];
    const locationImageUrl = locationTypeItem.url;

    return <div
        style={style}
        className={classnames(className, S.container)}
    >
        {!isDefaultType &&
            <MapLocationImage
                type={type}
                ratio={ratio}
                locationSize={size}
                className={S.image}
            />
        }

        {canWait && <MapLocationWait
            isLast={isLast}
            waitList={waitList}
            waitLeftCount={waitLeftCount}
            size={size}
            ratio={ratio}
            onWait={onWait}
        />}

        <div
            onClick={() => onClick()}
            className={classnames(classList)}
        >
            {isPathMode && visitsCount > 1 && <span className={S.counter}>{visitsCount}</span>}
        </div>
    </div>
};