import S from './MapHunter.module.scss';
import {GameMapHunter, HunterType} from "../../../util/hunters";

import varjaImage from '../../../../public/images/hunters/varja.png';
import krimImage from '../../../../public/images/hunters/krim.png';
import helgaImage from '../../../../public/images/hunters/helga.png';
import ionaImage from '../../../../public/images/hunters/iona.png';
import grimgierImage from '../../../../public/images/hunters/grimgier.png';
import assarImage from '../../../../public/images/hunters/assar.png';
import classNames from "classnames";

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
    const { hunter, selected = false } = props;
    const image = HUNTER_IMAGES[hunter.type];
    const iconClassName = classNames(
        S.icon,
        selected && S.selected
    )

    const hunterClassName = HUNTER_CLASS_NAMES[hunter.type];

    const className = classNames(
        props.className,
        S.container,
        hunterClassName
    );

    return <div className={className}>
        <img src={image} alt="" className={iconClassName}/>
    </div>
}