import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GameMode} from "../../util/common";
import {AppSelector} from "../../store";
import {HunterType} from "../../util/hunters";

export interface IHuntersState {
    current: HunterType | null
}

const initialState: IHuntersState = {
    current: null
};

export type ISelectHunterPayload = PayloadAction<IHuntersState['current']>;

export const huntersSlice = createSlice({
    name: 'mode',
    initialState,
    reducers: {
        setCurrentHunter(state, action: ISelectHunterPayload) {
            state.current = action.payload;
        },
        unsetCurrentHunter(state) {
            state.current = null;
        }
    }
});

export const {
    setCurrentHunter,
    unsetCurrentHunter
} = huntersSlice.actions;

export const selectCurrentHunter: AppSelector<IHuntersState['current']> = ({ hunters }) => hunters.current;

export default huntersSlice.reducer;