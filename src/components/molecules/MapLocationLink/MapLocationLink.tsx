import S from './MapLocationLink.module.scss';
import React, {useEffect, useRef} from "react";
import {half, px, scale} from "../../../util/common";
import {IMapLocationItem} from "../../../util/interfaces";

export interface MapLocationLinkProps {
    item: IMapLocationItem;
    onConnect: CallableFunction;
    onRemove: CallableFunction;
    ratio: number;
}

const getLocationCenter = (item: IMapLocationItem) => {
    const { top, left, size } = item;
    return {
        top: top + half(size),
        left: left + half(size)
    };
}

export const MapLocationLink = React.forwardRef((props: MapLocationLinkProps, ref: React.ForwardedRef<any>) => {
    const {
        item,
        ratio,
        onConnect,
        onRemove
    } = props;

    const { top, left, size } = item;
    const k = (x: number) => px(scale(x, ratio));

    const style = {
        top: k(top + half(size)),
        left: k(left + half(size))
    };

    useEffect(() => {
        onConnect();
        return () => onRemove();
    }, []);

    return <div className={S.container} ref={ref} style={style}>

    </div>;
})