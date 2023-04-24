import S from './MapLocationLink.module.scss';
import React, {useEffect, useRef} from "react";
import {half, px, scale} from "../../../util/common";
import {FixedSizeArray, IMapLocationItem} from "../../../util/interfaces";
import * as d3 from 'd3';
import {ILocationLinkItem} from "../../organisms/MapLocationPath/MapLocationPath";

export type IPoint = [number, number];

export interface MapLocationLinkProps {
    source: ILocationLinkItem;
    target: ILocationLinkItem;
    ratio: number;
}

const getLocationCenter = (item: IMapLocationItem) => {
    const { top, left, size } = item;
    return {
        top: top + half(size),
        left: left + half(size)
    };
}

export const MapLocationLink = (props: MapLocationLinkProps) => {
    const {
        source,
        target,
        ratio,
    } = props;

    const { top, left, size } = source;
    const k = (x: number) => px(scale(x, ratio));
    const ref = useRef(null);

    const style = {
        top: k(top + half(size)),
        left: k(left + half(size))
    };


    useEffect(() => {
        if (!ref?.current) {
            return
        }

        const control: IPoint = [150, 280];
        const point: IPoint = [350, 20];
        const start: IPoint = [40, 100];

        const svg = d3.select(ref.current);
        const path = d3.path();
        path.moveTo(...start);
        path.quadraticCurveTo(...control, ...point);

        svg.append('path')
            .attr('d', path.toString());

    }, []);

    return <svg className={S.container} style={style} ref={ref}/>;
};