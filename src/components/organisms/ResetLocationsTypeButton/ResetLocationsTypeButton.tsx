import classnames from "classnames";
import S from "./ResetLocationsTypeButton.module.scss";
import {GameControl} from "../..";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {resetLocationsType, selectLocations} from "../../../features/locations/locationsSlice";
import clearLocationsIcon from "../../../../public/images/clear_locations.svg";

export interface ResetLocationsTypeButtonProps {
    className?: string;
}

export const ResetLocationsTypeButton = (props: ResetLocationsTypeButtonProps) => {
    const { className } = props;

    const locations = useAppSelector(selectLocations);
    const modifiedLocationsCount = locations
        .filter(item => item.type !== item.defaultType)
        .length;
    const dispatch = useAppDispatch();
    const resetLocations = () => dispatch(resetLocationsType());

    return (
        <GameControl
            onClick={() => resetLocations()}
            className={classnames(S.container, className)}
            disabled={modifiedLocationsCount === 0}
            icon={clearLocationsIcon}
            name={"Clear Locations"}
        />
    );
}