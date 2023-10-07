import {ActionCreator, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GameMode} from "../../util/common";
import {AppSelector, AppThunk} from "../../store";
import {IMapLocationItem, MapLocationType, MapMeeple, MapMeepleType} from "../../util/interfaces";
import {setLocations} from "../locations/locationsSlice";
import {toMeeple} from "../../util/meeple";

export interface ILocationsState {
    data: IMapLocationItem[]
}

const initialState: ILocationsState = {
    data: []
};

export type ISetMeeplePayload = PayloadAction<IMapLocationItem[]>;

export const meeplesSlice = createSlice({
    name: 'meeples',
    initialState,
    reducers: {
        setLocationMeeple(state, action: ISetMeeplePayload) {
            state.data = action.payload;
        }
    }
});

export const {
    setLocationMeeple
} = meeplesSlice.actions;

export const changeLocationMeeple: ActionCreator<AppThunk> = (locationItem: IMapLocationItem, meeple: MapMeeple) =>
    (dispatch, getState) => {
        const { locations } = getState();
        const data = locations.data.map(item => locationItem === item ? {
            ...item,
            meeple,
        }: item);
        dispatch(setLocations(data));
    }

export const injureLocationMeeple: ActionCreator<AppThunk> = (locationItem: IMapLocationItem, wounds = 1) =>
    (dispatch, getState) => {
        const { locations } = getState();
        const data = locations.data.map(item => locationItem === item ? {
            ...item,
            meeple: {
                ...item.meeple,
                wounds: item.meeple.wounds + wounds,
            },
        }: item);
        dispatch(setLocations(data));
    }

export const resetLocationsMeeple: ActionCreator<AppThunk> =  () =>
    (dispatch, getState) => {
        const { locations } = getState();
        const data = locations.data.map(item => ({
            ...item,
            meeple: toMeeple(item.defaultMeepleType)
        }));
        dispatch(setLocations(data));
    }

export const selectMeeples: AppSelector<IMapLocationItem[]> = ({ meeples }) => meeples.data;

export default meeplesSlice.reducer;