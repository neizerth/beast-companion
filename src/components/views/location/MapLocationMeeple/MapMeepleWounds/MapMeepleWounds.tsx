import S from "./MapMeepleWounds.module.scss";
import {get4PieSegment, get8PieSegment} from "../../../../../util/indicators";
import React from "react";

export interface MapMeepleWoundsProps {
    wounds: number;
}

export const MapMeepleWounds = (props: MapMeepleWoundsProps) => {
    const { wounds } = props;
    const fillColor = 'red';

    const woundsList = Array(wounds).fill(0);

    return <div className={S.container}>
        <svg className={S.markers} xmlns="http://www.w3.org/2000/svg" width="478" height="478" viewBox="0 0 4780 4780">
            {woundsList.map((index, key) =>
                <path
                    fill={fillColor}
                    d={get4PieSegment(key)}
                    key={key}
                />
            )}
        </svg>
    </div>
};