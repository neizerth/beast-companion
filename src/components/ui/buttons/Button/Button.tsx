import S from './Button.module.scss'
import React, {ComponentProps} from "react";
import classNames from "classnames";

export type ButtonProps = ComponentProps<'button'>;

export const Button = ({ className, ...props}: ButtonProps) => {
  return <button {...props} className={classNames(S.container, className)}/>;
}