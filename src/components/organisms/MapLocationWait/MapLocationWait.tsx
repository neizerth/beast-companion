import React from "react";
import S from "./MapLocationWait.module.scss";
import {get8PieSegment} from "../../../util/indicators";

export interface MapLocationWaitProps {
    waitList: number[];
}

export const MapLocationWait = (props: MapLocationWaitProps) => {
    const {
        waitList,
    } = props;

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


    return <div className={S.container}>
        <svg className={S.markers} xmlns="http://www.w3.org/2000/svg" width="478" height="478" viewBox="0 0 4780 4780">
            {waitList.map((groupIndex, index) =>
                <path
                    fill={MARKER_COLORS[groupIndex]}
                    d={get8PieSegment(index)}
                    key={index}
                />
            )}
        </svg>
    </div>
}