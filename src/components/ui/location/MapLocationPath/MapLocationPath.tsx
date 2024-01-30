import {ILocationPathList, ILocationPathListItem} from "../../../../util/interfaces";
import S from "./MapLocationPath.module.scss";
import {useAppSelector} from "../../../../hooks";
import {selectPathData} from "../../../../features/path";
import {generatePathList} from "../../../../helpers/pathList";
import {useEffect, useRef} from "react";
import {renderPath} from "./renderPath";
import {MapLocationLinkArrow} from "../MapLocationLinkArrow/MapLocationLinkArrow";

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

    const getArrowAngle = (item: ILocationPathListItem) => {

    };

    return (
        <>
            <canvas className={S.container} width={width} height={height} ref={ref}/>
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