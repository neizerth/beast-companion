import S from './Arrow.module.scss';
import classNames from "classnames";
import arrowImg from './../../../../public/images/arrow.png';
import arrowHoverImg from './../../../../public/images/arrow_hover.png';

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
        typeClassName
    )
    return <div className={className} onClick={() => onClick()}>
        <img src={arrowImg} className={arrowClassName} alt=""/>
        <img src={arrowHoverImg} className={classNames(arrowClassName, S.hovered)} alt=""/>
    </div>
}