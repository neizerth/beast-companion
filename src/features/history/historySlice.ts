import {ActionCreator, createSlice, PayloadAction, ThunkAction} from "@reduxjs/toolkit";
import {ILocationPath} from "../../util/interfaces";
import {Dispatch} from "react";
import {AppSelector, AppThunk, RootState} from "../../store";

export interface IHistoryState {
    data: ILocationPath[];
    index: number
}

export type IPushHistoryStatePayload = PayloadAction<ILocationPath>;
export type IHistoryNavigationPayload = PayloadAction<IHistoryState["index"]>;

const initialState: IHistoryState = {
    data: [],
    index: 0
};

export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        pushState(state,action: IPushHistoryStatePayload) {
            const { data } = state;
            state.index = 0;
            state.data = [...data, action.payload];
        },
        go(state, action: IHistoryNavigationPayload) {
            state.index += action.payload;
        }
    }
});

export const { pushState, go } = historySlice.actions;

export const undo: ActionCreator<AppThunk> = () =>
    (dispatch) => dispatch(go(-1));

export const redo: ActionCreator<AppThunk> = () =>
    (dispatch) => dispatch(go(1));

export const selectHistoryIndex: AppSelector<number> = ({ history }) => history.index;
export const selectHistoryData: AppSelector<ILocationPath[]> = ({ history }) => history.data;

export default historySlice.reducer;