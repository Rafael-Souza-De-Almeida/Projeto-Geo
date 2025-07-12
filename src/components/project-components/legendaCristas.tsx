export default function LegendaCristas() {
  return (
    <div className="flex flex-col lg:gap-0 lg:flex-row w-full">
      <div className="p-4 lg:py-8.5 border border-black bg-white text-sm w-full lg:w-1/2">
        <div className="flex flex-col lg:items-start items-center ">
          <h2 className="font-semibold text-base mb-2 underline">Legenda</h2>

          <div className="mb-4">
            <p className="font-semibold">Mudanças toponímicas:</p>
            <ul className="ml-4 mt-1 space-y-1 text-left">
              <li className="flex items-center">
                <span className="inline-block w-4 h-4 mr-2 bg-red-500 rounded"></span>
                Comunidades ocupadas com topônimos cristãos
              </li>
              <li className="flex items-center">
                <span className="inline-block w-4 h-4 bg-yellow-300 mr-2 rounded"></span>
                Comunidades ocupadas
              </li>
            </ul>
          </div>

          <div className=" w-[50%] lg:w-[100%]">
            <p className="text-gray-600 italic lg:text-xs text-[9px]">
              Fonte: Dados gráficos baseados em arquivos GeoJSON. Dados não
              gráficos obtidos de fontes oficiais da República de Chipre.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col p-4 border border-black bg-white text-sm w-full items-center justify-center">
        <h2 className="font-semibold text-md lg:text-base mb-2">
          Produção cartográfica: Lucas Lanzaro Reis
        </h2>
        <h2 className="font-semibold text-md lg:text-base mb-2">
          Programação: Rafael Souza De Almeida
        </h2>
      </div>
    </div>
  );
}
