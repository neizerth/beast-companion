import {ActionCreator, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GameMode} from "../util/common";
import {AppSelector, AppThunk} from "../store";
import {getNextAvailableHunter, HUNTERS, HunterType, toHunter} from "../util/hunters";
import {setLocations} from "./locations";
import {IMapLocationItem} from "../util/interfaces";
import {eq} from "../helpers/locationPath";

export interface IHuntersState {
    current: HunterType | null
}

const initialState: IHuntersState = {
    current: null
};

export type ISelectHunterPayload = PayloadAction<IHuntersState['current']>;

export const hunters = createSlice({
    name: 'hunters',
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
} = hunters.actions;

export const changeHunter: ActionCreator<AppThunk> = (hunterType: HunterType) =>
    (dispatch, getState) => {
        const { locations, hunters } = getState();
        const activeHunters = locations.data.reduce((hunters, item) => {
            return [
                ...hunters,
                ...item.hunters.map(({ type }) => type)
            ];
        }, [] as HunterType[]);
        const restHunters = activeHunters.filter(t => t !== hunterType);
        const restAvailableHunters = HUNTERS.filter(t => !restHunters.includes(t));
        const hunterGlobalIndex = restAvailableHunters.indexOf(hunterType);
        const restSize = restAvailableHunters.length;

        const nextIndex = hunterGlobalIndex === restSize - 1 ? 0 : hunterGlobalIndex + 1;
        const nextHunterType = restAvailableHunters[nextIndex];
        const nextHunter = toHunter(nextHunterType);

        const data = locations.data
            .map(item => {
                const { hunters } = item;
                const hunterIndex = hunters.findIndex(({ type }) => type === hunterType);
                const noHunter = hunterIndex === -1;
                if (noHunter) {
                    return item;
                }

                return {
                    ...item,
                    hunters: [
                        ...hunters.slice(0, hunterIndex),
                        nextHunter,
                        ...hunters.slice(hunterIndex + 2),
                    ]
                }
                // const { current } = hunters;
                // const nextType = getNextAvailableHunter();
            });

        dispatch(setLocations(data));
        dispatch(setCurrentHunter(nextHunterType));
    };

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

               const restHunters = hunters
                   .filter(({ type }) => type !== hunterType);

               if (isDead) {
                   return {
                       ...item,
                       hunters: restHunters
                   }
               }

               return {
                   ...item,
                   hunters: [
                       ...restHunters,
                       toHunter(hunterType, currentWounds)
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

export default hunters.reducer;