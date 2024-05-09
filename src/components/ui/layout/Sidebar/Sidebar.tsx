import S from "./Sidebar.module.scss";
import classnames from "classnames";
import {useNavigate} from "react-router-dom";

import clearIcon from "@images/clear.svg";
import backIcon from "@images/back.svg";
import {selectMode} from "@/store/features/gameMode";
import {GameMode} from "@/util/common";
import {clearPath, selectPathData} from "@/store/features/path";
import {BeastMovementButton, HistoryControls, IconButton, ResetLocationsTypeButton, ZoomButton} from "@/components";
import {useAppSelector} from "@/hooks/useAppSelector";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {useZoom} from "@/hooks/useZoom";
import {ZoomInButton} from "@/components/ui/buttons/zoom/ZoomInButton/ZoomInButton";
import {ZoomOutButton} from "@/components/ui/buttons/zoom/ZoomOutButton/ZoomOutButton";

export interface GameControlsProps {
}

export const Sidebar = () => {
  useZoom();
  const gameMode = useAppSelector(selectMode);

  const dispatch = useAppDispatch();

  const isPathMode = gameMode === GameMode.PATH;
  const isLocationsMode = gameMode === GameMode.LOCATIONS;
  const isMovementMode = gameMode === GameMode.MOVEMENT;
  const isHuntersMode = gameMode === GameMode.HUNTERS;

  const path = useAppSelector(selectPathData);
  const navigate = useNavigate();

  const goHome = () => navigate('/');
  const clear = () => dispatch(clearPath());
  const canClear = path.length > 1;
  const showMovementButton = path.length > 1;

  return (
    <>
      {showMovementButton && <BeastMovementButton className={S.movement}/>}
      <div className={S.primary}>
        <div className={classnames(S.group, S.group_primary)}>
          {isPathMode && <>
              <div className={S.control}>
                  <IconButton
                      onClick={() => clear()}
                      className={classnames(S.clear)}
                      icon={clearIcon}
                      disabled={!canClear}
                      name={"Refresh"}
                  />
              </div>
              <div className={classnames(S.group, S.history)}>
                  <HistoryControls controlClassName={S.control}/>
              </div>
          </>}

          {isLocationsMode &&
              <>
                  <div className={S.control}>
                      <ResetLocationsTypeButton className={S.clear}/>
                  </div>
              </>
          }
          {!isMovementMode && (
            <div className={classnames(S.group, S.zoom)}>
              <ZoomInButton className={S.control}/>
              <ZoomOutButton className={S.control}/>
            </div>
          )}

        </div>
        <div className={classnames(S.group, S.group_back)}>
          <IconButton
            onClick={goHome}
            className={classnames(S.control, S.back)}
            icon={backIcon}
            name={"Go back"}
          />
        </div>
      </div>
    </>
  )
}