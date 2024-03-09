import {ActionCreator, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ILocationPath} from "../../util/interfaces";
import {AppSelector, AppThunk} from "../index";
import {changePath} from "./path";
import {EMPTY_LOCATION_PATH} from "@/util/locations";

export interface IHistoryState {
  data: ILocationPath[];
  index: number
}

export type IPushHistoryStatePayload = PayloadAction<ILocationPath>;
export type IHistoryNavigationPayload = PayloadAction<IHistoryState["index"]>;

const initialState: IHistoryState = {
  data: [EMPTY_LOCATION_PATH],
  index: 0
};

export const history = createSlice({
  name: 'history',
  initialState,
  reducers: {
    clear(state) {
      state.data = [EMPTY_LOCATION_PATH];
      state.index = 0;
    },
    pushState(state, action: IPushHistoryStatePayload) {
      const {data, index} = state;
      state.data = [...data.slice(0, index + 1), action.payload];
      state.index = state.data.length - 1;
    },
    go(state, action: IHistoryNavigationPayload) {
      state.index += action.payload;
    }
  }
});

export const {
  pushState,
  go,
  clear
} = history.actions;

export const goWithHistory: ActionCreator<AppThunk> = (value: number) => (dispatch, getState) => {
  const {history} = getState();
  const index = history.index + value;
  const path = history.data[index];

  dispatch(go(value));
  dispatch(changePath(path));
};

export const undo: ActionCreator<AppThunk> = (value = 1) =>
  (dispatch) => dispatch(goWithHistory(-value));

export const redo: ActionCreator<AppThunk> = (value = 1) =>
  (dispatch) => dispatch(goWithHistory(value));

export const selectHistoryIndex: AppSelector<number> = ({history}) => history.index;
export const selectHistoryData: AppSelector<ILocationPath[]> = ({history}) => history.data;

export default history.reducer;