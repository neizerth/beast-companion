import React from "react";

import S from './IconButton.module.scss';
import classnames from "classnames";
import {Button} from "@/components";

export interface IconButtonProps {
  onClick?: CallableFunction;
  className?: string;
  iconClassName?: string;
  icon: string;
  name: string;
  disabled?: boolean;
}

export const IconButton = (props: IconButtonProps) => {
  const {
    className,
    onClick = () => void (0),
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
  return <Button className={classnames(className, S.container)} onClick={() => !disabled && onClick()}>
    <img className={iconClassName} src={icon} alt={name}/>
  </Button>
}