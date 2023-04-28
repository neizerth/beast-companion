import {ILocationPath, IMapLocationItem} from "../../../util/interfaces";
import S from "./MapLocationPath.module.scss";
import {useRef} from "react";
import {MapLocationLink} from "../../molecules/MapLocationLink/MapLocationLink";
import {getLocationVisitIndex, getLocationVisitsCount, getMutualLocationsVisitIndex} from "../../helpers/locationPath";
import {useAppSelector} from "../../../hooks";
import {selectPathData} from "../../../features/path/pathSlice";

export interface ILocationLinkItem {
    location: IMapLocationItem;
    visitIndex: number;
}

export interface ILocationPathListItem {
    source: ILocationLinkItem;
    target: ILocationLinkItem;
    mutualVisitIndex: number;
}

export type ILocationPathList = ILocationPathListItem[];

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
    const pathList: ILocationPathList = path.reduce((target, item, index, self) => {
        if (index === 0) {
            return target;
        }
        let source = target[index - 1]?.target;
        if (!source) {
            const location = self[index - 1];
            const visitIndex = getLocationVisitIndex(path, location, index);
            source = {
                location,
                visitIndex
            };
        }

        const visitIndex = getLocationVisitIndex(path, item, index);
        const mutualVisitIndex = getMutualLocationsVisitIndex(
            path,
            source.location,
            item,
            index
        );

        target.push({
            source,
            target: {
                location: item,
                visitIndex
            },
            mutualVisitIndex
        });

        return target;
    }, [] as ILocationPathList);

    const viewBox = `0 0 ${width} ${height}`;

    return (
        <svg className={S.container} viewBox={viewBox}>
            {pathList.map((item, key) => (
                <MapLocationLink
                    key={key}
                    index={key}
                    pathLength={pathList.length}
                    visitIndex={item.mutualVisitIndex}
                    source={item.source}
                    target={item.target}
                    ratio={ratio}
                />
            ))}
        </svg>
    );
}