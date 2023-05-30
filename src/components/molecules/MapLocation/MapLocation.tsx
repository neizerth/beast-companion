import React from "react";

import S from "./MapLocation.module.scss";
import classnames from "classnames";
import {GameMode, px, scale} from "../../../util/common";
import {MapLocationWait} from "../..";

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
    gameMode: GameMode;
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
        gameMode
    } = props;

    const isSelected = visitsCount > 0;
    const isPathMode = gameMode === GameMode.PATH;

    const stateClassName = isLast ? S.last :
        isFirst ? S.first :
            isSelected && S.selected;

    const classList = [
        S.background,
        isPathMode && stateClassName,
        isPathMode && isNext && S.next
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

    return <div
        style={style}
        className={classnames(className, S.container)}
    >
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