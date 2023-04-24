import {ActionCreator, createSlice, PayloadAction, ThunkAction} from "@reduxjs/toolkit";
import {ILocationPath, IMapLocationItem} from "../../util/interfaces";
import {AppSelector, AppThunk} from "../../store";
import {addLocation, removeLocation} from "../../components/helpers/locationPath";
import {pushState as pushHistoryState, clear as clearHistory} from "../history/historySlice";

export interface IPathState {
    data: ILocationPath;
    startLocation: IMapLocationItem | null;
}

export type IChangeStatePayload = PayloadAction<ILocationPath>;
export type IStartFromStatePayload = PayloadAction<IMapLocationItem>;

export const EMPTY_LOCATION_PATH = [];

const initialState: IPathState = {
    data: EMPTY_LOCATION_PATH,
    startLocation: null
};

export const pathSlice = createSlice({
    name: 'path',
    initialState,
    reducers: {
        changePath(state,action: IChangeStatePayload) {
            state.data = [...action.payload];
        },
        startFrom(state, action: IStartFromStatePayload) {
            state.data = [action.payload];
            state.startLocation = action.payload;
        }
    }
});

export const {
    changePath,
    startFrom
} = pathSlice.actions;

export const addPathItem: ActionCreator<AppThunk> = (item: IMapLocationItem) => (dispatch,getState) => {
    const { path } = getState();
    const data = addLocation(path.data, item);
    dispatch(changePath(data));
    dispatch(pushHistoryState(data));
}

export const removePathItem: ActionCreator<AppThunk> = (item: IMapLocationItem) => (dispatch,getState) => {
    const { path } = getState();
    const data = removeLocation(path.data, item);
    dispatch(changePath(data));
    dispatch(pushHistoryState(data));
}

export const clearPath: ActionCreator<AppThunk> = (item: IMapLocationItem) =>
    (dispatch, getState) => {
        const { path } = getState();
        const { startLocation } = path;
        const action = startLocation ? startFrom(startLocation) : clearPath();
        dispatch(action);
        dispatch(clearHistory())
    }

export const selectPathData: AppSelector<ILocationPath> = ({ path }) => path.data;

export default pathSlice.reducer;