import {ILocationPathListItem} from "../../../../util/interfaces";
import S from "./Path.module.scss";
import {selectPathData} from "@/store/features/path";
import {generatePathList} from "../../../../helpers/pathList";
import {useEffect, useRef} from "react";
import {renderPath} from "./renderPath";
import {PathArrow} from "@/components/ui/map/PathArrow/PathArrow";
import {useAppSelector} from "@/hooks/useAppSelector";

export interface MapLocationPathProps {
  ratio: number;
  width: number;
  height: number;
}

export const Path = (props: MapLocationPathProps) => {
  const {
    width,
    height,
    ratio
  } = props
  const path = useAppSelector(selectPathData);
  const ref = useRef<HTMLCanvasElement>(null);

  const pathList = generatePathList(path);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    renderPath({
      ratio,
      canvas: ref.current,
      pathList
    });
  }, [ref, pathList]);

  const getArrowAngle = (item: ILocationPathListItem) => {

  };

  return (
    <>
      <canvas className={S.container} width={width} height={height} ref={ref}/>
      {pathList.map((item, key) =>
        <PathArrow
          key={key}
          pathItem={item}
          isLast={key === pathList.length - 1}
          ratio={ratio}
        />
      )}
    </>
  );
}