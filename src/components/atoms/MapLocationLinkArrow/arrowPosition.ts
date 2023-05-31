import {
    getBottom, getCenter, getControlPoint, getCurviness,
    getDX,
    getDY,
    getLeft,
    getLocationCenter, getRight,
    getSkew, getTop,
    IPoint,
    rad2deg,
    scalePoint
} from "../../../helpers/calculatePath";
import {ILocationLinkItem, ILocationPathListItem} from "../../../util/interfaces";
import {half, scale} from "../../../util/common";

export interface ArrowPositionOptions {
    pathItem: ILocationPathListItem;
    ratio: number;
}

export const getArrowPosition = (options: ArrowPositionOptions) => {
    const {
        pathItem,
        ratio
    } = options;

    const {
        source,
        target
    } = pathItem;

    // const scale = scalePoint(ratio);

    const k = (x: number) => scale(x, ratio);
    const fromPoint = getLocationCenter(source.location);

    const controlPoint = getControlPoint({
        source,
        target,
        visitIndex: pathItem.mutualVisitIndex,
        ratio: 0.5
    });
    const toPoint = getLocationCenter(target.location);
    const points = [controlPoint, toPoint];

    const rad = getSkew(controlPoint, toPoint);
    const angle = rad2deg(rad);

    const start: IPoint = [getLeft(points), getTop(points)];
    const end: IPoint = [getRight(points), getBottom(points)];
    // const point = point[]
    const [left, top] = controlPoint.map(k);

    const minSize = Math.min(source.location.size, target.location.size);
    const size = k(minSize) * 0.014;

    return {
        angle,
        left,
        top,
        scale: size
    };
}