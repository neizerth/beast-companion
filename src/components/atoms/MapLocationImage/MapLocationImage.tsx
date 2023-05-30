import {MapLocationType} from "../../../util/interfaces";
import {MapLocationImageList} from "../../../util/locations";

import S from "./MapLocationImage.module.scss";
import classnames from "classnames";

export interface MapLocationImageProps {
    type: MapLocationType;
    ratio: number;
    locationSize: number;
    className?: string;
}

export const MapLocationImage = (props: MapLocationImageProps) => {
    const { type, className } = props;
    const { url, size } = MapLocationImageList[type];

    return <img src={url} className={classnames(className, S.image)} alt=""/>
}