import S from "./GameMap.module.scss";
import {MapLocationList} from "../MapLocationList/MapLocationList";
import {CSSProperties, useRef, useState} from "react";
import {px} from "../../../util/common";
import {useAppSelector} from "../../../hooks";
import {selectPathData} from "../../../features/path/pathSlice";
import {IMapLocationItem} from "../../../util/interfaces";
import {MapLocationPath} from "../MapLocationPath/MapLocationPath";
import classnames from "classnames";

export interface GameMapProps {
    src: string;
    width: number;
    height: number;
    ratio: number;
    locations: IMapLocationItem[];
    onLocationClick: CallableFunction;
}

export const GameMap = (props: GameMapProps) => {
    const {
        width,
        height,
        ratio,
        locations,
        src,
        onLocationClick = () => void(0)
    } = props;

    const ref = useRef(null);
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
                            onLocationClick={onLocationClick}
                            locations={locations}
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