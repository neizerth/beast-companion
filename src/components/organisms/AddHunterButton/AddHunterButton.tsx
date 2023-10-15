import S from './AddHunterButton.module.scss';
import {HunterType} from "../../../util/hunters";
import {GameControl} from "../..";
import classnames from "classnames";
import addIcon from "../../../../public/images/add.svg";
import classNames from "classnames";

export interface AddHunterButtonProps {
    className?: string;
    iconClassName?: string;
}

export const AddHunterButton = (props: AddHunterButtonProps) => {
    const { className, iconClassName } = props;
    return <GameControl
        className={classnames(className, S.container)}
        iconClassName={iconClassName}
        icon={addIcon}
        name={"Add Hunter"}
    />;
}