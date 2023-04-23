import S from "./MapControls.module.scss";
import {GameControl} from "../../molecules/GameControl/GameControl";
import classnames from "classnames";

export interface GameControlsProps {
    onClear: CallableFunction;
    onBack: CallableFunction;
    onUndo: CallableFunction;
    onRedo: CallableFunction;
    onZoomIn: CallableFunction;
    onZoomOut: CallableFunction;
}

export const MapControls = (props: GameControlsProps) => {
    const { onClear, onBack, onUndo, onRedo } = props;
    return (
        <div className={S.primary}>
            <div className={S.group}>
                <div className={S.control}>
                    <GameControl
                        onClick={() => onClear()}
                        className={classnames(S.clear)}
                        icon={"/images/clear.svg"}
                        name={"Refresh"}
                    />
                </div>
                <div className={S.history}>
                    <div className={S.control}>
                        <GameControl
                            onClick={() => onUndo()}
                            className={S.undo}
                            icon={"/images/undo.svg"}
                            name={"Undo"}
                        />
                    </div>
                    <div className={S.control}>
                        <GameControl
                            onClick={() => onRedo()}
                            className={S.redo}
                            icon={"/images/redo.svg"}
                            name={"Redo"}
                        />
                    </div>
                </div>
                <div className={S.zoom}>
                    <div className={S.control}>
                        <GameControl
                            className={classnames(S.zoom_in, S.control)}
                            icon={"/images/zoom_in.svg"}
                            name={"Zoom In"}
                        />
                    </div>
                    <div className={S.control}>
                        <GameControl
                            className={S.control}
                            icon={"/images/zoom_out.svg"}
                            name={"Zoom Out"}
                        />
                    </div>
                </div>
            </div>
            <div className={S.group}>
                <GameControl
                    onClick={e => onBack()}
                    className={classnames(S.control, S.back)}
                    icon={"/images/back.svg"}
                    name={"Go back"}
                />
            </div>
        </div>
    )
}