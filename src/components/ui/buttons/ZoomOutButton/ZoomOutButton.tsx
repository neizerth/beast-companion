import zoomInIcon from "@images/zoom_in.svg";
import {UIButton} from "@/components";
import {UIButtonProps} from "@/components/ui/buttons/UIButton/UIButton";

export const ZoomOutButton = (props: UIButtonProps) => <UIButton {...props} icon={zoomInIcon} name={'Zoom In'} />;