import S from "./MapLocationLinkArrow.module.scss";
import {IPoint} from "../../molecules/MapLocationLink/MapLocationLink";
import React from "react";

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
        angle += x > -5 ? atan / 1.5 : 90 + atan / 2;
    }
    else if (x < 0 && y < 0) {
        angle -= 180 - atan;
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
        top: -8,
        left: -12,
        // rotate: -66 + 180,
        rotate: -90,
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
    // const rotate = -90;

    // console.log({ rotate, a })

    const transform = [
        `translate(${left}, ${top})`,
        `scale(${scale})`,
        `rotate(${rotate}, 12, 8)`
    ].join(' ');

    return (
        <>
            <path
                fill={'#fff'}
                transform={transform}
                className={S.icon}
                d="M2,1.25c-0.26,0 -0.501,0.135 -0.638,0.356c-0.137,0.221 -0.149,0.497 -0.033,0.729l10,20c0.127,0.254 0.387,0.415 0.671,0.415c0.284,-0 0.544,-0.161 0.671,-0.415l10,-20c0.116,-0.232 0.104,-0.508 -0.033,-0.729c-0.137,-0.221 -0.378,-0.356 -0.638,-0.356l-20,0Z"
                // d="M98.666,89.6H8L53.333,8Z"
                // d="M7.563,6H0.436C0.04,6-0.112,5.499,0.088,5.222l3.545-4.977 c0.202-0.276,0.531-0.346,0.733-0.069l3.545,5.081C8.113,5.533,7.958,6,7.563,6z"
            />

        </>
        // <path fill="#fff" d={path.join(' ')} className={S.icon}/>
    )
}