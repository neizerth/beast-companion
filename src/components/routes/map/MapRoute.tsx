import {IMapData, IMapJSONData, IMapJSONItem, MapMeepleType, MapType} from "../../../util/interfaces";
import {MapController} from "../../organisms/MapController/MapController";
import {LoaderFunctionArgs, useLoaderData} from "react-router-dom";
import axios from 'axios';
import {Progress} from "../../atoms/Progress/Progress";
import {useImageDownloadProgress} from "../../../hooks/useImageDownloadProgress";

import S from "./MapRoute.module.scss";
import {useEffect} from "react";
import {useAppDispatch} from "../../../hooks";
import {startFrom} from "../../../features/path/pathSlice";
import {map} from "../../../util/map";
import {setLocations} from "../../../features/locations/locationsSlice";
import {setGameMode} from "../../../features/gameMode/gameModeSlice";
import {GameMode} from "../../../util/common";
import {toMeeple} from "../../../util/meeple";

export interface MapLoaderParams {
    type: MapType
}

export interface MapLoaderData {
    mapData: IMapData
}

export const loader = async (args: LoaderFunctionArgs): Promise<MapLoaderData | null> => {
    const params = args.params as never as MapLoaderParams;
    const { type = MapType.NONE} = params;
    if (type === MapType.NONE) {
        return null;
    }
    const url = map[type].data;
    const { data } = await axios.get<IMapJSONData>(url);

    const [
        width,
        height,
        defaultSize,
        startLocation
    ] = data[0];

    const items = data[1]
        .map((item: IMapJSONItem, index) => {
            const [
                top,
                left,
                links,
                type,
                size,
                meepleType = MapMeepleType.NO_MEEPLE
            ] = item;

            const meeple = toMeeple(meepleType);

            return {
                index,
                defaultType: type,
                type,
                top,
                left,
                size: size || defaultSize,
                links,
                defaultMeepleType: meepleType,
                meeple,
                hunters: []
            };
        });

    const mapData: IMapData = {
        settings: {
            type,
            width,
            height,
            defaultSize,
            startLocation
        },
        items
    };

    return {
        mapData
    };
}

export const MapRoute = () => {
    const loaderData = useLoaderData() as never as MapLoaderData;
    const { mapData } = loaderData;
    const { type } = mapData.settings;
    const mapInfo = map[type];

    const dispatch = useAppDispatch();
    const progress = useImageDownloadProgress(mapInfo.image);
    const startLocation = mapData.items[mapData.settings.startLocation];

    useEffect(() => {
        dispatch(setGameMode(GameMode.PATH));
        dispatch(setLocations(mapData.items));
        dispatch(startFrom(startLocation));
    }, [])

    const isLoaded = progress === 100;

    return <div className={S.container}>
        {!isLoaded ?
            <Progress value={progress}/>:
            <MapController
                mapUrl={mapInfo.image}
                data={mapData}
            />
        }
    </div>
}