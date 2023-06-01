import S from "./MapLocationLinkArrow.module.scss";
import React from "react";
import {ILocationPathListItem} from "../../../util/interfaces";

import arrowImg from '../../../../public/images/arrow_alt4.svg';
import {getArrowPosition} from "./arrowPosition";
import classnames from "classnames";

export interface MapLocationLinkArrowProps {
    pathItem: ILocationPathListItem;
    ratio: number;
    isLast: boolean;
}

export const MapLocationLinkArrow = (props: MapLocationLinkArrowProps) => {
    const {
        pathItem,
        ratio,
        isLast
    } = props;

    const position = getArrowPosition({
        pathItem,
        ratio
    });

    const { angle, top, left, scale } = position;

    const defaultAngle = -90;

    const { deg, rad } = angle;
    const rotate = defaultAngle + deg;

    const iconSize = scale * 20;
    const halfSize = iconSize / 2;

    const iconStyle = {
        transform: `rotate(${rotate}deg)`,
        width: iconSize,
        height: iconSize,
        transformOrigin: `${halfSize}px ${halfSize}px`
    }

    const containerStyle = {
        top,
        left,
        width: iconSize,
        height: iconSize,
        marginTop: -halfSize,
        marginLeft: -halfSize,
    };

    const marginLeft = -scale * 2 * Math.cos(rad);
    const marginTop = 1.2 + -scale * 4 * Math.sin(rad);
    const textStyle = {
        fontSize: scale * 10,
        width: iconSize,
        height: iconSize,
        marginLeft,
        marginTop
    }

    const containerClassNames = classnames(S.container, isLast && S.last);
    return (
        <div className={containerClassNames} style={containerStyle}>
            <img src={arrowImg} className={S.icon} style={iconStyle} alt=""/>
            <div className={S.text} style={textStyle}>{pathItem.index + 1}</div>
        </div>
    );
}