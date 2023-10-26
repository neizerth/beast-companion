export const MAX_WAIT_SIZE = 8;
export const MAX_ZOOM = 8;
export const MIN_ZOOM = 1;
export enum GameMode {
    LOCATIONS = 'locations',
    PATH = 'path',
    MEEPLE = 'meeple',
    HUNTERS = 'hunters',
    MOVEMENT = 'movement'
}

export const scale = (x: number, ratio: number) => x * ratio;

export const px = (value: any) => value + 'px';

export const half = (x: number) => x / 2;

export const vw = (x: number) => x * window.innerWidth / 100;
export const vh = (x: number) => x * window.innerHeight / 100;
export const vmin = (x: number) => x * Math.min(window.innerHeight, window.innerWidth) / 100;
export const vmax = (x: number) => x * Math.max(window.innerHeight, window.innerWidth) / 100;

export const minmax = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));