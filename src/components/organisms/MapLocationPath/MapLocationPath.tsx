import {ILocationPathListItem} from "../../../util/interfaces";
import S from "./MapLocationPath.module.scss";
import {useAppSelector} from "../../../hooks";
import {selectPathData} from "../../../features/path/pathSlice";
import {generatePathList} from "../../../helpers/pathList";
import {useEffect, useRef} from "react";
import {renderPath} from "./renderPath";
import {MapLocationLinkArrow} from "../../atoms/MapLocationLinkArrow/MapLocationLinkArrow";
import {selectMode} from "../../../features/gameMode/gameModeSlice";
import {GameMode} from "../../../util/common";

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

    const mode = useAppSelector(selectMode);
    const isPathMode = mode === GameMode.PATH;
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

    const getArrowAngle = (item: ILocationPathListItem) => {

    };

    return (
        <>
            {isPathMode && <canvas className={S.container} width={width} height={height} ref={ref}/>}
            {pathList.map((item, key) =>
                <MapLocationLinkArrow
                    key={key}
                    pathItem={item}
                    isLast={key === pathList.length - 1}
                    ratio={ratio}
                />
            )}
        </>
    );
}