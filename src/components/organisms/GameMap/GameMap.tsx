import S from './GameMap.module.scss';
import {ILocationPath, MapType} from "../../../util/interfaces";
import classnames from "classnames";
import {useEffect, useState} from "react";
import {RefreshButton} from "../../molecules/RefreshButton/RefreshButton";
import {MapLocation} from "../../molecules/MapLocation/MapLocation";
import {MapLocationList} from "../MapLocationList/MapLocationList";
import {addLocation, getLocationVisitsCount, incVisitsCount, isLocationExists} from "../../helpers/locationPath";

export interface GameMapProps {
    className?: string;
    type: MapType
}

export interface MapSize {
    width: number;
    height: number;
    ratio?: number;
}

const useMapSize = (defaultSize?: MapSize) => {
    const mapSize = getMapSize(defaultSize);
    const [size, setSize] = useState(mapSize);
    useEffect(() => {
        const onResize = () => setSize(getMapSize(defaultSize));
        window.addEventListener('resize', onResize);
        onResize();
        return () => window.removeEventListener('resize', onResize);
    }, [defaultSize]);
    return size;
}

export const getMapSize = (defaultSize?: MapSize) => {
    const { innerWidth, innerHeight } = window;
    if (!defaultSize) {
        return { width: innerWidth, height: innerHeight, ratio: 1 };
    }

    let height = innerHeight - 4;
    let ratio = height / defaultSize.height;
    let width = ratio * defaultSize.width;

    if (width > innerWidth) {
        width = innerWidth;
        ratio = width / defaultSize.width;
        height = ratio * defaultSize.height;
    }

    return {width, height, ratio};
}

export interface MapLocationItem {
    top: number;
    left: number;
    size: number;
}

export interface MapData {
    settings: {
        width: number;
        height: number;
        defaultSize: number
    };
    items: MapLocationItem[]
}

export type MapJSONItem = [number, number, number[], number | undefined];

export const loadMapData = async (type: MapType): Promise<MapData> => {
    const url = `/data/map_${type}.json`;
    const response = await fetch(url);
    const data = await response.json();

    const [width, height, defaultSize] = data[0];
    const items = data.slice(1)
        .map((item: MapJSONItem) => {
            const [top, left,, size = defaultSize] = item;
            return {
                top,
                left,
                size
            };
        });

    return {
        settings: {
            width,
            height,
            defaultSize
        },
        items
    };
}

export const GameMap = (props: GameMapProps) => {
    const { className,type } = props;
    const imageUrl = `/images/maps/${type}.png`;

    const [data, setData] = useState<MapData>();
    const [defaultSize, setDefaultSize] = useState<MapSize>();
    const [locationPath, setLocationPath] = useState<ILocationPath>([]);
    const {width, height, ratio} = useMapSize(defaultSize);

    useEffect(() => {
        (async () => {
            const data = await loadMapData(type);
            if (!data) {
                return;
            }
            const {width, height} = data?.settings;

            setDefaultSize({
                width,
                height,
            });
            setData(data);
        })();
    }, [])

    const refreshPath = () => setLocationPath([]);
    const VISITS_LIMIT = 3;

    const setVisitsCount = (visitsCount: number) => {
        if (visitsCount > VISITS_LIMIT) {
            return 0;
        }
        return Math.max(0, visitsCount);
    };

    const onLocationVisit = (item: MapLocationItem) => {
        const exists = isLocationExists(locationPath, item);
        const nextPath = exists ?
            incVisitsCount(locationPath, item, setVisitsCount) :
            addLocation(locationPath, item, 1);
        setLocationPath(nextPath);
    };

    const loaded = data !== undefined;

    return (
        <div className={classnames(className, S.container)}>
            {loaded &&
                <>
                    <RefreshButton onClick={refreshPath} className={S.refresh}/>
                    <img src={imageUrl} width={width} height={height} className={S.image} alt=""/>
                    <MapLocationList
                        onVisit={onLocationVisit}
                        locationPath={locationPath}
                        items={data.items}
                        ratio={ratio}
                    />
                </>
            }
        </div>
    );
};