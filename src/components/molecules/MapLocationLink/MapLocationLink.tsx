import S from './MapLocationLink.module.scss';
import React from "react";
import {scale, vw} from "../../../util/common";
import {ILocationLinkItem} from "../../../util/interfaces";
import * as d3 from 'd3';
import {createPath, getBoundingRect, getControlPoint, getLocationCenter, getStroke, IPoint} from "../../../helpers/calculatePath";

export interface MapLocationLinkProps {
    source: ILocationLinkItem;
    target: ILocationLinkItem;
    visitIndex: number;
    pathLength: number;
    actionIndex: number;
    ratio: number;
    index: number;
}

export const MapLocationLink = (props: MapLocationLinkProps) => {
    const {
        source,
        target,
        ratio,
        index,
        visitIndex,
        pathLength,
        actionIndex,
    } = props;



    const strokeWidth = Math.ceil(vw(0.2));

    const {
        width,
        height,
        path
    } = createPath({
        ratio,
        source,
        target,
        strokeWidth,
        visitIndex
    });

    const stroke = getStroke(index, pathLength, visitIndex);

    const viewBox = `0 0 ${width} ${height}`;
    const style = {

    };
    const pathStyle = {

    }

    return (
        <svg viewBox={viewBox} style={style} className={S.container} width={width} height={height}>
            <path
                style={pathStyle}
                className={S.path}
                fill={'#000'}
                strokeWidth={1}
                d={path}
                strokeLinejoin={'round'}
                stroke={stroke.toString()}
            />
        </svg>
    );
};