import S from './MapHunter.module.scss';
import {GameMapHunter, HunterType} from "../../../util/hunters";

import varjaImage from '../../../../public/images/hunters/varja.png';
import krimImage from '../../../../public/images/hunters/krim.png';
import helgaImage from '../../../../public/images/hunters/helga.png';
import ionaImage from '../../../../public/images/hunters/iona.png';
import grimgierImage from '../../../../public/images/hunters/grimgier.png';
import assarImage from '../../../../public/images/hunters/assar.png';
import woundImg from '../../../../public/images/wounds/1.png';

import classNames from "classnames";
import {useAppDispatch} from "../../../hooks";
import {injureHunter, moveHunter, setCurrentHunter, unsetCurrentHunter} from "../../../features/hunters/huntersSlice";
import {IMapLocationItem} from "../../../util/interfaces";
import {MapLocationLinks} from "../../../helpers/locationPath";
import {Arrow, ArrowType} from "../../atoms/Arrow/Arrow";
import {get4PieSegment} from "../../../util/indicators";
import React from "react";

export interface MapHunterProps {
    className?: string,
    hunter: GameMapHunter,
    selected?: boolean
}

export const HUNTER_IMAGES = {
    [HunterType.VARJA]: varjaImage,
    [HunterType.KRIM]: krimImage,
    [HunterType.HELGA]: helgaImage,
    [HunterType.IONA]: ionaImage,
    [HunterType.GRIMGIER]: grimgierImage,
    [HunterType.ASSAR]: assarImage,
}

export const HUNTER_CLASS_NAMES = {
    [HunterType.VARJA]: S.varja,
    [HunterType.KRIM]: S.krim,
    [HunterType.HELGA]: S.helga,
    [HunterType.IONA]: S.iona,
    [HunterType.GRIMGIER]: S.grimgier,
    [HunterType.ASSAR]: S.assar,
}

export const MapHunter = (props: MapHunterProps) => {
    const {
        hunter,
        selected = false,
    } = props;

    const dispatch = useAppDispatch();
    const image = HUNTER_IMAGES[hunter.type];
    const iconClassName = classNames(
        S.icon,
    )

    const hunterClassName = HUNTER_CLASS_NAMES[hunter.type];

    const className = classNames(
        props.className,
        S.container,
        hunterClassName,
        selected && S.selected
        // selected ? S.selected : hunterClassName
    );

    const handleHunterClick = () => dispatch(
        selected ? unsetCurrentHunter() : setCurrentHunter(hunter.type)
    );

    const handleInjure = () => {
        console.log('injure!')
        dispatch(
            injureHunter(hunter.type)
        )
    }

    const woundsList = Array(hunter.wounds).fill(0);
    const fillColor = 'red';

    return <div className={className}>
        <div className={S.area} onClick={handleHunterClick}/>
        <img src={image} alt="" className={iconClassName}/>
        {selected && <div className={S.injure} onClick={handleInjure}>
            <img src={woundImg} className={S.injureImage} alt=""/>
        </div>}
        <div className={S.wounds}>
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
    </div>
}