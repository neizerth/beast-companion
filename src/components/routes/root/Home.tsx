import {MapSelector} from "../../organisms/MapSelector/MapSelector";
import {useNavigate} from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();
    const onMapSelect = (type: string) => {
        navigate(`/map/${type}`);
    };
    return <MapSelector onSelect={onMapSelect}/>
}