import S from "./HistoryControls.module.scss"
import {GameControl} from "../../molecules/GameControl/GameControl";
import {redo, selectHistoryData, selectHistoryIndex, undo} from "../../../features/history/historySlice";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import classnames from "classnames";

export interface HistoryControlsProps {
    controlClassName?: string;
}

export const HistoryControls = (props: HistoryControlsProps) => {
    const historyIndex = useAppSelector(selectHistoryIndex);
    const history = useAppSelector(selectHistoryData);

    const dispatch = useAppDispatch();

    const isHistoryEmpty = history.length === 0;
    const isUndoDisabled = isHistoryEmpty || historyIndex === 0;
    const isRedoDisabled = isHistoryEmpty || historyIndex === history.length - 1;

    const handleUndo = () => dispatch(undo());
    const handleRedo = () => dispatch(redo());

    const controlClassName = classnames(props.controlClassName, S.control)
    return <>
        <div className={S.container}>
            <div className={controlClassName}>
                <GameControl
                    onClick={handleUndo}
                    className={S.undo}
                    icon={"/images/undo.svg"}
                    name={"Undo"}
                    disabled={isUndoDisabled}
                />
            </div>
            <div className={controlClassName}>
                <GameControl
                    onClick={handleRedo}
                    className={S.redo}
                    icon={"/images/redo.svg"}
                    name={"Redo"}
                    disabled={isRedoDisabled}
                />
            </div>
        </div>
    </>;
}