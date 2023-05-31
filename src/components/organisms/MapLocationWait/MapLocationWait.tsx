import S from "./MapLocationWait.module.scss";
import {MAX_WAIT_SIZE, minmax, scale} from "../../../util/common";
import React from "react";

export interface MapLocationWaitProps {
    isLast: boolean;
    waitList: number[];
    waitLeftCount: number;
    size: number;
    ratio: number;
    onWait: CallableFunction;
}

export const MapLocationWait = (props: MapLocationWaitProps) => {
    const {
        isLast,
        waitList,
        size,
        ratio,
        onWait,
        waitLeftCount
    } = props;

    const waitCount = waitList.length;
    let waitGroup = 1;
    // const waitList = new Array(waitCount).fill(0).map((value, index) => value + index);

    const markerSize = Math.max(2, Math.floor(scale(size, ratio) / 8));
    const markerGap = Math.floor(markerSize / 2);
    const markerStyle = {
        width: markerSize,
        height: markerSize,
    };

    const markersContainerStyle = {
        width: markerSize * (MAX_WAIT_SIZE / 2) + markerGap * 3,
        height: markerSize * 2 + markerGap,
        padding: markerGap,
        borderRadius: markerGap * 2,
        gap: markerGap
    }

    const buttonSize = Math.floor(scale(size, ratio)/ 2);
    const buttonStyle = {
        width: buttonSize,
        height: buttonSize,
        backgroundSize: Math.floor(buttonSize * 0.7)
    }

    const MARKER_COLORS = [
        '#ffffff',
        '#ffd3b2',
        '#ffa967',
        '#ffcf55',
        '#ff9900',
        '#ff780a',
        '#ff430a',
        '#ff0000'
    ];

    const getMarkerStyle = (groupId: number) => {
        const color = MARKER_COLORS[groupId];
        return {
            ...markerStyle,
            backgroundColor: color
        }
    };

    return <>
        {isLast && waitLeftCount < MAX_WAIT_SIZE && <div className={S.button} style={buttonStyle} onClick={() => onWait()}/>}
        {waitCount > 0 && <div className={S.markers} style={markersContainerStyle}>
            {waitList.map((groupId, index) => (
                <div key={index} style={getMarkerStyle(groupId)} className={S.marker}/>
            ))}
        </div>}
    </>
}