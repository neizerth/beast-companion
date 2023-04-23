import {useEffect, useState} from "react";
import {MapSize} from "../util/interfaces";

export const useMapSize = (imageSize: MapSize) => {
    const mapSize = getMapSize(imageSize);
    const [size, setSize] = useState(mapSize);
    useEffect(() => {
        const onResize = () => {
            const mapSize = getMapSize(imageSize);
            setSize(mapSize);
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [imageSize]);
    return size;
}

export const getMapSize = (defaultSize?: MapSize) => {
    const { innerWidth, innerHeight } = window;
    if (!defaultSize) {
        return [innerWidth, innerHeight, 1];
    }

    let height = innerHeight - 4;
    let ratio = height / defaultSize.height;
    let width = ratio * defaultSize.width;

    if (width > innerWidth) {
        width = innerWidth;
        ratio = width / defaultSize.width;
        height = ratio * defaultSize.height;
    }

    return [width, height, ratio];
}
