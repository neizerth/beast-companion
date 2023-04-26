import {IMapLocationItem} from "../../../util/interfaces";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {addPathItem, clearPath, removeLastPathItem, selectPathData} from "../../../features/path/pathSlice";
import {useEffect} from "react";
import {getLocationDirectedLinks} from "../../helpers/locationPath";
import {redo, selectHistoryData, selectHistoryIndex, undo} from "../../../features/history/historySlice";
import {useControls} from "react-zoom-pan-pinch";

export interface KeyboardControlsProps {
    locations: IMapLocationItem[]
}

export const KeyboardControls = (props: KeyboardControlsProps) => {
    const { locations } = props;
    const path = useAppSelector(selectPathData);
    const dispatch = useAppDispatch();
    const { zoomIn, zoomOut } = useControls();

    const historyIndex = useAppSelector(selectHistoryIndex);
    const history = useAppSelector(selectHistoryData);

    const isHistoryEmpty = history.length === 0;
    const isUndoDisabled = isHistoryEmpty || historyIndex < 2;
    const isRedoDisabled = isHistoryEmpty || historyIndex === history.length - 1;

    const getAction = (e: KeyboardEvent) => {
        const { key, ctrlKey, metaKey, shiftKey } = e;
        if (key === 'Backspace') {
            return removeLastPathItem();
        }
        if (key === 'Delete') {
            return clearPath();
        }
        if (['z', 'Z'].includes(key) && (ctrlKey || metaKey)) {
            if (shiftKey && !isRedoDisabled) {
                return redo();
            }
            if (!shiftKey && !isUndoDisabled) {
                return undo()
            }
        }
        const last = path[path.length - 1];
        if (!last) {
            return;
        }
        const links = getLocationDirectedLinks(locations, last);
        if (['ArrowLeft', 'a', 'A'].includes(key) && links.left) {
            return addPathItem(links.left);
        }
        if (['ArrowUp', 'w', 'W'].includes(key) && links.top) {
            return  addPathItem(links.top);
        }
        if (['ArrowRight', 'd', 'D'].includes(key) && links.right) {
            return addPathItem(links.right);
        }
        if (['ArrowDown', 's', 'S'].includes(key) && links.bottom) {
            return addPathItem(links.bottom);
        }
    }
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const { key } = e;
            if (key === '=') {
                // console.log('zoom in');
                return zoomIn();
            }
            if (key === '-') {
                return zoomOut();
            }
            const action = getAction(e);
            if (!action) {
                return;
            }
            dispatch(action);
        };
        window.addEventListener('keyup', handler);
        return () => window.removeEventListener('keyup', handler);
    }, [path]);
    return <></>;
}