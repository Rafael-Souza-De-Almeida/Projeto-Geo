import { useEffect, useState } from "react";
import "./App.css";
import comunidades_gerais from "./data/comunidades_gerais.json";
import Mapa from "./mapa";

function App() {
  const [geoData, setGeoData] = useState<any>();

  useEffect(() => {
    setGeoData(comunidades_gerais);
  }, []);

  return (
    <div>
      <h1>Mapa toponímico interativo da República Turca de Chipre do Norte</h1>
      {geoData ? <Mapa geoData={geoData} /> : <p>Carregando mapa...</p>}
    </div>
  );
}

export default App;
