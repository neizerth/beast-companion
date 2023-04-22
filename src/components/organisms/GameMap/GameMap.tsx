import * as jsPlumb from "@jsplumb/browser-ui"

import S from './GameMap.module.scss';
import {ILocationPath, MapData, MapLocationItem, MapSize} from "../../../util/interfaces";
import classnames from "classnames";
import {useEffect, useRef, useState} from "react";
import {RefreshButton} from "../../molecules/GameControl/GameControl";
import {MapLocationList} from "../MapLocationList/MapLocationList";
import {
    addLocation,
    getLocationVisitsCount,
    isLocationExists,
    isLocationLast, removeLocation
} from "../../helpers/locationPath";
import {useMapSize} from "../../../hooks/useMapSize";
import {MapControls} from "../MapControls/MapControls";
import {useNavigate} from "react-router-dom";

export interface GameMapProps {
    className?: string;
    data: MapData,
    onBack: CallableFunction;
}

export const GameMap = (props: GameMapProps) => {
    const {
        className,
        data,
        onBack,
    } = props;

    const navigate = useNavigate();
    const ref = useRef(null);

    useEffect(() => console.log('map rendered'));

    const onRefresh = () => null;

    return (
        <div className={classnames(className, S.container)} ref={ref}>
            <>
                <MapControls onBack={onBack} onRefresh={onRefresh}/>
            </>
        </div>
    );
};