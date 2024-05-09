import S from "./MapView.module.scss";
import {CSSProperties, useState} from "react";
import {GameMode, px} from "../../../../util/common";
import {BeastMovement, LocationList, Path} from "@/components";
import classnames from "classnames";
import {selectMode} from "@/store/features/gameMode";
import {useAppSelector} from "@/hooks/useAppSelector";

export interface MapViewProps {
  src: string;
  width: number;
  height: number;
  ratio: number;
}

export const MapView = (props: MapViewProps) => {
  const {
    width,
    height,
    ratio,
    src,
  } = props;

  const mode = useAppSelector(selectMode);

  const [loaded, setLoaded] = useState(false);

  const mainStyle: CSSProperties = {
    width: px(width),
    height: px(height)
  }

  const imageClassName = classnames(
    S.image,
    {
      [S.image_loading]: !loaded,
      [S.image_hidden]: mode === GameMode.MOVEMENT
    }
  )
  return (
    <div className={S.container}>
      <div className={S.main} style={mainStyle}>
        <img
          src={src}
          className={imageClassName}
          onLoad={() => setLoaded(true)}
          alt=""
        />
        {loaded &&
            <>
              {mode !== GameMode.MOVEMENT && <LocationList
                  ratio={ratio}
              />}
              {mode === GameMode.PATH && <Path
                  width={width}
                  height={height}
                  ratio={ratio}
              />}
              {mode === GameMode.MOVEMENT && <BeastMovement/>}
            </>
        }
      </div>
    </div>
  );
}