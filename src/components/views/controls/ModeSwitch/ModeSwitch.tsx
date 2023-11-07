import changeIcon from "../../../../../public/images/change.svg";
import pathIcon from "../../../../../public/images/path.svg";
import meepleIcon from "../../../../../public/images/meeple.svg";
import huntersIcon from "../../../../../public/images/target.svg";

import S from "./ModeSwitch.module.scss";
import {useAppDispatch, useAppSelector} from "../../../../hooks";
import {selectMode, setGameMode} from "../../../../features/gameMode/gameModeSlice";
import {GameMode} from "../../../../util/common";
import classNames from "classnames";
import {GameControl} from "../GameControl/GameControl";

export interface ModeSwitchProps {
    className?: string;
}

const icons: [GameMode, string][] = [
    [GameMode.PATH, pathIcon],
    [GameMode.LOCATIONS, changeIcon],
    [GameMode.MEEPLE, meepleIcon],
    [GameMode.HUNTERS, huntersIcon],
]

export const ModeSwitch = (props: ModeSwitchProps) => {
    const { className } = props;
    const currentGameMode = useAppSelector(selectMode);
    const dispatch = useAppDispatch();

    const getIconClassName = (gameMode: GameMode) => classNames([currentGameMode !== gameMode && S.selected])

    return (
        <div className={classNames(className, S.container)}>
            <div className={S.list}>
                {icons.map(([gameMode,icon], index) =>
                    <GameControl
                        className={S.item}
                        onClick={() => dispatch(setGameMode(gameMode))}
                        iconClassName={getIconClassName(gameMode)}
                        icon={icon}
                        key={index}
                        name={""}
                    />
                )}
            </div>
        </div>
    );
}