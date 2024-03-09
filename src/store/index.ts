import {AnyAction, configureStore, ThunkAction} from '@reduxjs/toolkit'

import * as reducer from './reducer';

export const index = configureStore({
  reducer
})

export type RootState = ReturnType<typeof index.getState>;
export type AppDispatch = typeof index.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export type AppSelector<ReturnType = void> = (state: RootState) => ReturnType;