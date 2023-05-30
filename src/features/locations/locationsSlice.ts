import {ActionCreator, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GameMode} from "../../util/common";
import {AppSelector, AppThunk} from "../../store";
import {IMapLocationItem, MapLocationType} from "../../util/interfaces";

export interface ILocationsState {
    data: IMapLocationItem[]
}

const initialState: ILocationsState = {
    data: []
};

export type ISetLocationsPayload = PayloadAction<IMapLocationItem[]>;

export const locationsSlice = createSlice({
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
} = locationsSlice.actions;

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

export default locationsSlice.reducer;