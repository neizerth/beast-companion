import S from './UIButton.module.scss';
import React from "react";
import {Button, ButtonProps} from "@/components";
import classNames from "classnames";

export type UIButtonProps = ButtonProps

export const UIButton = ({ className, ...props}: UIButtonProps) => {
  return (
    <Button {...props} className={classNames(S.container, className)}/>
  );
}