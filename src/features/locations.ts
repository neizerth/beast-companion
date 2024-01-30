import {ActionCreator, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GameMode} from "../util/common";
import {AppSelector, AppThunk} from "../store";
import {IMapLocationItem, MapLocationType} from "../util/interfaces";
import {HunterType, GameMapHunter} from "../util/hunters";

export interface ILocationsState {
    data: IMapLocationItem[]
}

const initialState: ILocationsState = {
    data: []
};

export type ISetLocationsPayload = PayloadAction<IMapLocationItem[]>;

export const locations = createSlice({
    name: 'locations',
    initialState,
    reducers: {
        setLocations(state, action: ISetLocationsPayload) {
            state.data = action.payload;
        }
    }
});

export const {
    setLocations
} = locations.actions;

export const addLocationHunter: ActionCreator<AppThunk> = (locationItem: IMapLocationItem, hunter: GameMapHunter) =>
    (dispatch, getState) => {
        const {locations} = getState();
        const data = locations.data.map(item => locationItem === item ? {
            ...item,
            hunters: [
                ...item.hunters,
                hunter
            ],
        } : item);
        dispatch(setLocations(data));
    };

export const changeLocationType: ActionCreator<AppThunk> = (locationItem: IMapLocationItem, type: MapLocationType) =>
    (dispatch, getState) => {
        const { locations } = getState();
        const data = locations.data.map(item => locationItem === item ? {
            ...item,
            type,
        }: item);
        dispatch(setLocations(data));
    }

export const resetLocationsType: ActionCreator<AppThunk> =  () =>
    (dispatch, getState) => {
        const { locations } = getState();
        const data = locations.data.map(item => ({
            ...item,
            type: item.defaultType
        }));
        dispatch(setLocations(data));
    }

export const selectLocations: AppSelector<IMapLocationItem[]> = ({ locations }) => locations.data;
export const selectActiveHunters: AppSelector<HunterType[]> = ({ locations }) =>
    locations.data.reduce((data, item) => {
        const types = item.hunters.map(({ type }) => type);
        return [...data, ...types];
    }, [] as HunterType[]);

export default locations.reducer;