import {ActionCreator} from "@reduxjs/toolkit";
import {AppThunk} from "../store";
import {resetLocationsType} from "./locations";
import {clearPath} from "./path";

export const reset: ActionCreator<AppThunk> =  () =>
    (dispatch) => {
        dispatch(resetLocationsType());
        dispatch(clearPath());
    }