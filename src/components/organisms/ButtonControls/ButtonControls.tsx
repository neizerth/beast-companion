import S from "./ButtonControls.module.scss";
import {GameControl} from "../../molecules/GameControl/GameControl";
import classnames from "classnames";
import {HistoryControls} from "../HistoryControls/HistoryControls";
import {ZoomControls} from "../ZoomControls/ZoomControls";
import {useNavigate} from "react-router-dom";

import clearIcon from "../../../../public/images/clear.svg";
import backIcon from "../../../../public/images/back.svg";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {ModeSwitch} from "../ModeSwitch/ModeSwitch";
import {selectMode, setGameMode} from "../../../features/gameMode/gameModeSlice";
import {GameMode} from "../../../util/common";
import {clearPath, selectPathData} from "../../../features/path/pathSlice";
import {ResetLocationsTypeButton} from "../ResetLocationsTypeButton/ResetLocationsTypeButton";
import {CardMovementsButton} from "../CardMovementsButton/CardMovementsButton";
import {useEffect} from "react";

export interface GameControlsProps {
}

export const ButtonControls = () => {
    const gameMode = useAppSelector(selectMode);

    const dispatch = useAppDispatch();

    const isPathMode = gameMode === GameMode.PATH;
    const isLocationsMode = gameMode === GameMode.LOCATIONS;
    const isMovementMode = gameMode === GameMode.MOVEMENT;

    const path = useAppSelector(selectPathData);
    const navigate = useNavigate();

    const goHome = () => navigate('/');
    const clear = () => dispatch(clearPath());
    const canClear = path.length > 1;
    const showMovementButton = path.length > 1;

    return (
        <>
            {showMovementButton && <CardMovementsButton className={S.movement}/>}
            <div className={S.primary}>
                <div className={classnames(S.group, S.group_primary)}>
                    <div className={S.control}>
                        <ModeSwitch className={S.mode}/>
                    </div>
                    {isPathMode && <>
                        <div className={S.control}>
                            <GameControl
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
                    {isLocationsMode && <>
                        <div className={S.control}>
                            <ResetLocationsTypeButton className={S.clear}/>
                        </div>
                    </>}

                    {!isMovementMode && <div className={classnames(S.group, S.zoom)}>
                        <ZoomControls
                            controlClassName={S.control}
                        />
                    </div>}

                </div>
                <div className={classnames(S.group, S.group_back)}>
                    <GameControl
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