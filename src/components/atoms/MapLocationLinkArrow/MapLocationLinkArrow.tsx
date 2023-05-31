import S from "./MapLocationLinkArrow.module.scss";
import React from "react";
import {ILocationPathListItem} from "../../../util/interfaces";

import arrowImg from '../../../../public/images/png/arrow.png';
import {getAngle} from "./MapLocationLinkArrowOld";
import {getLocationCenter, getSkew, rad2deg} from "../../../helpers/calculatePath";
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
    const rotate = defaultAngle + angle;

    const iconStyle = {
        transform: `rotate(${rotate}deg) scale(${scale})`
    }

    const containerStyle = {
        top,
        left
    };

    const textStyle = {
        fontSize: scale * 12,
    }

    const containerClassNames = classnames(S.container, isLast && S.last);
    return (
        <div className={containerClassNames} style={containerStyle}>
            <img src={arrowImg} className={S.icon} style={iconStyle} alt=""/>
            <div className={S.text} style={textStyle}>{pathItem.index + 1}</div>
        </div>
    );
}