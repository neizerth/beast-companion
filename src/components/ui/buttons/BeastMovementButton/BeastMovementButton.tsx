import S from "./BeastMovementButton.module.scss";
import classNames from "classnames";

import buttonImage from '@images/movement/back.jpg';
import {useAppDispatch, useAppSelector} from "../../../../hooks";
import {selectMode, setGameMode} from "../../../../features/gameMode";
import {GameMode} from "../../../../util/common";
import {useEffect, useState} from "react";
import {useControls} from "react-zoom-pan-pinch";

export interface CardMovementsButtonProps {
    className?: string;
}

export const BeastMovementButton = (props: CardMovementsButtonProps) => {
    const dispatch = useAppDispatch();
    const gameMode = useAppSelector(selectMode);

    const { resetTransform } = useControls();

    const selected = gameMode === GameMode.MOVEMENT;

    const [lastMode, setLastMode] = useState(gameMode);

    useEffect(() => {
        if (selected) {
            return resetTransform();
        }

        setLastMode(gameMode);

    }, [gameMode]);

    const className = classNames(
        S.container,
        props.className,
        selected && S.selected
    );
    const modes = [lastMode, GameMode.MOVEMENT];

    const onClick = () => {
        const index = modes.indexOf(gameMode);
        const nextMode = modes[1 - index];

        dispatch(setGameMode(nextMode));
    }
    return <button className={className} onClick={() => onClick()}>
        <img className={S.image} src={buttonImage} alt=""/>
    </button>;
}