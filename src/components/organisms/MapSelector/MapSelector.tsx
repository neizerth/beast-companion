import S from './MapSelector.module.scss';
import {MapType} from "../../../util/interfaces";
import {Button, ButtonProps} from "../../atoms/Button/Button";
import classnames from "classnames";

export const mapTypes = [
    {
        type: MapType.SMALL,
        title: '2-3 Players'
    },
    {
        type: MapType.LARGE,
        title: '4 Players'
    }
];

export interface MapSelectorProps {
    className?: string,
    onSelect?: (type: MapType) => void
}

export const MapSelector = (props: MapSelectorProps) => {
    const {
        onSelect = f => f,
        className
    } = props;
    return (
      <div className={classnames(className, S.container)}>
          <img className={S.logo} src="/images/beast-logo.png" alt="Beast logo"/>
          <div className={S.buttons}>
              {mapTypes.map(
                  (item, key: number) =>
                      <Button key={key} onClick={() => onSelect(item.type)}>{item.title}</Button>
              )}
          </div>
      </div>
    );
}