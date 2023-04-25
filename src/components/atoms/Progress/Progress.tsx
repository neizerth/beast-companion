import S from "./Progress.module.scss";
import {CSSProperties} from "react";
import {px} from "../../../util/common";

export interface ProgressProps {
    value: number;
}

export const Progress = (props: ProgressProps) => {
    const { value } = props;
    const valueStyle: CSSProperties = {
        width: value + '%'
    };
    return <div className={S.container}>
        <div className={S.value} style={valueStyle}></div>
    </div>
}