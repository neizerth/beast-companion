import * as jsPlumb from "@jsplumb/browser-ui"

import S from './GameMap.module.scss';
import {ILocationPath, IMapData, IMapLocationItem, IMapSize} from "../../../util/interfaces";
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
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {addPathItem, clearPath, removePathItem, selectPathData} from "../../../features/path/pathSlice";
import {isLocationLast} from "../../helpers/locationPath";

export interface GameMapProps {
    className?: string;
    data: IMapData;
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

    const dispatch = useAppDispatch();
    const [width, height, ratio] = useMapSize(data.settings);
    const ref = useRef(null);

    useEffect(() => console.log('map rendered'));

    // const [
    //     locationPath,
    //     setLocationPath,
    //     onLocationVisit
    // ] = useLocationPath();

    // const [onPathChange, undo, redo, clearHistory] = useLocationHistory(locationPath);

    const locationPath = useAppSelector(selectPathData);

    const visitLocation = (item: IMapLocationItem) => dispatch(
        isLocationLast(locationPath, item) ?
            removePathItem(item) :
            addPathItem(item)
    );

    const mainStyle: CSSProperties = {
        width: px(width),
        height: px(height)
    }

    const onClear = () => dispatch(clearPath());
    const identity = () => void(0);

    const onRedo = identity;
    const onUndo = identity;

    const onZoomIn = identity;
    const onZoomOut = identity;

    return (
        <div className={classnames(className, S.container)} ref={ref}>
            <MapControls
                onBack={onBack}
                onClear={onClear}
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