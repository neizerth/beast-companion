import S from './MapHunter.module.scss';
import {GameMapHunter, HunterType} from "../../../../util/hunters";

import varjaImage from '@images/hunters/varja.png';
import krimImage from '@images/hunters/krim.png';
import helgaImage from '@images/hunters/helga.png';
import ionaImage from '@images/hunters/iona.png';
import grimgierImage from '@images/hunters/grimgier.png';
import assarImage from '@images/hunters/assar.png';
import woundImg from '@images/wounds/1.png';
import changeHunterImg from '@images/change-user.svg';

import classNames from "classnames";
import {useAppDispatch, useAppSelector} from "../../../../hooks";
import {
    changeHunter,
    injureHunter,
    moveHunter,
    setCurrentHunter,
    unsetCurrentHunter
} from "../../../../features/hunters";
import {get4PieSegment} from "../../../../util/indicators";
import React from "react";

export interface MapHunterProps {
    canChange: boolean,
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
        canChange
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

    const handleInjure = () =>  dispatch(
        injureHunter(hunter.type)
    );

    const handleHunterChange = () => dispatch(
        changeHunter(hunter.type)
    )

    const woundsList = Array(hunter.wounds).fill(0);
    const fillColor = 'red';

    return <div className={className}>
        <div className={S.area} onClick={handleHunterClick}/>
        <img src={image} alt="" className={iconClassName}/>
        {selected && <>
            <div className={S.injure} onClick={handleInjure}>
                <img src={woundImg} className={S.injureImage} alt=""/>
            </div>
            {canChange && <div className={S.change} onClick={handleHunterChange}>
                <img src={changeHunterImg} className={S.changeImage} alt=""/>
            </div>}
        </>}
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