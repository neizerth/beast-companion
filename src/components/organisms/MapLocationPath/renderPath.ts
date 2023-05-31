import {ILocationPathList, ILocationPathListItem} from "../../../util/interfaces";
import {createPath, getStroke, PathRenderItem, PathRenderItemType} from "../../../helpers/calculatePath";
import {vw} from "../../../util/common";

export interface RenderPathOptions {
    pathList: ILocationPathList;
    ratio: number;
    canvas: HTMLCanvasElement;
}

export const renderPath = (options: RenderPathOptions) => {
    const {
        pathList,
        ratio,
        canvas
    } = options;

    const context = canvas.getContext('2d');

    if (!context) {
        return;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    const pathLength = pathList.length;
    pathList.forEach(
        (item, index, self) => renderPathItem({
            context,
            item,
            index,
            ratio,
            pathLength
        })
    );
}

export interface RenderPathItemOptions {
    context: CanvasRenderingContext2D;
    item: ILocationPathListItem;
    index: number;
    ratio: number;
    pathLength: number;
}

export const renderPathItem = (options: RenderPathItemOptions) => {
    const {
        context,
        item,
        index,
        ratio,
        pathLength
    } = options;

    const {
        source,
        target,
        mutualVisitIndex
    } = item;

    const strokeWidth = vw(0.4);

    const pathItems = createPath({
        ratio,
        source,
        target,
        strokeWidth,
        visitIndex: mutualVisitIndex,
    });

    const stroke = getStroke(index, pathLength, mutualVisitIndex);

    context.strokeStyle = stroke.toString();
    context.fillStyle = stroke.toString();
    pathItems.forEach(item => drawOperation({
        context,
        item
    }));
}

export interface DrawOperationOptions {
    context: CanvasRenderingContext2D;
    item: PathRenderItem;
}

const drawOperation = (options: DrawOperationOptions) => {
    const {
        context,
        item
    } = options
    const {
        type,
        points
    } = item;

    if (type === PathRenderItemType.BEGIN_PATH) {
        return context.beginPath()
    }
    if (type === PathRenderItemType.CLOSE_PATH) {
        return context.closePath()
    }
    if (type === PathRenderItemType.FILL) {
        return context.fill();
    }
    if (type === PathRenderItemType.STROKE) {
        return context.stroke();
    }

    if (!points) {
        return;
    }

    if (type === PathRenderItemType.MOVE_TO) {
        const [point] = points;
        return context.moveTo(...point);
    }
    if (type === PathRenderItemType.LINE_TO) {
        const [point] = points;
        return context.lineTo(...point);
    }
    if (type === PathRenderItemType.QUADRATIC_CURVE_TO) {
        const [control, to] = points;
        return context.quadraticCurveTo(...control, ...to);
    }
    if (type === PathRenderItemType.ARC && item.arcOptions) {
        const [point] = points;
        const { radius, startAngle, endAngle} = item.arcOptions;
        return context.arc(...point, radius, startAngle, endAngle);
    }
}