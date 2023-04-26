import S from "./ZoomControls.module.scss";
import {GameControl} from "../../molecules/GameControl/GameControl";
import classnames from "classnames";

import zoomInIcon from "../../../../public/images/zoom_in.svg";
import zoomOutIcon from "../../../../public/images/zoom_out.svg";
import {useControls, useTransformEffect, useTransformInit} from "react-zoom-pan-pinch";
import {
    MAX_SCALE,
    MIN_SCALE,
    selectZoomScale,
    setZoom,
} from "../../../features/zoom/zoomSlice";
import {useAppDispatch, useAppSelector} from "../../../hooks";

export interface ZoomControlsProps {
    controlClassName?: string
}
export const ZoomControls = (props: ZoomControlsProps) => {
    const {
        controlClassName,
    } = props;

    const { zoomIn, zoomOut } = useControls();
    const scale = useAppSelector(selectZoomScale);
    const dispatch = useAppDispatch();

    useTransformEffect(({ state }) => {
        const value = state.scale;

        dispatch(setZoom(value));
    });

    const isZoomOutDisabled = scale === MIN_SCALE;
    const isZoomInDisabled = scale === MAX_SCALE;

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