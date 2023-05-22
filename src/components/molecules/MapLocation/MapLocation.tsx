import React, {CSSProperties, useEffect, useState} from "react";

import S from "./MapLocation.module.scss";
import classnames from "classnames";
import {px, scale, vw} from "../../../util/common";

export interface MapLocationProps {
    onClick: CallableFunction;
    onLurk: CallableFunction;
    className: string;
    visitsCount: number;
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
        onLurk,
        ratio,
        size,
        top,
        left
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

    // const showLurk = false;
    const showLurk = isLast;
    const lurkList = new Array(3).fill(0).map((value, index) => value + index);

    const lurkMarkerSize = Math.floor(scale(size, ratio) / 10);
    const lurkMarkerGap = lurkMarkerSize / 2;
    const lurkMarkerStyle = {
        width: lurkMarkerSize,
        height: lurkMarkerSize,
    };
    const lurkMarkersContainerStyle = {
        width: lurkMarkerSize * 4 + lurkMarkerGap * 3,
        height: lurkMarkerSize * 2 + lurkMarkerGap,
        gap: lurkMarkerGap
    }
    return <div
        style={style}
        className={classnames(className, S.container)}
    >
        {showLurk && <>
                <div className={S.lurk} onClick={() => onLurk()}/>
                <div className={S.lurk__markers} style={lurkMarkersContainerStyle}>
                    {lurkList.map((index) => (
                        <div key={index} style={lurkMarkerStyle} className={S.lurk__marker}/>
                    ))}
                </div>
            </>
        }

        <div
            onClick={() => onClick()}
            className={classnames(classList)}
        >
            {visitsCount > 1 && <span className={S.counter}>{visitsCount}</span>}
        </div>
    </div>
};