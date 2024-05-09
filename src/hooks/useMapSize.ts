import {useEffect, useState} from "react";
import {IMapSize} from "@/util/interfaces";
import {useViewportResize} from "@/hooks/useViewportResize";

export const useMapSize = (imageSize: IMapSize) => {
  const mapSize = getMapSize(imageSize);
  const [size, setSize] = useState(mapSize);
  const onResize = () => setSize(
    getMapSize(imageSize)
  );
  useEffect(() => {
    onResize();
  }, [imageSize]);
  useViewportResize(onResize);

  return size;
}

export const getMapSize = (defaultSize?: IMapSize) => {
  const {innerWidth, innerHeight} = window;
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
