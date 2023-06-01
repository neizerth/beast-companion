import {IMapData, IMapJSONData, IMapJSONItem, MapType} from "../../../util/interfaces";
import {MapController} from "../../organisms/MapController/MapController";
import {LoaderFunctionArgs, useLoaderData} from "react-router-dom";
import axios from 'axios';
import {Progress} from "../../atoms/Progress/Progress";
import {useImageDownloadProgress} from "../../../hooks/useImageDownloadProgress";

import S from "./MapRoute.module.scss";
import {useEffect} from "react";
import {useAppDispatch} from "../../../hooks";
import {startFrom} from "../../../features/path/pathSlice";
import {maps} from "../../../util/maps";
import {setLocations} from "../../../features/locations/locationsSlice";
import {setGameMode} from "../../../features/gameMode/gameModeSlice";
import {GameMode} from "../../../util/common";

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
    const url = maps[type].data;
    const { data } = await axios.get<IMapJSONData>(url);

    const [
        width,
        height,
        defaultSize,
        startLocation
    ] = data[0];

    const items = data[1]
        .map((item: IMapJSONItem, index) => {
            const [top, left, links, type, size = defaultSize] = item;
            return {
                index,
                defaultType: type,
                type,
                top,
                left,
                size,
                links
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
    const mapInfo = maps[type];

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