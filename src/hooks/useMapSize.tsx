import {useEffect, useState} from "react";
import {MapSize} from "../util/interfaces";

export const useMapSize = (defaultSize?: MapSize) => {
    const mapSize = getMapSize(defaultSize);
    const [size, setSize] = useState(mapSize);
    useEffect(() => {
        const onResize = () => setSize(getMapSize(defaultSize));
        window.addEventListener('resize', onResize);
        onResize();
        return () => window.removeEventListener('resize', onResize);
    }, [defaultSize]);
    return size;
}

export const getMapSize = (defaultSize?: MapSize) => {
    const { innerWidth, innerHeight } = window;
    if (!defaultSize) {
        return { width: innerWidth, height: innerHeight, ratio: 1 };
    }

    let height = innerHeight - 4;
    let ratio = height / defaultSize.height;
    let width = ratio * defaultSize.width;

    if (width > innerWidth) {
        width = innerWidth;
        ratio = width / defaultSize.width;
        height = ratio * defaultSize.height;
    }

    return {width, height, ratio};
}
