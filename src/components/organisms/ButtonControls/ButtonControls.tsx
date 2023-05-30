import S from "./ButtonControls.module.scss";
import {GameControl} from "../../molecules/GameControl/GameControl";
import classnames from "classnames";
import {HistoryControls} from "../HistoryControls/HistoryControls";
import {ZoomControls} from "../ZoomControls/ZoomControls";
import {useNavigate} from "react-router-dom";

import clearIcon from "../../../../public/images/clear.svg";
import backIcon from "../../../../public/images/back.svg";
import changeIcon from "../../../../public/images/change.svg";
import {clearPath} from "../../../features/path/pathSlice";
import {useAppDispatch} from "../../../hooks";
import {ModeSwitch} from "../ModeSwitch/ModeSwitch";

export interface GameControlsProps {
}

export const ButtonControls = () => {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    const goHome = () => navigate('/');
    const clear = () => dispatch(clearPath());

    return (
        <>
            <div className={S.primary}>
                <div className={classnames(S.group, S.group_primary)}>
                    <div className={S.control}>
                        <ModeSwitch className={S.mode}/>
                    </div>
                    <div className={S.control}>
                        <GameControl
                            onClick={() => clear()}
                            className={classnames(S.clear)}
                            icon={clearIcon}
                            name={"Refresh"}
                        />
                    </div>
                    <div className={classnames(S.group, S.history)}>
                        <HistoryControls controlClassName={S.control}/>
                    </div>
                    <div className={classnames(S.group, S.zoom)}>
                        <ZoomControls
                            controlClassName={S.control}
                        />
                    </div>
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