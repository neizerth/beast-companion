import S from "./MapControls.module.scss";
import {GameControl} from "../../molecules/GameControl/GameControl";
import classnames from "classnames";
import {HistoryControls} from "../HistoryControls/HistoryControls";
import {ZoomControls} from "../ZoomControls/ZoomControls";
import {useNavigate} from "react-router-dom";

import clearIcon from "../../../../public/images/clear.svg";
import backIcon from "../../../../public/images/back.svg";

export interface GameControlsProps {
    onClear: CallableFunction;
    onZoomIn: CallableFunction;
    onZoomOut: CallableFunction;
}

export const MapControls = (props: GameControlsProps) => {
    const { onClear, onZoomIn, onZoomOut } = props;

    const navigate = useNavigate();
    const goHome = () => navigate('/');

    return (
        <>
            <div className={S.primary}>
                <div className={S.group}>
                    <div className={S.control}>
                        <GameControl
                            onClick={() => onClear()}
                            className={classnames(S.clear)}
                            icon={clearIcon}
                            name={"Refresh"}
                        />
                    </div>
                    <div className={S.history}>
                        <HistoryControls controlClassName={S.control}/>
                    </div>
                    <div className={S.zoom}>
                        <ZoomControls
                            controlClassName={S.control}
                            onZoomIn={onZoomIn}
                            onZoomOut={onZoomOut}
                        />
                    </div>
                </div>
                <div className={S.group}>
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