import S from './MapHunter.module.scss';
import {GameMapHunter, HunterType} from "../../../util/hunters";

import varjaImage from '../../../../public/images/hunters/varja.png';
import krimImage from '../../../../public/images/hunters/krim.png';
import helgaImage from '../../../../public/images/hunters/helga.png';
import ionaImage from '../../../../public/images/hunters/iona.png';
import grimgierImage from '../../../../public/images/hunters/grimgier.png';
import assarImage from '../../../../public/images/hunters/assar.png';
import classNames from "classnames";
import {useAppDispatch} from "../../../hooks";
import {setCurrentHunter, unsetCurrentHunter} from "../../../features/hunters/huntersSlice";
import {IMapLocationItem} from "../../../util/interfaces";
import {MapLocationLinks} from "../../../helpers/locationPath";
import {Arrow, ArrowType} from "../../atoms/Arrow/Arrow";

export interface MapHunterProps {
    className?: string,
    hunter: GameMapHunter,
    links: MapLocationLinks,
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
        links
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

    const getArrowClassName = (type: string) => classNames(
        S.arrow,
        S[`arrow_${type}`]
    );

    const handleHunterClick = () => dispatch(
        selected ? unsetCurrentHunter() : setCurrentHunter(hunter.type)
    );

    const goToLocation = (item: IMapLocationItem) => {
        console.log({ item });
    };

    return <div className={className}>
        <div className={S.area} onClick={handleHunterClick} />

        <img src={image} alt="" className={iconClassName}/>
        {selected && Object.entries(links).map(([type, item], key) =>
            <Arrow
                className={getArrowClassName(type)}
                key={key}
                type={type as ArrowType}
                onClick={() => goToLocation(item)
                }/>
        )}
    </div>
}