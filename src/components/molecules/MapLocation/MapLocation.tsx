import React, {CSSProperties, useEffect, useState} from "react";

import S from "./MapLocation.module.scss";
import classnames from "classnames";
import {px, scale} from "../../../util/common";

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
    onConnect?: CallableFunction;
    onRemove?: CallableFunction;
}

export const MapLocation = React.forwardRef((props: MapLocationProps, ref: React.ForwardedRef<any>) => {
    const {
        className,
        isFirst,
        isLast,
        visitsCount,
        onVisit,
        onConnect = (_: any) => _,
        onRemove = (_: any) => _,
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
        [stateClassName]
    ];

    const k = (x: number) => px(scale(x, ratio));

    const style = {
        fontSize: k(size),
        width: k(size),
        height: k(size),
        top: k(top),
        left: k(left)
    };

    useEffect(() => {
        onConnect();
        return () => onRemove();
    })

    return <div
        onClick={() => onVisit()}
        style={style}
        className={classnames(className, S.container)}
    >
        <div className={S.center} ref={ref}/>
        <div className={classnames(classList)}>
            {visitsCount > 1 && <span className={S.counter}>{visitsCount}</span>}
        </div>
    </div>
});