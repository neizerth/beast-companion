import classnames from "classnames";
import changeIcon from "../../../../public/images/change.svg";
import pathIcon from "../../../../public/images/path.svg";
import meepleIcon from "../../../../public/images/meeple.svg";
import {GameControl} from "../..";

import S from "./ModeSwitch.module.scss";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {selectMode, setGameMode} from "../../../features/gameMode/gameModeSlice";
import {GameMode} from "../../../util/common";
import {GAME_MODES, getNextGameMode} from "../../../util/gameMode";

export interface ModeSwitchProps {
    className?: string;
}

const icons = {
    [GameMode.PATH]: pathIcon,
    [GameMode.LOCATIONS]: changeIcon,
    [GameMode.MEEPLE]: meepleIcon,
    [GameMode.MOVEMENT]: null
}



export const ModeSwitch = (props: ModeSwitchProps) => {
    const { className } = props;
    const gameMode = useAppSelector(selectMode);
    const dispatch = useAppDispatch();

    const nextMode = getNextGameMode(gameMode);
    const icon = icons[nextMode];

    const toggleMode = () => {
        dispatch(setGameMode(nextMode));
    }

    return (
        <>
            {icon && <GameControl
                onClick={toggleMode}
                className={classnames(className, S.button)}
                icon={icon}
                name={""}
            />}
        </>
    );
}