import * as jsPlumb from "@jsplumb/browser-ui"

import S from './GameMap.module.scss';
import {ILocationPath, MapData, MapLocationItem, MapSize} from "../../../util/interfaces";
import classnames from "classnames";
import {useEffect, useRef} from "react";
import {MapControls} from "../MapControls/MapControls";
import {useNavigate} from "react-router-dom";
import {useDownloadProgress} from "../../../hooks/useDownloadProgress";
import {Progress} from "../../atoms/Progress/Progress";
import {useMapSize} from "../../../hooks/useMapSize";
import {MapLocationList} from "../MapLocationList/MapLocationList";
import {useLocationPath} from "../../../hooks/useLocationPath";

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

    const mapUrl = `/images/maps/${data.settings.type}.png`;

    const progress = useDownloadProgress(mapUrl);
    const [width, height, ratio] = useMapSize(data.settings);
    const ref = useRef(null);

    const isLoaded = progress === 100;

    useEffect(() => console.log('map rendered'));

    const onRefresh = () => null;
    const [locationPath, onLocationVisit] = useLocationPath();
    return (
        <div className={classnames(className, S.container)} ref={ref}>
            <>
                {!isLoaded ?
                    <Progress value={progress}/>:
                    <>
                        <MapControls onBack={onBack} onRefresh={onRefresh}/>
                        <img src={mapUrl} width={width} height={height} className={S.image} alt=""/>
                        <MapLocationList
                            onVisit={onLocationVisit}
                            locationPath={locationPath}
                            locations={data.items}
                            ratio={ratio}
                        />
                    </>
                }
            </>
        </div>
    );
};