import {MapLocation} from "../../molecules/MapLocation/MapLocation";
import S from "../MapController/MapController.module.scss";
import {ILocationPath, IMapLocationItem} from "../../../util/interfaces";
import {
    getLocationVisitIndex,
    getLocationVisitsCount,
    isLocationFirst,
    isLocationLast
} from "../../helpers/locationPath";

export interface MapLocationListProps {
    locations: IMapLocationItem[];
    ratio: number;
    onLocationClick: CallableFunction;
    locationPath: ILocationPath;
}

export const MapLocationList = (props: MapLocationListProps) => {
    const {
        locationPath,
        locations,
        ratio,
        onLocationClick = () => void(0),
    } = props;

    const isFirst = (item: IMapLocationItem) => isLocationFirst(locationPath, item);
    const isLast = (item: IMapLocationItem) => isLocationLast(locationPath, item);
    const getVisitsCount = (item: IMapLocationItem) => getLocationVisitsCount(locationPath, item);

    const getVisitIndex = (from: IMapLocationItem, to: IMapLocationItem, start: number) =>
        getLocationVisitIndex(locationPath, from, to, start);

    const onRemove = () => {
        // console.log('location removed');
    }

    return <>
        {locations.map((item, key) => (
            <MapLocation
                {...item}
                onClick={() => onLocationClick(item)}
                onRemove={() => onRemove()}
                isFirst={isFirst(item)}
                isLast={isLast(item)}
                visitsCount={getVisitsCount(item)}
                className={S.location}
                ratio={ratio}
                key={key}
            />
        ))}
    </>
}