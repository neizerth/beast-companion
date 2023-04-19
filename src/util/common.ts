import {flowRight, values} from "lodash";

export const scale = (x: number, ratio: number) => x * ratio;

export const px = (value: any) => value + 'px';

export const half = (x: number) => x / 2;