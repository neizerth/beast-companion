
import S from "./MapLocationLinkList.module.scss"
import {ILocationPath} from "../../../util/interfaces";
import {MapLocationItem} from "../GameMap/GameMap";
import classnames from "classnames";
import {MapLocationLink} from "../../molecules/MapLocationLink/MapLocationLink";
import React, {useState} from "react";
import {BezierConnector, DotEndpoint, JsPlumbInstance} from "@jsplumb/browser-ui";
import {indexOf} from "lodash";

export interface MapLocationLinkListProps {
    locationItems: MapLocationItem[];
    ratio: number;
    locationPath: ILocationPath;
    pathGraph: JsPlumbInstance;
}

export const MapLocationLinkList = (props: MapLocationLinkListProps) => {
    const {locationPath, ratio, pathGraph} = props;
    const refs: React.RefObject<Element>[] = locationPath.map(() => React.createRef());

    const getRefs = (index: number) => {
        if (index === 0) {
            return {};
        }
        const prevRef = refs[index - 1];
        const currentRef = refs[index];
        return {
            prevRef,
            currentRef
        };
    }
    const onConnect = (index: number) => {
        const { prevRef, currentRef } = getRefs(index);
        if (!currentRef?.current || !prevRef?.current) {
            return;
        }
        const connection = pathGraph.connect({
            source: prevRef.current,
            target: currentRef.current,
            connector:{
                type: BezierConnector.type,
                options:{
                    curviness: 50
                }
            }
        });

        connection && connection.destroy();
    };
    const onRemove = (index: number) => {
        const { prevRef, currentRef } = getRefs(index);
        if (!currentRef?.current || !prevRef?.current) {
            return;
        }
    }
    return <>
        {locationPath.map((item, key, self) =>
            <MapLocationLink
                onConnect={() => onConnect(key)}
                onRemove={() => onRemove(key)}
                key={key}
                ref={refs[key]}
                ratio={ratio}
                item={item}
            />
        )}
    </>;
}