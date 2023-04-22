import {MapData, MapJSONData, MapJSONItem, MapType} from "../../../util/interfaces";
import {GameMap} from "../../organisms/GameMap/GameMap";
import {LoaderFunctionArgs, useLoaderData, useNavigate} from "react-router-dom";
import axios from 'axios';

export interface MapLoaderParams {
    type: MapType
}

export interface MapLoaderData {
    mapData: MapData
}

export const loader = async (args: LoaderFunctionArgs): Promise<MapLoaderData | null> => {
    const params = args.params as never as MapLoaderParams;
    const { type = MapType.NONE} = params;
    if (type === MapType.NONE) {
        return null;
    }
    const url = `/data/map_${type}.json`;
    const { data } = await axios.get<MapJSONData>(url);

    const [width, height, defaultSize] = data[0];
    const items = data[1]
        .map((item: MapJSONItem) => {
            const [top, left,, size = defaultSize] = item;
            return {
                top,
                left,
                size
            };
        });

    const mapData: MapData = {
        settings: {
            type,
            width,
            height,
            defaultSize
        },
        items
    };

    return {
        mapData
    };
}

export const MapRoute = () => {
    const navigate = useNavigate();
    const loaderData = useLoaderData() as never as MapLoaderData;
    const { mapData } = loaderData;

    const goHome = () => navigate('/');

    return <div className={S.container}>
        <GameMap
            data={mapData}
            onBack={goHome}
        />
    </div>
}