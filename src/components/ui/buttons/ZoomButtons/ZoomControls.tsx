import S from "./ZoomControls.module.scss";
import {IconButton} from "@/components";
import classnames from "classnames";

import zoomInIcon from "@images/zoom_in.svg";
import zoomOutIcon from "@images/zoom_out.svg";
import {useControls, useTransformEffect} from "react-zoom-pan-pinch";

import {selectZoomScale, setZoom,} from "@/store/features/zoom";
import {MAX_ZOOM, MIN_ZOOM} from "@/util/common";
import {debounce} from "lodash";
import {useAppSelector} from "@/hooks/useAppSelector";
import {useAppDispatch} from "@/hooks/useAppDispatch";

export interface ZoomControlsProps {
  controlClassName?: string
}

export const ZoomControls = (props: ZoomControlsProps) => {
  const {
    controlClassName,
  } = props;

  const {zoomIn, zoomOut} = useControls();
  const scale = useAppSelector(selectZoomScale);
  const dispatch = useAppDispatch();

  const setZoomValue = debounce(
    (value: number) => dispatch(setZoom(value)),
    50
  );

  useTransformEffect(({state}) => {
    const value = state.scale;

    setZoomValue(value);
  });

  const isZoomOutDisabled = scale === MIN_ZOOM;
  const isZoomInDisabled = scale === MAX_ZOOM;

  return <>
    <div className={S.control}>
      <IconButton
        onClick={zoomIn}
        className={classnames(controlClassName, S.zoom_in, S.control)}
        icon={zoomInIcon}
        disabled={isZoomInDisabled}
        name={"Zoom In"}
      />
    </div>
    <div className={S.control}>
      <IconButton
        onClick={zoomOut}
        className={classnames(controlClassName, S.zoom_out, S.control)}
        icon={zoomOutIcon}
        disabled={isZoomOutDisabled}
        name={"Zoom Out"}
      />
    </div>
  </>
}