import S from './MapSelector.module.scss';
import {MapType} from "@/util/interfaces";
import {UIButton} from "@/components";

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
          <UIButton key={key} onClick={() => onSelect(item.type)}>{item.title}</UIButton>
      )}
    </div>
  );
}