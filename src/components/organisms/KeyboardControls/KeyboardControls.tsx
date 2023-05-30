import {IMapLocationItem} from "../../../util/interfaces";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {addPathItem, clearPath, removeLastPathItem, selectPathData} from "../../../features/path/pathSlice";
import {useEffect} from "react";
import {getLocationDirectedLinks} from "../../../helpers/locationPath";
import {redo, selectHistoryData, selectHistoryIndex, undo} from "../../../features/history/historySlice";
import {useControls} from "react-zoom-pan-pinch";
import {selectMode, setGameMode} from "../../../features/gameMode/gameModeSlice";
import {GameMode} from "../../../util/common";
import {resetLocationsType, selectLocations} from "../../../features/locations/locationsSlice";
import {reset} from "../../../features/controls/controlsSlice";

export const KeyboardControls = () => {
    const path = useAppSelector(selectPathData);
    const locations = useAppSelector(selectLocations);

    const dispatch = useAppDispatch();
    const { zoomIn, zoomOut } = useControls();

    const gameMode = useAppSelector(selectMode);
    const historyIndex = useAppSelector(selectHistoryIndex);
    const history = useAppSelector(selectHistoryData);

    const isHistoryEmpty = history.length === 0;
    const isUndoDisabled = isHistoryEmpty || historyIndex < 2;
    const isRedoDisabled = isHistoryEmpty || historyIndex === history.length - 1;

    const getPathAction = (e: KeyboardEvent) => {
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
        if (['n', 'N'].includes(key)) {
            return addPathItem(last);
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
    const handleCommonMode = (key: string) => {
        if (key === '=') {
            // console.log('zoom in');
            zoomIn();
            return true;
        }
        if (key === '-') {
            zoomOut();
            return true;
        }
        if (['m', 'M'].includes(key)) {
            const mode = gameMode === GameMode.PATH ? GameMode.LOCATIONS : GameMode.PATH;
            dispatch(setGameMode(mode));
            return true;
        }
        return false;
    };
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const { key } = e;
            if (handleCommonMode(key)) {
                return;
            }
            if (gameMode !== GameMode.PATH) {
                return;
            }
            const action = getPathAction(e);
            if (!action) {
                return;
            }
            dispatch(action);
        };
        window.addEventListener('keyup', handler);
        return () => window.removeEventListener('keyup', handler);
    }, [path, gameMode]);
    return <></>;
}