import {ILocationPathList} from "../../../util/interfaces";
import S from "./MapLocationPath.module.scss";
import {MapLocationLink} from "../../molecules/MapLocationLink/MapLocationLink";
import {getLocationVisitIndex, getMutualLocationsVisitIndex} from "../../../helpers/locationPath";
import {useAppSelector} from "../../../hooks";
import {selectPathData} from "../../../features/path/pathSlice";

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
    let skipIndex = 0;
    const pathList: ILocationPathList = path.reduce((target, item, index, self) => {
        if (index === 0) {
            return target;
        }
        if (item.index === self[index - 1]?.index) {
            skipIndex++;
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
            index: target.length + skipIndex,
            source,
            target: {
                location: item,
                visitIndex
            },
            mutualVisitIndex: mutualVisitIndex
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
                    actionIndex={item.index}
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