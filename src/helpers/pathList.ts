import {ILocationPath, ILocationPathList} from "../util/interfaces";
import {getLocationVisitIndex, getMutualLocationsVisitIndex} from "./locationPath";

export const generatePathList = (path: ILocationPath, skipNoAction = true) => {
    let skipIndex = 0;
    const pathList: ILocationPathList = path.reduce((target, item, index, self) => {
        if (index === 0) {
            return target;
        }
        if (item.index === self[index - 1]?.index && skipNoAction) {
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
    return pathList;
}