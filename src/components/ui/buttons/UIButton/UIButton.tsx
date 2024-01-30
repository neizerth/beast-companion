import React from "react";

import S from './UIButton.module.scss';
import classnames from "classnames";

export interface RefreshButtonProps {
    onClick?: CallableFunction;
    className?: string;
    iconClassName?: string;
    icon: string;
    name: string;
    disabled?: boolean;
}

export const UIButton = (props: RefreshButtonProps) => {
    const {
        className,
        onClick = () => void(0),
        icon,
        name,
        disabled
    } = props;
    const iconClassName = classnames(
        S.icon,
        props.iconClassName,
        {
            [S.disabled]: disabled,
            [S.active]: !disabled
        }
    );
    return <div className={classnames(className, S.container)} onClick={() => !disabled && onClick()}>
        <img className={iconClassName} src={icon} alt={name}/>
    </div>
}