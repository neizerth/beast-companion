import {ILocationPath, IMapLocationItem} from "../../../util/interfaces";
import S from "./MapLocationPath.module.scss";
import {useRef} from "react";
import {MapLocationLink} from "../../molecules/MapLocationLink/MapLocationLink";
import {getLocationVisitIndex, getLocationVisitsCount} from "../../helpers/locationPath";

export interface ILocationLinkItem {
    location: IMapLocationItem;
    visitIndex: number;
}

export interface ILocationPathListItem {
    source: ILocationLinkItem;
    target: ILocationLinkItem;
}

export type ILocationPathList = ILocationPathListItem[];

export interface MapLocationPathProps {
    path: ILocationPath;
    ratio: number;
}

export const MapLocationPath = (props: MapLocationPathProps) => {
    const {
        path,
        ratio
    } = props

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

        target.push({
            source,
            target: {
                location: item,
                visitIndex
            },
        });

        return target;
    }, [] as ILocationPathList);

    const makeConnection = (index: number) => {

    };

    const removeConnection = (index: number) => {

    }

    return (
        <div className={S.container}>
            {pathList.map((item, key) => (
                <MapLocationLink
                    key={key}
                    source={item.source}
                    target={item.target}
                    ratio={ratio}
                />
            ))}
        </div>
    );
}