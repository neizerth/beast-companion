import S from "./ZoomButton.module.scss";
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


export const ZoomButton = (props: ZoomControlsProps) => {
  const {
    controlClassName,
  } = props;

  return <>
    <div className={S.control}>

    </div>
    <div className={S.control}>

    </div>
  </>
}