import S from "./ZoomOutButton.module.scss";
import classnames from "classnames";
import {IconButton} from "@/components";
import {useControls} from "react-zoom-pan-pinch";
import zoomOutIcon from "@images/zoom_out.svg";
import {MIN_ZOOM} from "@/util/common";
import {useAppSelector} from "@/hooks/useAppSelector";
import {selectZoomScale} from "@/store/features/zoom";
import {PropsWithClassName} from "@/interfaces/common";

export type ZoomOutButtonProps = PropsWithClassName;

export const ZoomOutButton = ({ className }: ZoomOutButtonProps) => {
  const { zoomOut } = useControls();
  const scale = useAppSelector(selectZoomScale);
  const disabled = scale === MIN_ZOOM;

  return (
    <IconButton
      onClick={zoomOut}
      className={classnames(className, S.control)}
      icon={zoomOutIcon}
      disabled={disabled}
      name={"Zoom Out"}
    />
  );
}