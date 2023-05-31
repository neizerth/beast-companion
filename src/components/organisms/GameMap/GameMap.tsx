import S from "./GameMap.module.scss";
import {CSSProperties, useRef, useState} from "react";
import {GameMode, px} from "../../../util/common";
import {IMapLocationItem} from "../../../util/interfaces";
import {MapLocationPath, MapLocationList} from "../..";
import classnames from "classnames";
import {useAppSelector} from "../../../hooks";
import {selectMode} from "../../../features/gameMode/gameModeSlice";
import {selectLocations} from "../../../features/locations/locationsSlice";

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
    const locations = useAppSelector(selectLocations);

    const [loaded, setLoaded] = useState(false);

    const mainStyle: CSSProperties = {
        width: px(width),
        height: px(height)
    }

    const imageClassName = classnames(
        S.image,
        {
            [S.image_loading]: !loaded
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
                        <MapLocationList
                            ratio={ratio}
                        />
                        <MapLocationPath
                            width={width}
                            height={height}
                            ratio={ratio}
                        />
                    </>
                }
            </div>
        </div>
    );
}