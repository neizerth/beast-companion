import React, {CSSProperties, useEffect, useState} from "react";

import S from "./MapLocation.module.scss";
import classnames from "classnames";
import {px, scale} from "../../../util/common";

export interface MapLocationProps {
    onClick: CallableFunction;
    onLurk: CallableFunction;
    className: string;
    visitsCount: number;
    isFirst: boolean;
    isLast: boolean;
    isNext: boolean;
    ratio: number;
    top: number;
    left: number;
    size: number;
}

export const MapLocation = (props: MapLocationProps) => {
    const {
        className,
        isFirst,
        isLast,
        isNext,
        visitsCount,
        onClick,
        onLurk,
        ratio,
        size,
        top,
        left
    } = props;

    const isSelected = visitsCount > 0;

    const stateClassName = isLast ? S.last :
        isFirst ? S.first :
            isSelected && S.selected;

    const classList = [
        S.background,
        [stateClassName],
        {
            [S.next]: isNext
        }
    ];

    const k = (x: number) => px(scale(x, ratio));

    const style = {
        fontSize: k(size),
        width: k(size),
        height: k(size),
        top: k(top),
        left: k(left)
    };

    const canLurk = false;
    return <div
        style={style}
        className={classnames(className, S.container)}
    >
        {canLurk && <div className={S.lurk} onClick={() => onLurk()}>
            <svg xmlns="http://www.w3.org/2000/svg"
                 className={S.lurk__icon}
                 viewBox="0 0 28 28">
                    <path
                        d="M66.247,381.331L45.331,402.247C44.941,402.637 44.941,403.271 45.331,403.661C45.722,404.052 46.355,404.052 46.746,403.661L50.493,399.914C52.2,400.965 54.113,401.678 56.125,401.678C59.009,401.678 61.691,400.203 63.853,398.39C66.958,395.784 68.975,392.527 68.975,392.527C69.175,392.204 69.175,391.796 68.975,391.473C68.975,391.473 67.175,388.567 64.358,386.049L67.661,382.746C68.052,382.355 68.052,381.722 67.661,381.331C67.271,380.941 66.637,380.941 66.247,381.331ZM48.844,396.112C47.147,394.519 45.898,392.832 45.325,392C45.989,391.035 47.56,388.924 49.683,387.143C51.493,385.624 53.71,384.322 56.125,384.322C57.499,384.322 58.811,384.75 60.02,385.393C60.507,385.652 61.113,385.467 61.372,384.98C61.632,384.493 61.446,383.887 60.959,383.628C59.461,382.83 57.829,382.322 56.125,382.322C53.241,382.322 50.559,383.797 48.397,385.61C45.292,388.216 43.275,391.473 43.275,391.473C43.075,391.796 43.075,392.204 43.275,392.527C43.275,392.527 44.898,395.15 47.475,397.57C47.877,397.948 48.51,397.928 48.888,397.525C49.266,397.123 49.246,396.49 48.844,396.112ZM58.709,391.698C58.72,391.797 58.726,391.898 58.726,392C58.726,393.478 57.526,394.678 56.047,394.678C55.945,394.678 55.845,394.673 55.745,394.661L58.709,391.698ZM53.403,392.427C53.381,392.288 53.369,392.145 53.369,392C53.369,390.522 54.569,389.322 56.047,389.322C56.193,389.322 56.335,389.333 56.474,389.355C57.019,389.443 57.532,389.071 57.619,388.526C57.707,387.981 57.335,387.468 56.79,387.381C56.548,387.342 56.3,387.322 56.047,387.322C53.465,387.322 51.369,389.418 51.369,392C51.369,392.253 51.389,392.501 51.428,392.743C51.515,393.288 52.028,393.659 52.573,393.572C53.118,393.485 53.49,392.972 53.403,392.427Z"
                        transform="translate(-42 -378)"
                    />
            </svg>
        </div>}
        <div
            onClick={() => onClick()}
            className={classnames(classList)}
        >
            {visitsCount > 1 && <span className={S.counter}>{visitsCount}</span>}
        </div>
    </div>
};