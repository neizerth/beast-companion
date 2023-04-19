import React from "react";

import S from './RefreshButton.module.scss';
import classnames from "classnames";

export interface RefreshButtonProps {
    onClick?: React.MouseEventHandler;
    className?: string;
}

export const RefreshButton = (props: RefreshButtonProps) => {
    const { className, onClick } = props;
    return <div className={classnames(className, S.container)} onClick={onClick}>
        <img className={S.icon} src="/images/refresh.svg" alt=""/>
    </div>
}