import S from "./ZoomControls.module.scss";
import {GameControl} from "../../molecules/GameControl/GameControl";
import classnames from "classnames";

import zoomInIcon from "../../../../public/images/zoom_in.svg";
import zoomOutIcon from "../../../../public/images/zoom_out.svg";
import {useControls, useTransformEffect, useTransformInit} from "react-zoom-pan-pinch";
import {useState} from "react";

export interface ZoomControlsProps {
    controlClassName?: string
}
export const ZoomControls = (props: ZoomControlsProps) => {
    const {
        controlClassName,
    } = props;

    const { zoomIn, zoomOut, instance } = useControls();
    const [scale, setScale] = useState(1);

    useTransformEffect(({ state }) => {
        const value = state.scale;

        setScale(value);
    });

    const isZoomOutDisabled = scale === 1;
    const isZoomInDisabled = scale === 8;

    return <>
        <div className={S.control}>
            <GameControl
                onClick={zoomIn}
                className={classnames(controlClassName, S.zoom_in, S.control)}
                icon={zoomInIcon}
                disabled={isZoomInDisabled}
                name={"Zoom In"}
            />
        </div>
        <div className={S.control}>
            <GameControl
                onClick={zoomOut}
                className={classnames(controlClassName, S.zoom_out, S.control)}
                icon={zoomOutIcon}
                disabled={isZoomOutDisabled}
                name={"Zoom Out"}
            />
        </div>
    </>
}