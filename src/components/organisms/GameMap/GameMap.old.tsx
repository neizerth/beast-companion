import * as jsPlumb from "@jsplumb/browser-ui"

import S from './GameMap.module.scss';
import {ILocationPath, MapData, MapLocationItem, MapSize} from "../../../util/interfaces";
import classnames from "classnames";
import {useEffect, useRef, useState} from "react";
import {RefreshButton} from "../../molecules/GameControl/GameControl";
import {MapLocationList} from "../MapLocationList/MapLocationList";
import {
    addLocation,
    getLocationVisitsCount,
    isLocationExists,
    isLocationLast, removeLocation
} from "../../helpers/locationPath";
import {useMapSize} from "../../../hooks/useMapSize";

export interface GameMapProps {
    className?: string;
    data: MapData
}

export const GameMap = (props: GameMapProps) => {
    const { className,data } = props;
    const { type } = data.settings;
    const imageUrl = `/images/maps/${type}.png`;

    // const [defaultSize, setDefaultSize] = useState<MapSize>();
    const [locationPath, setLocationPath] = useState<ILocationPath>([]);
    const [pathGraph, setPathGraph] = useState<jsPlumb.BrowserJsPlumbInstance>();
    // const {width, height, ratio} = useMapSize(defaultSize);

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

        // setLocationPath(addLocation(locationPath, item));
    };

    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) {
            return;
        }
        const graphInstance = jsPlumb.newInstance({
            container: ref.current
        });
        // setPathGraph(graphInstance);
    }, [locationPath])

    useEffect(() => console.log('map rendered'));

    // useEffect(() => {
    //     console.log('path changed');
    //     if (!pathGraph) {
    //         return;
    //     }
    //     pathGraph.reset();
    //     // const connections
    // }, [locationPath]);

    return (
        <div className={classnames(className, S.container)} ref={ref}>
            <>
                <RefreshButton onClick={refreshPath} className={S.refresh}/>
                {/*<img src={imageUrl} width={width} height={height} className={S.image} alt=""/>*/}

                {/*<MapLocationList*/}
                {/*    onVisit={onLocationVisit}*/}
                {/*    locationPath={locationPath}*/}
                {/*    locationItems={data.items}*/}
                {/*    ratio={ratio}*/}
                {/*/>*/}

                {/*<MapLocationLinkList*/}
                {/*    pathGraph={pathGraph}*/}
                {/*    locationPath={locationPath}*/}
                {/*    locationItems={data.items}*/}
                {/*    ratio={ratio}*/}
                {/*/>*/}
            </>
        </div>
    );
};