import {ActionCreator, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppSelector, AppThunk} from "../../store";

export interface ISetZoomState {
    scale: number;
}

export const MAX_SCALE = 8;
export const MIN_SCALE = 1;

export type ISetZoomPayload = PayloadAction<number>;

const initialState: ISetZoomState = {
    scale: 1
}

export const pathSlice = createSlice({
    name: 'zoom',
    initialState,
    reducers: {
        setZoom(state,action: ISetZoomPayload) {
            state.scale = action.payload;
        },
    }
});

export const {
    setZoom
} = pathSlice.actions;

export const selectZoomScale: AppSelector<number> = ({ zoom }) => zoom.scale;

export default pathSlice.reducer;