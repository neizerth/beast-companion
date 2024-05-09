import {useAppDispatch} from "@/hooks/useAppDispatch";
import {debounce} from "lodash";
import {setZoom} from "@/store/features/zoom";
import {useTransformEffect} from "react-zoom-pan-pinch";

export const useZoom = () => {
  const dispatch = useAppDispatch();

  const setZoomValue = debounce(
    (value: number) => dispatch(setZoom(value)),
    50
  );

  useTransformEffect(({state}) => {
    const value = state.scale;

    setZoomValue(value);
  });
};