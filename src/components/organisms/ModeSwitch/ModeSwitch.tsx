import classnames from "classnames";
import changeIcon from "../../../../public/images/change.svg";
import pathIcon from "../../../../public/images/path.svg";
import {GameControl} from "../..";

import S from "./ModeSwitch.module.scss";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {selectMode, setGameMode} from "../../../features/gameMode/gameModeSlice";
import {GameMode} from "../../../util/common";

export interface ModeSwitchProps {
    className?: string;
}

const icons = {
    [GameMode.PATH]: changeIcon,
    [GameMode.LOCATIONS]: pathIcon
}

export const ModeSwitch = (props: ModeSwitchProps) => {
    const { className } = props;
    const gameMode = useAppSelector(selectMode);
    const dispatch = useAppDispatch();
    const icon = icons[gameMode];

    const toggleMode = () => {
        const mode = gameMode === GameMode.PATH ? GameMode.LOCATIONS : GameMode.PATH;
        dispatch(setGameMode(mode));
    }

    return (
        <GameControl
            onClick={toggleMode}
            className={classnames(className, S.button)}
            icon={icon}
            name={""}
        />
    );
}