import zoomInIcon from "@images/zoom_in.svg";
import {IconButton} from "@/components";
import {UIButtonProps} from "@/components/ui/buttons/IconButton/IconButton";

export const ZoomOutButton = (props: UIButtonProps) => <IconButton {...props} icon={zoomInIcon} name={'Zoom In'}/>;