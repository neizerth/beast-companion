import S from "./MapLocationMeeple.module.scss";
import {MapMeeple} from "../../../../util/interfaces";
import classNames from "classnames";
import {MEEPLE_TYPE} from "../../../../util/meeple";
import {MapMeepleWounds} from "@/components";

export interface MapLocationMeepleProps {
    className: string;
    onInjure: CallableFunction,
    meeple: MapMeeple;
    isDefault: boolean;
}

export const MapLocationMeeple = (props: MapLocationMeepleProps) => {
    const { isDefault, meeple, onInjure } = props;
    const { type } = meeple;
    const meepleTypeClassName = 'type_' + MEEPLE_TYPE[type];

    const containerClassName = classNames(
        props.className,
        S.container
    );
    const className = classNames(
            S.item,
            S[meepleTypeClassName],
            {
                [S.changed]: !isDefault
            }
        );

    return <div className={containerClassName} onClick={() => onInjure()}>
        <div className={className}>
            <MapMeepleWounds wounds={meeple.wounds}/>
        </div>
    </div>;
}