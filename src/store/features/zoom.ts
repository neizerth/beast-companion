import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppSelector} from "../index";

export interface ISetZoomState {
  scale: number;
}

export type ISetZoomPayload = PayloadAction<number>;

const initialState: ISetZoomState = {
  scale: 1
}

export const pathSlice = createSlice({
  name: 'zoom',
  initialState,
  reducers: {
    setZoom(state, action: ISetZoomPayload) {
      state.scale = action.payload;
    },
  }
});

export const {
  setZoom
} = pathSlice.actions;

export const selectZoomScale: AppSelector<number> = ({zoom}) => zoom.scale;

export default pathSlice.reducer;