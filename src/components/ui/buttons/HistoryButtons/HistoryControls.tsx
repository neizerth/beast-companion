import S from "./HistoryControls.module.scss"
import {IconButton} from "@/components";
import {redo, selectHistoryData, selectHistoryIndex, undo} from "@/store/features/history";
import classnames from "classnames";

import undoIcon from "@images/undo.svg";
import redoIcon from "@images/redo.svg";
import {useAppSelector} from "@/hooks/useAppSelector";
import {useAppDispatch} from "@/hooks/useAppDispatch";

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
      <IconButton
        onClick={handleUndo}
        className={S.undo}
        icon={undoIcon}
        name={"Undo"}
        disabled={isUndoDisabled}
      />
    </div>
    <div className={controlClassName}>
      <IconButton
        onClick={handleRedo}
        className={S.redo}
        icon={redoIcon}
        name={"Redo"}
        disabled={isRedoDisabled}
      />
    </div>
  </>;
}