import S from './GameMap.module.scss';
import {IMapData,} from "@/util/interfaces";
import classnames from "classnames";
import {KeyboardControls, MapView, Sidebar, SwitchModeButton} from "@/components";
import {useMapSize} from "@/hooks/useMapSize";

import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import {GameMode} from "@/util/common";

export interface GameMapProps {
  className?: string;
  data: IMapData;
  mapUrl: string;
  gameMode: GameMode,
}

export const GameMap = (props: GameMapProps) => {
  const {
    mapUrl,
    className,
    data,
    gameMode
  } = props;

  const [width, height, ratio] = useMapSize(data.settings);

  const doubleClickOptions = {
    disabled: true
  }

  return (
    <div className={classnames(className, S.container)}>
      <TransformWrapper doubleClick={doubleClickOptions} disabled={gameMode === GameMode.MOVEMENT}>
        <Sidebar/>
        <SwitchModeButton className={S.modes}/>
        <KeyboardControls/>
        <TransformComponent contentClass={S.content} wrapperClass={S.warpper}>
          <MapView
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