import {AnyAction, configureStore, ThunkAction} from '@reduxjs/toolkit'

import historyReducer from './features/history/historySlice';
import pathReducer from './features/path/pathSlice';
import zoomReducer from './features/zoom/zoomSlice';
import modeReducer from './features/gameMode/gameModeSlice';
import locationsReducer from './features/locations/locationsSlice';
import meeplesReducer from './features/meeples/meepleSlice';

export const store = configureStore({
    reducer: {
        history: historyReducer,
        path: pathReducer,
        zoom: zoomReducer,
        gameMode: modeReducer,
        locations: locationsReducer,
        meeples: meeplesReducer
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