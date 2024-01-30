import {AnyAction, configureStore, ThunkAction} from '@reduxjs/toolkit'

import * as reducer from './reducer';

export const store = configureStore({
    reducer
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    AnyAction
>;

export type AppSelector<ReturnType = void> = (state: RootState) => ReturnType;