import {useAppSelector} from "../../../../hooks";
import {selectPathData} from "../../../../features/path";
import {useEffect, useState} from "react";
import {generatePathList} from "../../../../helpers/pathList";
import {getLocationCenter, getSkew, rad2deg} from "../../../../helpers/calculatePath";

import westImg from '@images/movement/west.png';
import southImg from '@images/movement/south.png';
import eastImg from '@images/movement/east.png';
import northImg from '@images/movement/north.png';
import noMovementImg from '@images/movement/no-movement.png';

import prevImg from '@images/movement/prev.png';
import nextImg from '@images/movement/next.png';

import S from "./CardMovements.module.scss";
import classNames from "classnames";

export const CardMovements = () => {
    const path = useAppSelector(selectPathData);
    const pathList = generatePathList(path, false);

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const { key } = e;
            if (hasNext && key === 'ArrowRight') {
                next();
            }
            if (hasPrev && key === 'ArrowLeft') {
                prev();
            }
        }

        window.addEventListener('keyup', handler);
        return () => window.removeEventListener('keyup', handler);
    }, [index])

    const movementImages = [eastImg, southImg, westImg, northImg];


    const pathItem = pathList[pathList.length - index - 1];
    const { source, target } = pathItem;

    let movementImg = noMovementImg;

    if (target && source && source.location !== target.location) {
        const fromPoint = getLocationCenter(source.location);
        const toPoint = getLocationCenter(target.location);
        const rad = getSkew(fromPoint, toPoint);

        const deg = (rad2deg(rad) + 45 + 360) % 360;
        const quadrant = Math.floor(deg / 90);
        movementImg = movementImages[quadrant]
    }

    const hasPrev = index < pathList.length - 1;
    const hasNext = index !== 0;

    const prev = () => setIndex(index + 1);
    const next = () => setIndex(index - 1);

    return (
        <div className={S.container}>
            <div className={classNames(S.item, S.control)} onClick={prev}>
                {hasPrev && <img src={prevImg} className={S.arrow} alt=""/>}
            </div>
            <div className={classNames(S.movement, S.item)}>
                <div className={S.movement__container}>
                    <div className={S.index}>{index + 1}</div>
                    <img src={movementImg} className={S.movement__image} alt=""/>
                </div>
            </div>
            <div className={classNames(S.item, S.control)} onClick={next}>
                {hasNext && <img src={nextImg} className={S.arrow} alt=""/>}
            </div>
        </div>
    );
}