import S from './MapSelector.module.scss';
import {MapType} from "../../../../util/interfaces";
import {Button} from "../../../index";
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
    onSelect?: (type: MapType) => void
}

export const MapSelector = (props: MapSelectorProps) => {
    const {
        onSelect = f => f,
    } = props;
    return (
          <div className={S.container}>
              {mapTypes.map(
                  (item, key: number) =>
                      <Button key={key} onClick={() => onSelect(item.type)}>{item.title}</Button>
              )}
          </div>
    );
}