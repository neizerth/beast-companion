import S from './MapController.module.scss';
import {IMapData,} from "../../../util/interfaces";
import classnames from "classnames";
import {ButtonControls, GameMap, KeyboardControls} from "../..";
import {useMapSize} from "../../../hooks/useMapSize";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {clearPath} from "../../../features/path/pathSlice";

import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import {selectMode} from "../../../features/gameMode/gameModeSlice";
import {GameMode} from "../../../util/common";

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
    const gameMode = useAppSelector(selectMode);
    const [width, height, ratio] = useMapSize(data.settings);

    const onClear = () => dispatch(clearPath());

    const doubleClickOptions = {
        disabled: true
    }

    return (
        <div className={classnames(className, S.container)}>
            <TransformWrapper doubleClick={doubleClickOptions} disabled={gameMode === GameMode.MOVEMENT}>
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