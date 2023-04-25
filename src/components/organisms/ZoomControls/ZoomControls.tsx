import S from "./ZoomControls.module.scss";
import {GameControl} from "../../molecules/GameControl/GameControl";
import classnames from "classnames";

import zoomInIcon from "../../../../public/images/zoom_in.svg";
import zoomOutIcon from "../../../../public/images/zoom_out.svg";

export interface ZoomControlsProps {
    controlClassName?: string
    onZoomIn: CallableFunction;
    onZoomOut: CallableFunction;
}
export const ZoomControls = (props: ZoomControlsProps) => {
    const {
        controlClassName,
        onZoomIn,
        onZoomOut
    } = props;
    return <>
        <div className={S.control}>
            <GameControl
                onClick={onZoomIn}
                className={classnames(controlClassName, S.zoom_in, S.control)}
                icon={zoomInIcon}
                name={"Zoom In"}
            />
        </div>
        <div className={S.control}>
            <GameControl
                onClick={onZoomOut}
                className={classnames(controlClassName, S.zoom_out, S.control)}
                icon={zoomOutIcon}
                name={"Zoom Out"}
            />
        </div>
    </>
}