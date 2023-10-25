import S from './Arrow.module.scss';
import classNames from "classnames";

export enum ArrowType {
    LEFT = 'left',
    RIGHT = 'right',
    TOP = 'top',
    BOTTOM = 'bottom'
}

export interface ArrowProps {
    type: ArrowType,
    className: string,
    onClick: CallableFunction
}

export const Arrow = (props: ArrowProps) => {
    const {
        onClick,
        type
    } = props;
    const typeClassName = S[type];

    const className = classNames(
        S.container,
        props.className
    );
    const arrowClassName = classNames(
        S.arrow,
        typeClassName,
    )
    return <button type={"button"} className={className} onClick={() => onClick}>
        <div className={arrowClassName}/>
    </button>
}