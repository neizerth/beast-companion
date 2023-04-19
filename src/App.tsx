import {useState} from 'react'
import 'normalize.css/normalize.css';
import S from './App.module.scss'
import {MapType} from "./util/interfaces";
import {MapSelector} from "./components/organisms/MapSelector/MapSelector";
import {GameMap} from "./components/organisms/GameMap/GameMap";

function App() {
  const [mapType, setMap] = useState(MapType.NONE);
  const onMapSelect = (type: MapType) => {
      setMap(type);
  };

  return (
    <div className={S.app}>
        {mapType === MapType.NONE ?
            <MapSelector onSelect={onMapSelect}/> :
            <GameMap type={mapType}/>}
    </div>
  )
}

export default App
