import React from "react";

import S from './GameControl.module.scss';
import classnames from "classnames";

export interface RefreshButtonProps {
    onClick?: React.MouseEventHandler;
    className?: string;
    icon: string;
    name: string;
}

export const GameControl = (props: RefreshButtonProps) => {
    const {
        className,
        onClick,
        icon,
        name,
    } = props;
    return <div className={classnames(className, S.container)} onClick={onClick}>
        <img className={S.icon} src={icon} alt={name}/>
    </div>
}