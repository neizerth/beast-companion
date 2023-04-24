import {AnyAction, configureStore, ThunkAction} from '@reduxjs/toolkit'

import historyReducer from './features/history/historySlice';
import pathReducer from './features/path/pathSlice';

export const store = configureStore({
    reducer: {
        history: historyReducer,
        path: pathReducer,
    },
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