import S from "./ZoomControls.module.scss";
import {GameControl} from "../../molecules/GameControl/GameControl";
import classnames from "classnames";

import zoomInIcon from "../../../../public/images/zoom_in.svg";
import zoomOutIcon from "../../../../public/images/zoom_out.svg";
import {useControls, useTransformInit} from "react-zoom-pan-pinch";

export interface ZoomControlsProps {
    controlClassName?: string
}
export const ZoomControls = (props: ZoomControlsProps) => {
    const {
        controlClassName,
    } = props;

    const { zoomIn, zoomOut, instance } = useControls();

    useTransformInit(({ state }) => {
        const { scale } = state;

    });

    return <>
        <div className={S.control}>
            <GameControl
                onClick={zoomIn}
                className={classnames(controlClassName, S.zoom_in, S.control)}
                icon={zoomInIcon}
                name={"Zoom In"}
            />
        </div>
        <div className={S.control}>
            <GameControl
                onClick={zoomOut}
                className={classnames(controlClassName, S.zoom_out, S.control)}
                icon={zoomOutIcon}
                name={"Zoom Out"}
            />
        </div>
    </>
}