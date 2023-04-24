import {ActionCreator, createSlice, PayloadAction, ThunkAction} from "@reduxjs/toolkit";
import {ILocationPath, IMapLocationItem} from "../../util/interfaces";
import {AppSelector, AppThunk} from "../../store";
import {addLocation, removeLocation} from "../../components/helpers/locationPath";

export interface IPathState {
    data: ILocationPath;
}

export type IChangeStatePayload = PayloadAction<ILocationPath>;

const initialState: IPathState = {
    data: [],
};

export const pathSlice = createSlice({
    name: 'path',
    initialState,
    reducers: {
        changePath(state,action: IChangeStatePayload) {
            state.data = [...action.payload];
        }
    }
});

export const { changePath } = pathSlice.actions;

export const addPathItem: ActionCreator<AppThunk> = (item: IMapLocationItem) => (dispatch,getState) => {
    const { data } = getState().path;
    const path = addLocation(data, item);
    dispatch(changePath(path));
}

export const removePathItem: ActionCreator<AppThunk> = (item: IMapLocationItem) => (dispatch,getState) => {
    const { data } = getState().path;
    const path = removeLocation(data, item);
    dispatch(changePath(path));
}

export const clearPath: ActionCreator<AppThunk> = (item: IMapLocationItem) =>
    (dispatch) => dispatch(changePath([]))

export const selectPathData: AppSelector<ILocationPath> = ({ path }) => path.data;

export default pathSlice.reducer;