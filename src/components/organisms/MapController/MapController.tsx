import S from './MapController.module.scss';
import {IMapData, IMapLocationItem, } from "../../../util/interfaces";
import classnames from "classnames";
import {ButtonControls} from "../ButtonControls/ButtonControls";
import {useMapSize} from "../../../hooks/useMapSize";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {addPathItem, clearPath, removePathItem, selectPathData} from "../../../features/path/pathSlice";
import {isLocationLast} from "../../helpers/locationPath";
import {GameMap} from "../GameMap/GameMap";

import {TransformWrapper, TransformComponent, useControls} from "react-zoom-pan-pinch";
import {KeyboardControls} from "../KeyboardControls/KeyboardControls";

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
                <ButtonControls
                    onClear={onClear}
                />
                <KeyboardControls
                    locations={data.items}
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
            </TransformWrapper>
        </div>
    );
};