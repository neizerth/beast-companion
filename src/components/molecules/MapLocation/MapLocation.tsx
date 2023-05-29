import React, {CSSProperties, useEffect, useState} from "react";

import S from "./MapLocation.module.scss";
import classnames from "classnames";
import {MAX_WAIT_SIZE, px, scale, vw} from "../../../util/common";
import {MapLocationWait} from "../../organisms/MapLocationWait/MapLocationWait";

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
        waitLeftCount
    } = props;

    const isSelected = visitsCount > 0;

    const stateClassName = isLast ? S.last :
        isFirst ? S.first :
            isSelected && S.selected;

    const classList = [
        S.background,
        [stateClassName],
        {
            [S.next]: isNext
        }
    ];

    const k = (x: number) => px(scale(x, ratio));

    const style = {
        fontSize: k(size),
        width: k(size),
        height: k(size),
        top: k(top),
        left: k(left)
    };
    const canWait = isLast || waitList.length > 0;

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
            {visitsCount > 1 && <span className={S.counter}>{visitsCount}</span>}
        </div>
    </div>
};