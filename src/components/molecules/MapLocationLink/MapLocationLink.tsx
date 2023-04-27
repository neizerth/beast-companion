import S from './MapLocationLink.module.scss';
import React, {useEffect, useRef} from "react";
import {half, minmax, px, scale, vh, vw} from "../../../util/common";
import {IMapLocationItem} from "../../../util/interfaces";
import Color from 'color';
import * as d3 from 'd3';
import {ILocationLinkItem} from "../../organisms/MapLocationPath/MapLocationPath";
import {MapLocationLinkArrow} from "../../atoms/MapLocationLinkArrow/MapLocationLinkArrow";

export type IPoint = [number, number];

export interface MapLocationLinkProps {
    source: ILocationLinkItem;
    target: ILocationLinkItem;
    visitIndex: number;
    pathLength: number;
    ratio: number;
    index: number;
}

const getLocationCenter = (item: IMapLocationItem): IPoint => {
    const { top, left, size } = item;
    return [
        left + half(size),
        top + half(size)
    ];
}

const getCenter = (p0: IPoint, p1: IPoint): IPoint => {
    return [
        half(p0[0] + p1[0]),
        half(p0[1] + p1[1]),
    ];
}

const BASE_CURVINESS = 16;
const NEGATIVE_CURVINESS = [-40, -24, -20, -18, -17];
const POSITIVE_CURVINESS = [20, 18];

const getCurviness = (visitIndex: number) => {
    const isOdd = visitIndex % 2 !== 0;
    const sign = isOdd ? 1 : -1;
    const index = Math.floor(visitIndex / 2);

    const source = isOdd ? POSITIVE_CURVINESS : NEGATIVE_CURVINESS;

    return source[index] || BASE_CURVINESS * sign;
}

const getControlPoint = (source: ILocationLinkItem, target: ILocationLinkItem, visitIndex: number): IPoint => {
    const from = source.location;
    const to = target.location;

    const fromCenter = getLocationCenter(from);
    const toCenter = getLocationCenter(to);
    const center = getCenter(fromCenter, toCenter);

    if (visitIndex === 0) {
        return center;
    }

    const sign = getCurviness(visitIndex - 1);
    const k = sign * visitIndex;
    const dX = Math.abs(fromCenter[0] - toCenter[0]);
    const dY = Math.abs(fromCenter[1] - toCenter[1]);

    if (dX > dY) {
        return [
            center[0],
            center[1] + k,
        ];
    }

    return [
        center[0] + k,
        center[1],
    ];
}

const getStroke = (index: number, total: number, visitIndex: number) => {
    const orange = Color('#ff780a');
    const red = Color('#ff2626');
    const end = Color('#006778');
    const white = Color('#fff');

    if (index === total - 1) {
        return end.fade(0.3);
    }
    if (visitIndex === 0) {
        return red.fade(0.5);
    }
    if (visitIndex === 1) {
        return white.fade(0.4);
    }
    return orange.fade(0.3);
}

export const MapLocationLink = (props: MapLocationLinkProps) => {
    const {
        source,
        target,
        ratio,
        index,
        visitIndex,
        pathLength
    } = props;

    const k = (x: number) => scale(x, ratio);
    const scalePoint = (p: IPoint): IPoint => [k(p[0]), k(p[1])];

    const from = getLocationCenter(source.location);
    const to = getLocationCenter(target.location);
    const control = getControlPoint(source, target, visitIndex);

    const path = d3.path();
    path.moveTo(...scalePoint(from));
    path.quadraticCurveTo(...scalePoint(control), ...scalePoint(to));

    const stroke = getStroke(index, pathLength, visitIndex);

    const minSize = Math.min(source.location.size, target.location.size);
    const circleSize = k(minSize) / 6;
    // const arrowSize = k(minSize) * 0.9;
    // const arrowSize = k(minSize) * 2;
    const arrowSize = k(minSize) / 1.5;
    const center = getCenter(from, to);
    const circleCenter = scalePoint(getCenter(control, center));

    return (
        <>
            <path
                className={S.path}
                d={path.toString()}
                stroke={stroke.toString()}
            />
            <MapLocationLinkArrow
                from={circleCenter}
                to={scalePoint(to)}
                size={arrowSize}
            />
            <g>
                {/*<circle*/}
                {/*    cx={circleCenter[0]}*/}
                {/*    cy={circleCenter[1]}*/}
                {/*    r={circleSize}*/}
                {/*    fill={'#fff'}*/}
                {/*    className={S.circle}*/}
                {/*/>*/}
                <text
                    textAnchor={'middle'}
                    alignmentBaseline={'middle'}
                    x={circleCenter[0]}
                    y={circleCenter[1]}
                    fontSize={circleSize * 1.8}
                    fill={'#000'}
                    className={S.index}
                >
                    {index + 1}
                </text>
            </g>
        </>
    );
};