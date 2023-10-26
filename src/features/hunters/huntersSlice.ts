import {ActionCreator, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GameMode} from "../../util/common";
import {AppSelector, AppThunk} from "../../store";
import {HunterType, toHunter} from "../../util/hunters";
import {setLocations} from "../locations/locationsSlice";
import {IMapLocationItem} from "../../util/interfaces";
import {eq} from "../../helpers/locationPath";

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

export const injureHunter: ActionCreator<AppThunk> =  (hunterType: HunterType, wounds = 1) =>
    (dispatch, getState) => {
        const { locations } = getState();

        const data = locations.data
            .map(item => {
               const { hunters } = item;
               const hunterIndex = hunters.findIndex(({ type }) => type === hunterType);
               const noHunter = hunterIndex === -1;
               if (noHunter) {
                   return item;
               }
               const hunter = hunters[hunterIndex];
               const currentWounds = hunter.wounds + wounds;
               const isDead = hunter.health <= currentWounds;

               if (isDead) {
                   const restHunters = hunters
                       .filter(({ type }) => type !== hunterType);

                   return {
                       ...item,
                       hunters: restHunters
                   }
               }

               console.log({
                   currentWounds
               })

               return {
                   ...item,
                   hunters: [
                       ...hunters.slice(0, hunterIndex),
                       toHunter(hunterType, currentWounds),
                       ...hunters.slice(hunterIndex + 2),
                   ]
               }
            });

        dispatch(setLocations(data));
    }

export const moveHunter: ActionCreator<AppThunk> =  (hunterType: HunterType, locationItem: IMapLocationItem) =>
    (dispatch, getState) => {
        const { locations } = getState();
        const hunter = toHunter(hunterType);

        const data = locations.data
            .map(item => ({
                ...item,
                hunters: item.hunters.filter(h => {
                    if (h.type === hunterType) {
                        hunter.wounds = h.wounds;
                        return false;
                    }
                    return true;
                })
            }))
            .map(item => {
                if (!eq(item, locationItem)) {
                    return item;
                }
                return {
                    ...item,
                    hunters: [
                        ...item.hunters,
                        hunter
                    ]
                }
            });

        dispatch(setLocations(data));
    }

export const selectCurrentHunter: AppSelector<IHuntersState['current']> = ({ hunters }) => hunters.current;

export default huntersSlice.reducer;