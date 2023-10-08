import S from "./MapLocation.module.scss";
import classnames from "classnames";
import {GameMode, px, scale} from "../../../util/common";
import {MapLocationImage, MapLocationMeeple, MapLocationWait} from "../..";
import {MapLocationType, MapMeeple, MapMeepleType} from "../../../util/interfaces";

const TYPE_CLASS_NAMES = {
    [MapLocationType.FOREST]: S.forest,
    [MapLocationType.CAVES]: S.caves,
    [MapLocationType.MIXED]: S.mixed,
    [MapLocationType.SETTLEMENT]: S.settlement,
    [MapLocationType.SWAMP]: S.swamp,
}

export interface MapLocationProps {
    onClick: CallableFunction;
    onMeepleInjure: CallableFunction;
    className: string;
    visitsCount: number;
    waitList: number[];
    isFirst: boolean;
    isLast: boolean;
    isNext: boolean;
    ratio: number;
    top: number;
    left: number;
    size: number;
    type: MapLocationType;
    gameMode: GameMode;
    meeple: MapMeeple;
    isDefaultMeeple: boolean;
    isDefaultType: boolean;
}

export const MapLocation = (props: MapLocationProps) => {
    const {
        className,
        isFirst,
        isLast,
        isNext,
        visitsCount,
        onClick,
        ratio,
        size,
        top,
        left,
        waitList,
        gameMode,
        type,
        isDefaultType,
        isDefaultMeeple,
        onMeepleInjure,
        meeple
    } = props;

    const isSelected = visitsCount > 0;
    const isMeepleMode = gameMode === GameMode.MEEPLE;
    const isPathMode = gameMode === GameMode.PATH;
    const isLocationsMode = gameMode === GameMode.LOCATIONS;

    const haveMeeple = meeple.type !== MapMeepleType.NO_MEEPLE;

    const stateClassName = isLast ? S.last :
        isFirst ? S.first :
            isSelected && S.selected;

    const typeClassName = TYPE_CLASS_NAMES[type];

    const classList = [
        S.background,
        isMeepleMode && [
            isLast && S.last_locationsMode
        ],
        isLocationsMode && [
            typeClassName,
            !isDefaultType && S.modified,
            isNext && S.next_locationsMode,
            isLast && S.last_locationsMode
        ],
        isPathMode && [
            stateClassName,
            isNext && S.next
        ],
    ];

    const k = (x: number) => px(scale(x, ratio));

    const style = {
        fontSize: k(size),
        width: k(size),
        height: k(size),
        top: k(top),
        left: k(left)
    };

    return <>
        <div
            style={style}
            className={classnames(className, S.container, S.wait)}
        >
            <div className={S.area} onClick={() => onClick()}/>
            {waitList.length > 0 && <MapLocationWait
                waitList={waitList}
            />}
        </div>
        <div
            style={style}
            className={classnames(className, S.container, S.main)}
        >
            <div
                className={classnames(classList)}
            >
                {isPathMode && visitsCount > 1 && <span className={S.counter}>{visitsCount}</span>}
            </div>
        </div>
        {!isDefaultType &&
            <div className={classnames(className, S.container, S.type)} style={style}>
                <MapLocationImage
                    type={type}
                    ratio={ratio}
                    locationSize={size}
                    className={S.image}
                />
            </div>
        }
        {haveMeeple && isMeepleMode &&
            <div className={S.meepleContainer} style={style}>
                <div className={S.area} onClick={() => onClick()}/>
                <MapLocationMeeple
                    className={S.meeple}
                    onInjure={onMeepleInjure}
                    meeple={meeple}
                    isDefault={isDefaultMeeple}
                />
            </div>
        }
    </>
};