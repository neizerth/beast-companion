import {flowRight, values} from "lodash";

export const scale = (x: number, ratio: number) => x * ratio;

export const px = (value: any) => value + 'px';

export const half = (x: number) => x / 2;

export const vw = (x: number) => x * window.innerWidth / 100;
export const vh = (x: number) => x * window.innerHeight / 100;