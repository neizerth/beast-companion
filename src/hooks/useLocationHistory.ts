import {ILocationPath} from "../util/interfaces";
import {useState} from "react";

export const useLocationHistory = (locationPath: ILocationPath) => {
    const [pathHistory, setPathHistory] = useState<ILocationPath>(locationPath);
    const onPathChange = (value) => {

    };
    return [onPathChange, undo, redo];
}