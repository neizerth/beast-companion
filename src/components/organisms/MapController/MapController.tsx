import S from './MapController.module.scss';
import {IMapData, IMapLocationItem, } from "../../../util/interfaces";
import classnames from "classnames";
import {useRef} from "react";
import {MapControls} from "../MapControls/MapControls";
import {useMapSize} from "../../../hooks/useMapSize";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {addPathItem, clearPath, removePathItem, selectPathData} from "../../../features/path/pathSlice";
import {isLocationLast} from "../../helpers/locationPath";
import {GameMap} from "../GameMap/GameMap";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export interface GameMapProps {
    className?: string;
    data: IMapData;
    mapUrl: string;
}

export const MapController = (props: GameMapProps) => {
    const {
        mapUrl,
        className,
        data,
    } = props;

    const dispatch = useAppDispatch();
    const [width, height, ratio] = useMapSize(data.settings);

    const locationPath = useAppSelector(selectPathData);

    const visitLocation = (item: IMapLocationItem) => dispatch(
        isLocationLast(locationPath, item) ?
            removePathItem(item) :
            addPathItem(item)
    );

    const onClear = () => dispatch(clearPath());

    return (
        <div className={classnames(className, S.container)}>
            <TransformWrapper>
                {({ zoomIn, zoomOut, ...rest }) => (
                    <>
                        <MapControls
                            onClear={onClear}
                            onZoomIn={zoomIn}
                            onZoomOut={zoomOut}
                        />
                        <TransformComponent>
                            <GameMap
                                locations={data.items}
                                onLocationClick={visitLocation}
                                src={mapUrl}
                                width={width}
                                height={height}
                                ratio={ratio}
                            />
                        </TransformComponent>
                    </>
                )}
            </TransformWrapper>
        </div>
    );
};