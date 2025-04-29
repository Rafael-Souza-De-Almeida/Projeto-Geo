import { useEffect, useState } from "react";
import "./App.css";
import comunidades_gerais from "./data/comunidades_gerais.json";
import ComunidadesGerais from "./comunidadesGerais";
import ComunidadesTurcas from "./comunidadesTurcas";
import ComunidadesCristas from "./comunidadesCristas";
import comunidades_turcas_metadados from "./data/comunidades_turcas_metadados.json";
import chipre_inteiro_metadados from "./data/chipre_inteiro_metadados.json";
import comunidades_cristas_metadados from "./data/comunidades_cristas_metadados.json";

function App() {
  const [geoData, setGeoData] = useState<any>();
  const [comunidade, setComunidade] = useState<string>("gerais");

  useEffect(() => {
    setGeoData(comunidades_gerais);
  }, []);

  function handleGeoData(nome: string) {
    switch (nome) {
      case "turcas":
        setComunidade("turcas");
        setGeoData(comunidades_turcas_metadados);
        break;
      case "gerais":
        setComunidade("gerais");
        setGeoData(comunidades_gerais);
        break;
      case "cristas":
        setComunidade("cristas");
        setGeoData(comunidades_cristas_metadados);
        break;
    }
  }

  return (
    <div className="flex flex-col justify-center items-center px-48 min-h-screen text-center">
      <div>
        <h1 className="text-6xl/1.1 my-24 font-bold text-black">
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
          onClick={() => handleGeoData("cristas")}
          className="bg-orange-500 px-4 text-white py-2 cursor-pointer rounded-lg hover:bg-orange-800"
        >
          Comunidades Cristãs
        </button>
      </div>
      <div className="border-2 border-black px-32 py-12 mt-16 mb-72 bg-blue-200">
        {geoData ? (
          comunidade === "gerais" ? (
            <ComunidadesGerais geoData={geoData} />
          ) : comunidade === "turcas" ? (
            <ComunidadesTurcas
              turcasData={geoData}
              base_layer={chipre_inteiro_metadados}
            />
          ) : comunidade === "cristas" ? (
            <ComunidadesCristas
              cristasData={geoData}
              second_base_layer={comunidades_turcas_metadados}
              base_layer={chipre_inteiro_metadados}
            />
          ) : (
            ""
          )
        ) : (
          <p>Carregando mapa...</p>
        )}
      </div>
    </div>
  );
}

export default App;
