import { useEffect, useState } from "react";
import "./App.css";

import comunidades_gerais from "./data/comunidades_gerais.json";
import ComunidadesGerais from "./comunidadesGerais";
import ComunidadesTurcas from "./comunidadesTurcas";
import ComunidadesCristas from "./comunidadesCristas";
import comunidades_turcas_metadados from "./data/comunidades_turcas_metadados.json";
import chipre_inteiro_metadados from "./data/chipre_inteiro_metadados.json";
import comunidades_cristas_metadados from "./data/comunidades_cristas_metadados.json";
import Globo from "./globo";
import LegendaOcupadas from "./components/project-components/legendaOcupadas";
import LegendaCristas from "./components/project-components/legendaCristas";
import LegendaGerais from "./components/project-components/legendaGerais";

function App() {
  const [geoData, setGeoData] = useState<any>();
  const [comunidade, setComunidade] = useState<string>("gerais");
  const [globoFinalizado, setGloboFinalizado] = useState(false);

  useEffect(() => {
    if (globoFinalizado) {
      setGeoData(comunidades_gerais);
    }
  }, [globoFinalizado]);

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

  if (!globoFinalizado) {
    return <Globo onFinish={() => setGloboFinalizado(true)} />;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="text-center">
        <h1 className="text-3xl lg:text-6xl/1.1 my-16 font-bold font-title text-black">
          Atlas toponímico digital da República de Chipre
        </h1>
      </div>
      <div className="mx-16 grid grid-cols-1 gap-2 lg:flex lg:gap-8 lg:items-center">
        <button
          onClick={() => handleGeoData("gerais")}
          className="bg-blue-500 px-4 text-white py-2 cursor-pointer rounded-lg hover:bg-blue-800"
        >
          Chipre De jure
        </button>

        <button
          onClick={() => handleGeoData("turcas")}
          className="bg-red-500 px-4 text-white py-2 cursor-pointer rounded-lg hover:bg-red-800"
        >
          Comunidades ocupadas
        </button>
        <button
          onClick={() => handleGeoData("cristas")}
          className="bg-orange-500 px-4 text-white py-2 cursor-pointer rounded-lg hover:bg-orange-800"
        >
          Comunidades cristãs
        </button>
      </div>
      <div className="border-2 w-[480px] border-black mt-16 bg-blue-200 relative lg:w-screen lg:h-full">
        {geoData ? (
          comunidade === "gerais" ? (
            <div>
              <ComunidadesGerais geoData={geoData} />
              <LegendaGerais />
            </div>
          ) : comunidade === "turcas" ? (
            <div className="flex flex-col ">
              <ComunidadesTurcas
                turcasData={geoData}
                base_layer={chipre_inteiro_metadados}
              />
              <LegendaOcupadas />
            </div>
          ) : comunidade === "cristas" ? (
            <div>
              <ComunidadesCristas
                cristasData={geoData}
                second_base_layer={comunidades_turcas_metadados}
                base_layer={chipre_inteiro_metadados}
              />

              <LegendaCristas />
            </div>
          ) : null
        ) : (
          <p>Carregando mapa...</p>
        )}
      </div>
    </div>
  );
}

export default App;
