import S from './MapController.module.scss';
import {IMapData, } from "../../../util/interfaces";
import classnames from "classnames";
import {ButtonControls, GameMap, KeyboardControls, PWAInstaller} from "../..";
import {useMapSize} from "../../../hooks/useMapSize";
import {useAppDispatch} from "../../../hooks";
import {clearPath} from "../../../features/path/pathSlice";

import {TransformWrapper, TransformComponent} from "react-zoom-pan-pinch";

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

    const onClear = () => dispatch(clearPath());

    const doubleClickOptions = {
        disabled: true
    }

    return (
        <div className={classnames(className, S.container)}>
            <TransformWrapper doubleClick={doubleClickOptions}>
                <PWAInstaller/>
                <ButtonControls />
                <KeyboardControls/>
                <TransformComponent contentClass={S.content} wrapperClass={S.warpper}>
                    <GameMap
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