import S from "./ZoomInButton.module.scss";
import classnames from "classnames";
import zoomInIcon from "@images/zoom_in.svg";
import {IconButton} from "@/components";
import {useControls} from "react-zoom-pan-pinch";
import {MAX_ZOOM} from "@/util/common";
import {useAppSelector} from "@/hooks/useAppSelector";
import {selectZoomScale} from "@/store/features/zoom";
import {PropsWithClassName} from "@/interfaces/common";

export type ZoomInButtonProps = PropsWithClassName;

export const ZoomInButton = ({ className }: ZoomInButtonProps) => {
  const { zoomIn } = useControls();
  const scale = useAppSelector(selectZoomScale);
  const disabled = scale === MAX_ZOOM;
  return (
    <IconButton
      onClick={zoomIn}
      className={classnames(className, S.control)}
      icon={zoomInIcon}
      disabled={disabled}
      name={"Zoom In"}
    />
  );
}