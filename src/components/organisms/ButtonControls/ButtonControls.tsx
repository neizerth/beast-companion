import S from "./ButtonControls.module.scss";
import {GameControl} from "../../molecules/GameControl/GameControl";
import classnames from "classnames";
import {HistoryControls} from "../HistoryControls/HistoryControls";
import {ZoomControls} from "../ZoomControls/ZoomControls";
import {useNavigate} from "react-router-dom";

import clearIcon from "../../../../public/images/clear.svg";
import backIcon from "../../../../public/images/back.svg";

export interface GameControlsProps {
    onClear: CallableFunction;
}

export const ButtonControls = (props: GameControlsProps) => {
    const { onClear } = props;

    const navigate = useNavigate();
    const goHome = () => navigate('/');

    return (
        <>
            <div className={S.primary}>
                <div className={classnames(S.group, S.group_primary)}>
                    <div className={S.control}>
                        <GameControl
                            onClick={() => onClear()}
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