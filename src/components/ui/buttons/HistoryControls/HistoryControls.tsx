import S from "./HistoryControls.module.scss"
import {UIButton} from "../../../index";
import {redo, selectHistoryData, selectHistoryIndex, undo} from "../../../../features/history";
import {useAppDispatch, useAppSelector} from "../../../../hooks";
import classnames from "classnames";

import undoIcon from "@images/undo.svg";
import redoIcon from "@images/redo.svg";

export interface HistoryControlsProps {
    controlClassName?: string;
}

export const HistoryControls = (props: HistoryControlsProps) => {
    const historyIndex = useAppSelector(selectHistoryIndex);
    const history = useAppSelector(selectHistoryData);

    const dispatch = useAppDispatch();

    const isHistoryEmpty = history.length === 0;
    const isUndoDisabled = isHistoryEmpty || historyIndex < 2;
    const isRedoDisabled = isHistoryEmpty || historyIndex === history.length - 1;

    const handleUndo = () => dispatch(undo());
    const handleRedo = () => dispatch(redo());

    const controlClassName = classnames(props.controlClassName, S.control);

    return <>
        <div className={controlClassName}>
            <UIButton
                onClick={handleUndo}
                className={S.undo}
                icon={undoIcon}
                name={"Undo"}
                disabled={isUndoDisabled}
            />
        </div>
        <div className={controlClassName}>
            <UIButton
                onClick={handleRedo}
                className={S.redo}
                icon={redoIcon}
                name={"Redo"}
                disabled={isRedoDisabled}
            />
        </div>
    </>;
}