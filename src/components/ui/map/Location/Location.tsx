import S from "./Location.module.scss";
import classnames from "classnames";
import classNames from "classnames";
import {GameMode, px, scale} from "@/util/common";
import {AddHunterButton, Hunter, LocationImage, Meeple, MoveArrows, NoAction} from "@/components";
import {MapLocationType, MapMeeple, MapMeepleType} from "@/util/interfaces";
import {eq} from "lodash/fp";
import {GameMapHunter} from "@/util/hunters";
import {selectCurrentHunter} from "@/store/features/hunters";
import {MapLocationLinks} from "@/helpers/locationPath";
import {useAppSelector} from "@/hooks/useAppSelector";

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
  hunters: GameMapHunter[];
  canAddHunters: boolean;
  type: MapLocationType;
  gameMode: GameMode;
  meeple: MapMeeple;
  isDefaultMeeple: boolean;
  isDefaultType: boolean;
  links: MapLocationLinks;
}

export const Location = (props: MapLocationProps) => {
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
    canAddHunters,
    onMeepleInjure,
    hunters,
    links,
    meeple
  } = props;

  const currentHunter = useAppSelector(selectCurrentHunter);

  const isMode = eq(gameMode);
  const isType = eq(type);

  const isSettlement = isType(MapLocationType.SETTLEMENT);

  const isSelected = visitsCount > 0;
  const isMeepleMode = isMode(GameMode.MEEPLE);
  const isPathMode = isMode(GameMode.PATH);
  const isLocationsMode = isMode(GameMode.LOCATIONS);
  const isHuntersMode = isMode(GameMode.HUNTERS);

  const hasHunters = hunters.length > 0;
  const hasSelectedHunters = hunters.findIndex(
    ({type}) => currentHunter === type
  ) !== -1;
  const hasMeeple = meeple.type !== MapMeepleType.NO_MEEPLE;

  const stateClassName = isLast ? S.last :
    isFirst ? S.first :
      isSelected && S.selected;

  const typeClassName = TYPE_CLASS_NAMES[type];

  const classList = [
    S.background,
    !isPathMode && [
      isLast && S.last_locationsMode
    ],
    isLocationsMode && [
      typeClassName,
      !isDefaultType && S.modified,
      isNext && S.next_locationsMode
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
      {waitList.length > 0 && <NoAction
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
            <LocationImage
                type={type}
                ratio={ratio}
                locationSize={size}
                className={S.image}
            />
        </div>
    }
    {hasMeeple && isMeepleMode &&
        <div className={S.meepleContainer} style={style}>
            <div className={S.area} onClick={() => onClick()}/>
            <Meeple
                className={S.meeple}
                onInjure={onMeepleInjure}
                meeple={meeple}
                isDefault={isDefaultMeeple}
            />
        </div>
    }
    {isHuntersMode &&
        <>
          {hasHunters && <>
              <div className={S.hunters} style={style}>
                  <div className={S.hunterList}>
                    {hunters.map((hunter, key) =>
                      <Hunter
                        className={classNames(
                          S.hunter,
                          currentHunter === hunter.type && S.selectedHunter
                        )}
                        canChange={canAddHunters}
                        hunter={hunter}
                        selected={currentHunter === hunter.type}
                        key={key}
                      />
                    )}
                  </div>
                {hasSelectedHunters && currentHunter && <>
                    <MoveArrows
                        links={links}
                        hunter={currentHunter}
                        className={S.arrows}
                    />
                </>}
              </div>


          </>}
            <div className={S.addHunterContainer} style={style}>
              {isSettlement && canAddHunters && <AddHunterButton
                  onClick={() => onClick()}
                  className={S.addHunter}
              />}
            </div>
        </>
    }
  </>
};