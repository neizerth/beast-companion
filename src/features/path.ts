import {ActionCreator, createSlice, PayloadAction, ThunkAction} from "@reduxjs/toolkit";
import {ILocationPath, IMapLocationItem} from "../util/interfaces";
import {AppSelector, AppThunk} from "../store";
import {addLocation, IPathItemAction, removeLocation, startFromLocation} from "../helpers/locationPath";
import {pushState as pushHistoryState, clear as clearHistory} from "./history";
import {last} from "lodash";

export interface IPathState {
    data: ILocationPath;
    startLocation: IMapLocationItem | null;
}

export type IChangeStatePayload = PayloadAction<ILocationPath>;
export type IStartFromStatePayload = PayloadAction<IMapLocationItem>;
export type IChangeStartLocationStatePayload = PayloadAction<IMapLocationItem>;

export const EMPTY_LOCATION_PATH = [];

const initialState: IPathState = {
    data: EMPTY_LOCATION_PATH,
    startLocation: null
};

export const path = createSlice({
    name: 'path',
    initialState,
    reducers: {
        setStartLocation(state,action: IStartFromStatePayload) {
            state.startLocation = action.payload;
        },
        changePath(state,action: IChangeStatePayload) {
            state.data = [...action.payload];
        },
    }
});

export const {
    changePath,
    setStartLocation
} = path.actions;

export type IPathItemActionCreatorBuilder = (action: IPathItemAction) => ActionCreator<AppThunk>;

export const buildPathItemActionCreator: IPathItemActionCreatorBuilder = (pathItemAction: IPathItemAction) =>
    (item: IMapLocationItem) => (dispatch,getState) => {
        const { path } = getState();
        const data = pathItemAction(path.data, item);
        const lastItem = last(data);

        dispatch(changePath(data));
        dispatch(pushHistoryState(data));
        if (lastItem) {
            dispatch(setStartLocation(lastItem));
        }
    }

export const addPathItem= buildPathItemActionCreator(addLocation);

export const removePathItem= buildPathItemActionCreator(removeLocation);

export const startFrom: ActionCreator<AppThunk> = (item: IMapLocationItem) => (dispatch,getState) => {
    dispatch(setStartLocation(item));
    dispatch(clearPath());
}

export const removeLastPathItem: ActionCreator<AppThunk> = () => (dispatch,getState) => {
    const { path } = getState();
    const item = path.data[path.data.length - 1];
    dispatch(removePathItem(item));
}

export const clearPath: ActionCreator<AppThunk> = () =>
    (dispatch, getState) => {
        const { path } = getState();
        const { startLocation } = path;
        const data = startFromLocation(startLocation);
        dispatch(clearHistory());
        dispatch(changePath(data));
        dispatch(pushHistoryState(data));
    }

export const selectPathData: AppSelector<ILocationPath> = ({ path }) => path.data;

export default path.reducer;