import icon from "@images/zoom_out.svg";
import {UIButton} from "@/components";
import {UIButtonProps} from "@/components/ui/buttons/UIButton/UIButton";

export const ZoomOutButton = (props: UIButtonProps) => <UIButton {...props} icon={icon} name={'Zoom In'} />;