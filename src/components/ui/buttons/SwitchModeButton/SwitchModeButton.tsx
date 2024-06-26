import changeIcon from "@images/change.svg";
import pathIcon from "@images/path.svg";
import meepleIcon from "@images/meeple.svg";
import huntersIcon from "@images/target.svg";

import S from "./SwitchModeButton.module.scss";
import {selectMode, setGameMode} from "@/store/features/gameMode";
import {GameMode} from "@/util/common";
import classNames from "classnames";
import {IconButton} from "@/components";
import {useAppSelector} from "@/hooks/useAppSelector";
import {useAppDispatch} from "@/hooks/useAppDispatch";

export interface ModeSwitchProps {
  className?: string;
}

const icons: [GameMode, string][] = [
  [GameMode.PATH, pathIcon],
  [GameMode.LOCATIONS, changeIcon],
  [GameMode.MEEPLE, meepleIcon],
  [GameMode.HUNTERS, huntersIcon],
]

export const SwitchModeButton = (props: ModeSwitchProps) => {
  const {className} = props;
  const currentGameMode = useAppSelector(selectMode);
  const dispatch = useAppDispatch();

  const getIconClassName = (gameMode: GameMode) => classNames([currentGameMode !== gameMode && S.selected])

  return (
    <div className={classNames(className, S.container)}>
      <div className={S.list}>
        {icons.map(([gameMode, icon], index) =>
          <IconButton
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