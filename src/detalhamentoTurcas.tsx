import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable";

export default function DetalhamentoTurcas({
  selectedCommunity,
  tooltip,
  open,
  setOpen,
  svgRef,
}: any) {
  function separaMotivacao(motivacao: string, pais_motivacao: string) {
    const posicao = motivacao.indexOf("(Grego)/ ");

    if (pais_motivacao === "grego") {
      if (posicao !== -1) {
        const nova_motivacao = motivacao.slice(0, posicao);
        if (nova_motivacao.indexOf("(---)") !== -1) {
          return "(---)";
        }
        return nova_motivacao;
      }
    }
    if (pais_motivacao === "turco") {
      if (posicao !== -1) {
        const nova_posicao = motivacao.indexOf("(Turco)");
        const nova_motivacao = motivacao.slice(
          posicao + "(Grego)/".length,
          nova_posicao
        );
        if (nova_motivacao.indexOf("(---)") !== -1) {
          return "(---)";
        }
        return nova_motivacao;
      }
    }

    return "";
  }

  function verifica_mudou(mudou: string) {
    switch (mudou) {
      case "Sim":
        return "Toponímia sofreu alteração linguística e em sua motivação.";
      case "Não":
        return "Toponímia não sofreu qualquer tipo de alteração";
      case "Parcialmente":
        return "Toponímia sofreu alteração apenas linguística, mas manteve sua motivação.";
      case "(...)":
        return "Sem dados";
    }
  }

  function verifica_lei(citado: string, lei: string) {
    if (lei === "turca") {
      switch (citado) {
        case "SIM":
          return " O topônimo é citado na Legislação turca (Mülki Yönetim ve Bölümleri Yasası 33/1998)";
        case "NÃO":
          return "O topônimo não é citado na Legislação turca (Mülki Yönetim ve Bölümleri Yasası 33/1998)";
      }
    }

    if (lei === "ciprio") {
      switch (citado) {
        case "SIM":
          return "O topônimo é citado na Legislação cipriota (ΣΤΑΤΙΣΤΙΚΟΙ ΚΩΔΙΚΟΙ ΔΗΜΩΝ, ΚΟΙΝΟΤΗΤΩΝ ΚΑΙ ΕΝΟΡΙΩΝ ΤΗΣ ΚΥΠΡΟΥ 2010)";
        case "NÃO":
          return "O topônimo não é citado na Legislação cipriota (ΣΤΑΤΙΣΤΙΚΟΙ ΚΩΔΙΚΟΙ ΔΗΜΩΝ, ΚΟΙΝΟΤΗΤΩΝ ΚΑΙ ΕΝΟΡΙΩΝ ΤΗΣ ΚΥΠΡΟΥ 2010)";
      }
    }
  }

  return (
    <div>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={70}>
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
          >
            <svg ref={svgRef} width={800} height={600} />
            {tooltip.show && (
              <div
                style={{
                  position: "absolute",
                  top: tooltip.y + 10,
                  left: tooltip.x + 10,
                  background: "#fff",
                  color: "black",
                  border: "1px solid #ccc",
                  padding: "5px",
                  pointerEvents: "none",
                  zIndex: 10,
                }}
              >
                {tooltip.content}
              </div>
            )}
          </div>
        </ResizablePanel>

        {open ? <ResizableHandle withHandle /> : ""}

        {open ? (
          <ResizablePanel defaultSize={35} minSize={25} maxSize={40}>
            <div className="relative  h-full w-full bg-white border-l">
              <div className="absolute top-0 right-0 left-0 flex items-center justify-between px-4 py-2 border-b bg-white z-10">
                <span className="text-sm font-medium text-gray-800">
                  Topônimos modificados pela República Turca de Chipre do Norte
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="text-white bg-red-600 hover:bg-red-700 p-2 rounded-full transition-all duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className=" pt-12 p-4 overflow-auto h-full">
                <div className="flex flex-col space-y-3 mt-12">
                  <p className="text-md">
                    Topônimo em grego:{" "}
                    <span className="text-slate-500 text-md">
                      {selectedCommunity.VIL_NM_G}
                    </span>
                  </p>
                  <p className="text-md">
                    Topônimo romanizado (transliterado):{" "}
                    <span className="text-slate-500 text-md">
                      {selectedCommunity.VIL_NM_E}
                    </span>
                  </p>
                  <p className="text-md">
                    Topônimo turco:{" "}
                    <span className="text-slate-500 text-md">
                      {selectedCommunity.Topônim_1}
                    </span>
                  </p>
                  <p className="text-md">
                    Motivação toponímica grega:{" "}
                    <span className="text-slate-500 text-md">
                      {separaMotivacao(selectedCommunity.Motivaçã, "grego")}
                    </span>
                  </p>
                  <p className="text-md">
                    Motivação toponímica turca:{" "}
                    <span className="text-slate-500 text-md">
                      {separaMotivacao(selectedCommunity.Motivaçã, "turco")}
                    </span>
                  </p>
                  <p className="text-md">
                    Modificações:{" "}
                    <span className="text-slate-500 text-md">
                      {verifica_mudou(selectedCommunity.Mudou_)}
                    </span>
                  </p>
                  <p className="text-md">
                    Ano da mudança:{" "}
                    <span className="text-slate-500 text-md">
                      {selectedCommunity.Ano_da_mud}
                    </span>
                  </p>
                  <p className="text-md">
                    Lei turca:{" "}
                    <span className="text-slate-500 text-md">
                      {verifica_lei(selectedCommunity.Lei_Turca, "turca")}
                    </span>
                  </p>
                  <p className="text-md">
                    Lei cipriota:{" "}
                    <span className="text-slate-500 text-md">
                      {verifica_lei(selectedCommunity.Lei_Ciprio, "ciprio")}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </ResizablePanel>
        ) : (
          ""
        )}
      </ResizablePanelGroup>
    </div>
  );
}
