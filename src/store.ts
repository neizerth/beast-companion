import {AnyAction, configureStore, ThunkAction} from '@reduxjs/toolkit'

import historyReducer from './features/history';
import pathReducer from './features/path';
import zoomReducer from './features/zoom';
import modeReducer from './features/gameMode';
import locationsReducer from './features/locations';
import meeplesReducer from './features/meeple';
import huntersReducer from './features/hunters';

export const store = configureStore({
    reducer: {
        history: historyReducer,
        path: pathReducer,
        zoom: zoomReducer,
        gameMode: modeReducer,
        locations: locationsReducer,
        meeples: meeplesReducer,
        hunters: huntersReducer,
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