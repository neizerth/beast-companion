import {IMapJSONData, MapType} from "./interfaces";

import smallMapImage from "../../public/images/maps/small.png";
import smallHDMapImage from "../../public/images/maps/small_hd.jpg";
import largeMapImage from "../../public/images/maps/large.png";
import largeHDMapImage from "../../public/images/maps/large_hd.jpg";

import smallMapData from "../../public/data/map_small.json?url";
import smallHDMapData from "../../public/data/map_small_hd.json?url";
import largeMapData from "../../public/data/map_large.json?url";
import largeHDMapData from "../../public/data/map_large_hd.json?url";


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
    },
    small_hd: {
        image: smallHDMapImage,
        data: smallHDMapData,
    },
    large_hd: {
        image: largeHDMapImage,
        data: largeHDMapData,
    }
}