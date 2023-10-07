import S from "./MapLocationMeeple.module.scss";
import {MapMeepleType} from "../../../util/interfaces";
import classNames from "classnames";
import {MEEPLE_TYPE} from "../../../util/meeples";

export interface MapLocationMeepleProps {
    type: MapMeepleType;
    isDefault: boolean
}

export const MapLocationMeeple = (props: MapLocationMeepleProps) => {
    const { type, isDefault } = props;
    const meepleTypeClassName = 'type_' + MEEPLE_TYPE[type];
    const className = classNames(
            S.item,
            S[meepleTypeClassName],
            {
                [S.changed]: !isDefault
            }
        );

    return <div className={S.container}>
        <div className={className}></div>
    </div>;
}