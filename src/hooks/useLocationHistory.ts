import {ILocationPath, MapLocationItem} from "../util/interfaces";
import {useState} from "react";

export type LocationHistoryHookResult = [CallableFunction, CallableFunction, CallableFunction, CallableFunction];

export const useLocationHistory = (locationPath: ILocationPath): LocationHistoryHookResult => {
    const [pathHistory, setPathHistory] = useState<ILocationPath[]>([locationPath]);
    const [historyIndex, setHistoryIndex] = useState(0);

    const onPathChange = (locationPath: ILocationPath) => {
        const actualHistory = pathHistory.slice(0, historyIndex + 1);
        setPathHistory([...actualHistory, locationPath]);
        setHistoryIndex(0);
    };

    const getMinHistoryIndex = () => Math.max(pathHistory.length - 1, 0);

    const makeHistoryAction = (historyIndexChange: number) => {
        const index = Math.min(
            Math.max(historyIndex + historyIndexChange, 0),
            getMinHistoryIndex()
        );

        if (index === historyIndex) {
            return;
        }

        setHistoryIndex(index);
        return pathHistory[index] || [];
    }
    const undo = () => makeHistoryAction(-1);
    const redo = () => makeHistoryAction(1);
    const clear = () => {
        setHistoryIndex(0);
        setPathHistory([]);
    }
    return [onPathChange, undo, redo, clear];
}