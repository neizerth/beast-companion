import S from './AddHunterButton.module.scss';
import {UIButton} from "@components";
import classnames from "classnames";
import addIcon from "@images/add.svg";
import classNames from "classnames";

export interface AddHunterButtonProps {
    className?: string;
    iconClassName?: string;
    onClick: CallableFunction;
}

export const AddHunterButton = (props: AddHunterButtonProps) => {
    const { className, iconClassName, onClick } = props;
    return <UIButton
        onClick={onClick}
        className={classnames(className, S.container)}
        iconClassName={iconClassName}
        icon={addIcon}
        name={"Add Hunter"}
    />;
}