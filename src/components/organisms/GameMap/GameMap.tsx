import S from "./GameMap.module.scss";
import {CSSProperties, useState} from "react";
import {GameMode, px} from "../../../util/common";
import {CardMovements, MapLocationList, MapLocationPath} from "../..";
import classnames from "classnames";
import {useAppSelector} from "../../../hooks";
import {selectMode} from "../../../features/gameMode/gameModeSlice";

export interface GameMapProps {
    src: string;
    width: number;
    height: number;
    ratio: number;
}

export const GameMap = (props: GameMapProps) => {
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
                        {mode !== GameMode.MOVEMENT && <MapLocationList
                            ratio={ratio}
                        />}
                        {mode === GameMode.PATH && <MapLocationPath
                            width={width}
                            height={height}
                            ratio={ratio}
                        />}
                        {mode === GameMode.MOVEMENT && <CardMovements/>}
                    </>
                }
            </div>
        </div>
    );
}