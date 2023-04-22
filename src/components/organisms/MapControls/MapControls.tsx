import S from "./MapControls.module.scss";
import {GameControl} from "../../molecules/GameControl/GameControl";

export interface GameControlsProps {
    onRefresh: CallableFunction;
    onBack: CallableFunction
}

export const MapControls = (props: GameControlsProps) => {
    const { onRefresh, onBack } = props;
    return (
        <>
            <GameControl
                onClick={e => onBack()}
                className={S.back}
                icon={"/images/back.svg"}
                name={"Go back"}
            />
            <GameControl
                onClick={e => onRefresh()}
                className={S.refresh}
                icon={"/images/refresh.svg"}
                name={"Refresh"}
            />
        </>
    )
}