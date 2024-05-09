import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GameMode} from "@/util/common";
import {AppSelector} from "@/store";

export interface IGameModeState {
  mode: GameMode
}

const initialState: IGameModeState = {
  mode: GameMode.PATH
};

export type IToggleModePayload = PayloadAction<GameMode>;

export const gameMode = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    setGameMode(state, action: IToggleModePayload) {
      state.mode = action.payload;
    }
  }
});

export const {
  setGameMode
} = gameMode.actions;

export const selectMode: AppSelector<GameMode> = ({gameMode}) => gameMode.mode;

export default gameMode.reducer;