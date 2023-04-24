import S from "./GameMap.module.scss";
import {MapLocationList} from "../MapLocationList/MapLocationList";
import {CSSProperties} from "react";
import {px} from "../../../util/common";
import {useAppSelector} from "../../../hooks";
import {selectPathData} from "../../../features/path/pathSlice";
import {IMapLocationItem} from "../../../util/interfaces";

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

    const path = useAppSelector(selectPathData);

    const mainStyle: CSSProperties = {
        width: px(width),
        height: px(height)
    }

    return (
        <div className={S.container}>
            <div className={S.main} style={mainStyle}>
                <img src={src} className={S.image} alt=""/>
                <MapLocationList
                    onLocationClick={onLocationClick}
                    locationPath={path}
                    locations={locations}
                    ratio={ratio}
                />
            </div>
        </div>
    );
}