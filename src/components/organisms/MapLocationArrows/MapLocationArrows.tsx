import S from './MapLocationArrows.module.scss';
import {Arrow, ArrowType} from "../../atoms/Arrow/Arrow";
import {HunterType} from "../../../util/hunters";
import {MapLocationLinks} from "../../../helpers/locationPath";
import classNames from "classnames";
import {IMapLocationItem} from "../../../util/interfaces";
import {moveHunter} from "../../../features/hunters/huntersSlice";
import {useAppDispatch} from "../../../hooks";

export interface MapLocationArrowsProps {
    links: MapLocationLinks,
    hunter: HunterType,
    className?: string
}

export const MapLocationArrows = (props: MapLocationArrowsProps) => {
    const {
        hunter,
        links
    } = props;

    const dispatch = useAppDispatch();

    const getArrowClassName = (type: string) => classNames(
        S.arrow,
        S[`arrow_${type}`],
        props.className,
    );

    const goToLocation = (item: IMapLocationItem, type: string) => {
        dispatch(
            moveHunter(hunter, item)
        );
    }

    const mapLinks = Object.entries(links)
        .filter(([,value]) => value !== false);

    return <>
        {mapLinks.map(([type, item], key) =>
            <Arrow
                className={getArrowClassName(type)}
                key={key}
                type={type as ArrowType}
                onClick={() => goToLocation(item, type)
                }/>
        )}
    </>;
}