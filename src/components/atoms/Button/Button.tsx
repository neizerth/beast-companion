import classnames from 'classnames';
import S from './Button.module.scss';
import React, {PropsWithChildren} from "react";

export interface ButtonProps extends PropsWithChildren {
    as?: React.FC<ButtonComponentProps>,
    className?: string,
    onClick?: React.MouseEventHandler;
}

export interface ButtonComponentProps {
    className: string
}

export const Button = (props: ButtonProps) => {
    const {
        className,
        as = 'button',
        ...rest
    } = props;
    const Component = as;
    return <Component {...rest} className={classnames(className, S.container)} />;
}