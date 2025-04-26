import { useEffect, useState } from "react";
import "./App.css";
import comunidades_gerais from "./data/comunidades_gerais.json";
import comunidades_turcas from "./data/comunidades_turcas.json";
import comunidades_cipriotas from "./data/comunidades_cipriotas.json";
import Mapa from "./mapa";

function App() {
  const [geoData, setGeoData] = useState<any>();

  useEffect(() => {
    setGeoData(comunidades_gerais);
  }, []);

  function handleGeoData(nome: string) {
    switch (nome) {
      case "turcas":
        setGeoData(comunidades_turcas);
        break;
      case "gerais":
        setGeoData(comunidades_gerais);
        break;
      case "cipriotas":
        setGeoData(comunidades_cipriotas);
        break;
    }
  }

  return (
    <div className="flex flex-col justify-center items-center px-48 min-h-screen text-center">
      <div>
        <h1 className="text-6xl/1.1 my-24 font-bold">
          Mapa toponímico interativo da República Turca de Chipre do Norte
        </h1>
      </div>
      <div className="flex gap-8 items-center">
        <button
          onClick={() => handleGeoData("turcas")}
          className="bg-red-500 px-4 text-white py-2 cursor-pointer rounded-lg hover:bg-red-800"
        >
          Comunidades Turcas
        </button>
        <button
          onClick={() => handleGeoData("gerais")}
          className="bg-blue-500 px-4 text-white py-2 cursor-pointer rounded-lg hover:bg-blue-800"
        >
          Comunidades Gerais
        </button>
        <button
          onClick={() => handleGeoData("cipriotas")}
          className="bg-orange-500 px-4 text-white py-2 cursor-pointer rounded-lg hover:bg-orange-800"
        >
          Comunidades Cipriotas
        </button>
      </div>
      {geoData ? <Mapa geoData={geoData} /> : <p>Carregando mapa...</p>}
    </div>
  );
}

export default App;
