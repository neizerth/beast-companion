import S from "./MapLocationLinkArrow.module.scss";
import {ILocationLinkItem} from "../../organisms/MapLocationPath/MapLocationPath";
import {IPoint} from "../../molecules/MapLocationLink/MapLocationLink";
import React, {CSSProperties} from "react";
import {minmax, vh, vmin, vw} from "../../../util/common";

export interface MapLocationLinkArrowProps {
    from: IPoint;
    to: IPoint;
    size: number;
}

export const getAngle = (from: IPoint, to: IPoint, defaultAngle: number) => {
    let angle = defaultAngle;
    const x = to[0] - from[0];
    const y = to[1] - from[1];

    if (y === 0) {
        return angle;
    }

    const tg = Math.abs(y / x);
    // const tg = (x / y);
    const atan = (Math.atan(tg) * 100);

    if (atan > 90 && y < 0) {
        angle -= atan / 1.3;
    }
    else if (atan > 90 && y > 0) {
        angle += atan / 1.5;
    }
    else if (x < 0 && y < 0) {
        angle -= 90 + atan / 1.4;
    }
    else if (x > 0 && y < 0) {
        angle -= atan;
    }
    else if (x < 0 && y > 0) {
        angle -= 180 + atan / 2;
    }
    else {
        angle += atan / 2;
    }

    return angle;
}

export const MapLocationLinkArrow = (props: MapLocationLinkArrowProps) => {
    const { from, to, size } = props;
    const SCALE = 2;

    const defaults = {
        top: -4,
        left: -4,
        // rotate: -66 + 180,
        rotate: 90,
        scale: 30
    }

    const scale = size / defaults.scale;

    const left = from[0] + scale * defaults.left;
    const top = from[1] + scale * defaults.top;

    // const degree
    // const a = to[0] - from[0];
    // const b = from[1] - to[1];

    // const tg = b / a;

    // const angle = a === 0 ? 0 : Math.atan(tg) * 100;

    // const rotate = (defaults.rotate - angle + 360) %360;
    const arrowCenter: IPoint = [
        left,
        top
    ];
    const rotate = getAngle(arrowCenter, to, defaults.rotate);
    // console.log({ rotate });
    // const rotate = 90;

    // console.log({ rotate, a })

    const transform = [
        `translate(${left}, ${top})`,
        `scale(${scale})`,
        `rotate(${rotate}, 4, 4)`
    ].join(' ');

    return (
        <g>
            <path
                fill={'#fff'}
                transform={transform}
                className={S.icon}
                d="M7.563,6H0.436C0.04,6-0.112,5.499,0.088,5.222l3.545-4.977 c0.202-0.276,0.531-0.346,0.733-0.069l3.545,5.081C8.113,5.533,7.958,6,7.563,6z"
            />
        </g>
        // <path fill="#fff" d={path.join(' ')} className={S.icon}/>
    )
}