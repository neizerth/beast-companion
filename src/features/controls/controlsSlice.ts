import {ActionCreator} from "@reduxjs/toolkit";
import {AppThunk} from "../../store";
import {resetLocationsType} from "../locations/locationsSlice";
import {clearPath} from "../path/pathSlice";

export const reset: ActionCreator<AppThunk> =  () =>
    (dispatch) => {
        dispatch(resetLocationsType());
        dispatch(clearPath());
    }