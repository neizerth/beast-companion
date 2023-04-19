import * as jsPlumb from "@jsplumb/browser-ui"

import S from './GameMap.module.scss';
import {ILocationPath, MapType} from "../../../util/interfaces";
import classnames from "classnames";
import {useEffect, useRef, useState} from "react";
import {RefreshButton} from "../../molecules/RefreshButton/RefreshButton";
import {MapLocation} from "../../molecules/MapLocation/MapLocation";
import {MapLocationList} from "../MapLocationList/MapLocationList";
import {
    addLocation,
    getLocationVisitsCount,
    isLocationExists,
    isLocationLast, removeLocation
} from "../../helpers/locationPath";
import {MapLocationLinkList} from "../MapLocationLinkList/MapLocationLinkList";
import {Connection} from "@jsplumb/browser-ui";

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

export type MapJSONItem = [
    top: number,
    left: number,
    links: number[],
    size: number | undefined
];

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
    const [pathGraph, setPathGraph] = useState<jsPlumb.BrowserJsPlumbInstance>();
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
    }, []);

    const refreshPath = () => setLocationPath([]);
    const onLocationVisit = (item: MapLocationItem) => {
        const isLast = isLocationLast(locationPath, item);
        if (isLast) {
            const connections = pathGraph?.getConnections() || [];

            return setLocationPath(removeLocation(locationPath, item));
        }
        const inPath = isLocationExists(locationPath, item);
        const visitsCount = getLocationVisitsCount(locationPath, item);

        // if (inPath && visitsCount === VISITS_LIMIT) {
        //     return setLocationPath(removeLocation(locationPath, item));
        // }
        setLocationPath(addLocation(locationPath, item));
    };

    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) {
            return;
        }
        const graphInstance = jsPlumb.newInstance({
            container: ref.current
        });
        setPathGraph(graphInstance);
    }, [locationPath])

    // useEffect(() => {
    //     console.log('path changed');
    //     if (!pathGraph) {
    //         return;
    //     }
    //     pathGraph.reset();
    //     // const connections
    // }, [locationPath]);


    const loaded = data !== undefined && pathGraph;

    return (
        <div className={classnames(className, S.container)} ref={ref}>
            {loaded &&
                <>
                    <RefreshButton onClick={refreshPath} className={S.refresh}/>
                    <img src={imageUrl} width={width} height={height} className={S.image} alt=""/>
                    <MapLocationList
                        onVisit={onLocationVisit}
                        locationPath={locationPath}
                        locationItems={data.items}
                        ratio={ratio}
                    />
                    <MapLocationLinkList
                        pathGraph={pathGraph}
                        locationPath={locationPath}
                        locationItems={data.items}
                        ratio={ratio}
                    />
                </>
            }
        </div>
    );
};