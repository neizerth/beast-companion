import {IMapData, IMapJSONData, IMapJSONItem, MapType} from "../../../util/interfaces";
import {MapController} from "../../organisms/MapController/MapController";
import {LoaderFunctionArgs, useLoaderData, useNavigate} from "react-router-dom";
import axios from 'axios';
import {Progress} from "../../atoms/Progress/Progress";
import {useDownloadProgress} from "../../../hooks/useDownloadProgress";

import S from "./MapRoute.module.scss";
import {useEffect} from "react";
import {useAppDispatch} from "../../../hooks";
import {startFrom} from "../../../features/path/pathSlice";
import {maps} from "../../../util/maps";

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
        .map((item: IMapJSONItem) => {
            const [top, left,, size = defaultSize] = item;
            return {
                top,
                left,
                size
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
    const progress = useDownloadProgress(mapInfo.image);
    const startLocation = mapData.items[mapData.settings.startLocation];

    useEffect(() => {
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