export default function LegendaOcupadas() {
  return (
    <div className="flex flex-col lg:gap-0 lg:flex-row w-full">
      <div className="p-4 border border-black bg-white text-sm w-full lg:w-1/2">
        <h2 className="font-semibold text-base mb-2 underline">Legenda</h2>

        <div className="flex flex-col gap-1">
          <div>
            <p className="font-semibold">Mudanças toponímicas:</p>
            <ul className="ml-4 mt-1 space-y-1 text-left">
              <li className="flex items-center">
                <span className="inline-block w-4 h-4 mr-2 bg-green-300 rounded"></span>
                Comunidades com mudança toponímica completa
              </li>
              <li className="flex items-center">
                <span className="inline-block w-4 h-4 bg-red-500 mr-2 rounded"></span>
                Comunidades sem mudança toponímica
              </li>
              <li className="flex items-center">
                <span className="inline-block w-4 h-4 bg-yellow-300 mr-2 rounded"></span>
                Comunidades com mudança toponímica parcial
              </li>
              <li className="flex items-center">
                <span className="inline-block w-4 h-4 bg-gray-500 mr-2 rounded"></span>
                Sem dados
              </li>
            </ul>
          </div>

          <div>
            <p className="text-gray-600 italic text-xs mt-2">
              Fonte: Dados gráficos baseados em arquivos GeoJSON. Dados não
              gráficos obtidos de fontes oficiais da República de Chipre.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col p-4 border border-black bg-white text-sm w-full  items-center justify-center text-center">
        <h2 className="font-semibold text-base mb-2">
          Produção cartográfica: Lucas Lanzaro Reis
        </h2>
        <h2 className="font-semibold text-base mb-2">
          Programação e sistematização dos dados: Rafael Souza De Almeida
        </h2>
      </div>
    </div>
  );
}
