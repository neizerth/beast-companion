import smallMapImage from "../../public/images/maps/small.png";
import largeMapImage from "../../public/images/maps/large.png";

import smallMapData from "../../public/data/map_small.json?url";
import largeMapData from "../../public/data/map_large.json?url";

export interface IMapInfo {
    image: string;
    data: string;
}

export type IMapCollection = {
    [index: string]: IMapInfo
}

export const maps: IMapCollection = {
    small: {
        image: smallMapImage,
        data: smallMapData,
    },
    large: {
        image: largeMapImage,
        data: largeMapData
    }
}