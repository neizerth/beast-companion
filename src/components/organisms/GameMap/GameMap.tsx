import * as jsPlumb from "@jsplumb/browser-ui"

import S from './GameMap.module.scss';
import {ILocationPath, MapData, MapLocationItem, MapSize} from "../../../util/interfaces";
import classnames from "classnames";
import {CSSProperties, useEffect, useRef} from "react";
import {MapControls} from "../MapControls/MapControls";
import {useNavigate} from "react-router-dom";
import {useDownloadProgress} from "../../../hooks/useDownloadProgress";
import {Progress} from "../../atoms/Progress/Progress";
import {useMapSize} from "../../../hooks/useMapSize";
import {MapLocationList} from "../MapLocationList/MapLocationList";
import {useLocationPath} from "../../../hooks/useLocationPath";
import {px} from "../../../util/common";
import {useLocationHistory} from "../../../hooks/useLocationHistory";

export interface GameMapProps {
    className?: string;
    data: MapData;
    mapUrl: string;
    onBack: CallableFunction;
}

export const GameMap = (props: GameMapProps) => {
    const {
        mapUrl,
        className,
        data,
        onBack,
    } = props;

    const [width, height, ratio] = useMapSize(data.settings);
    const ref = useRef(null);

    useEffect(() => console.log('map rendered'));

    const [
        locationPath,
        setLocationPath,
        onLocationVisit
    ] = useLocationPath();

    const [onPathChange, undo, redo, clearHistory] = useLocationHistory(locationPath);

    const visitLocation = (item: MapLocationItem) => {
        const path = onLocationVisit(item);
        onPathChange(path);
    };

    const mainStyle: CSSProperties = {
        width: px(width),
        height: px(height)
    }

    const onClear = () => {
        setLocationPath([]);
        clearHistory();
    };
    const identity = () => void(0);

    const onRedo = () => setLocationPath(redo());
    const onUndo = () => setLocationPath(undo());

    const onZoomIn = identity;
    const onZoomOut = identity;

    return (
        <div className={classnames(className, S.container)} ref={ref}>
            <MapControls
                onBack={onBack}
                onClear={onClear}
                onRedo={onRedo}
                onUndo={onUndo}
                onZoomIn={onZoomIn}
                onZoomOut={onZoomOut}
            />
            <div className={S.main} style={mainStyle}>
                <img src={mapUrl} className={S.image} alt=""/>
            </div>
            <MapLocationList
                onVisit={visitLocation}
                locationPath={locationPath}
                locations={data.items}
                ratio={ratio}
            />
        </div>
    );
};