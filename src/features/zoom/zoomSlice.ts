import {ActionCreator, createSlice, PayloadAction, ThunkAction} from "@reduxjs/toolkit";
import {ILocationPath, IMapLocationItem} from "../../util/interfaces";
import {AppSelector, AppThunk} from "../../store";
import {addLocation, removeLocation} from "../../components/helpers/locationPath";

export interface IZoomState {
    value: number;
}

export const INITIAL_ZOOM = 10;

export type IChangeStatePayload = PayloadAction<number>;

const initialState: IZoomState = {
    value: INITIAL_ZOOM,
};

export const zoomSlice = createSlice({
    name: 'zoom',
    initialState,
    reducers: {
        zoomAt(state,action: IChangeStatePayload) {
            state.value = action.payload
        }
    }
});

export const { zoomAt } = zoomSlice.actions;

export const zoomIn: ActionCreator<AppThunk> = (value = 1) => (dispatch, getState) => {
    const { zoom } = getState();
    dispatch(zoomAt(zoom.value - value));
};

export const zoomOut: ActionCreator<AppThunk> = (value = 1) => (dispatch, getState) => {
    const { zoom } = getState();
    dispatch(zoomAt(zoom.value + value));
};

export const unsetZoom: ActionCreator<AppThunk> = (value = 1) => (dispatch, getState) => {
    const { zoom } = getState();
    dispatch(zoomAt(INITIAL_ZOOM));
};

export const selectZoom: AppSelector<number> = ({ zoom }) => zoom.value;

export default zoomSlice.reducer;