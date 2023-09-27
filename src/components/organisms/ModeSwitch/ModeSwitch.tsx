import classnames from "classnames";
import changeIcon from "../../../../public/images/change.svg";
import pathIcon from "../../../../public/images/path.svg";
import meepleIcon from "../../../../public/images/meeple.svg";
import {GameControl} from "../..";

import S from "./ModeSwitch.module.scss";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {selectMode, setGameMode} from "../../../features/gameMode/gameModeSlice";
import {GameMode} from "../../../util/common";

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

    const modes = [GameMode.PATH, GameMode.LOCATIONS, GameMode.MEEPLE];
    const modeIndex = modes.indexOf(gameMode);
    const nextIndex = modeIndex === modes.length - 1 ? 0 : modeIndex + 1;

    const nextMode = modes[nextIndex];
    const icon = icons[nextMode];
    console.log({
        gameMode,
        nextMode
    })

    const toggleMode = () => {

        // const mode = gameMode === GameMode.PATH ? GameMode.LOCATIONS : GameMode.PATH;
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