import React, {CSSProperties, useState} from "react";

import S from "./MapLocation.module.scss";
import classnames from "classnames";

export interface MapLocationProps {
    onVisit: CallableFunction,
    className: string,
    visitsCount: number,
    isFirst: boolean,
    isLast: boolean
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
        visitsCount,
        onVisit,
        ratio,
        size,
        top,
        left
    } = props;

    const stateClassName = isLast ? S.location_last :
        isFirst ? S.location_first : visitsCount > 0 && S.location_selected;

    const classList = [
        className,
        S.location,
        [stateClassName]
    ];

    const k = (x: number) => (x * ratio) + 'px';

    const style = {
        fontSize: k(size),
        width: k(size),
        height: k(size),
        top: k(top),
        left: k(left)
    };

    return <div
        className={classnames(classList)}
        onClick={() => onVisit()}
        style={style}
    >
        {visitsCount > 1 && <span className={S.counter}>{visitsCount}</span>}
    </div>
}