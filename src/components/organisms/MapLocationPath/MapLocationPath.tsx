import {ILocationPathList} from "../../../util/interfaces";
import S from "./MapLocationPath.module.scss";
import {MapLocationLink} from "../../molecules/MapLocationLink/MapLocationLink";
import {getLocationVisitIndex, getMutualLocationsVisitIndex} from "../../../helpers/locationPath";
import {useAppSelector} from "../../../hooks";
import {selectPathData} from "../../../features/path/pathSlice";
import {generatePathList} from "../../../helpers/pathList";
import {useEffect, useRef} from "react";
import {renderPath} from "./renderPath";

export interface MapLocationPathProps {
    ratio: number;
    width: number;
    height: number;
}

export const MapLocationPath = (props: MapLocationPathProps) => {
    const {
        width,
        height,
        ratio
    } = props
    const path = useAppSelector(selectPathData);
    const ref = useRef<HTMLCanvasElement>(null);

    const pathList = generatePathList(path);

    useEffect(() => {
        if (!ref.current) {
            return;
        }
        renderPath({
            ratio,
            canvas: ref.current,
            pathList
        });
    }, [ref, pathList]);

    return (
        <>
            <canvas className={S.container} width={width} height={height} ref={ref}/>
        </>
    );
}