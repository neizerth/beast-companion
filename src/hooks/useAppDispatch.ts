// Use throughout your app instead of plain `useDispatch` and `useSelector`
import type {AppDispatch} from "@/store";
import {useDispatch} from "react-redux";

export const useAppDispatch: () => AppDispatch = useDispatch