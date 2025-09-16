import * as d3 from "d3";
import { useRef, useState, useEffect } from "react";
import DetalhamentoTurcas from "./detalhamentoTurcas";

function ComunidadesTurcas({ turcasData, base_layer }: any) {
  const svgRef = useRef(null);
  const [tooltip, setTooltip] = useState({
    show: false,
    x: 0,
    y: 0,
    content: "",
  });

  const [selectedCommunity, setSelectedCommunity] = useState<any>();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const width = 800;
    const height = 550;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const projection = d3
      .geoIdentity()
      .reflectY(true)
      .fitSize([width, height], base_layer);

    const pathGenerator: any = d3.geoPath().projection(projection);

    svg
      .append("g")
      .selectAll("path")
      .data(base_layer.features)
      .join("path")
      .attr("d", pathGenerator)
      .attr("fill", "#F5DEB3")
      .attr("stroke", "#333")
      .attr("opacity", 0)
      .transition()
      .duration(800)
      .ease(d3.easeCubic)
      .attr("opacity", 1)
      .on("end", function () {
        d3.select(this)
          .on("mousemove", (event: any) => {
            const [x, y] = d3.pointer(event);
            setTooltip({
              show: true,
              x,
              y,
              content: `República de Chipre`,
            });
          })
          .on("mouseover", function () {
            d3.select(this).attr("fill", "#FFFACD");
          })
          .on("mouseout", function () {
            d3.select(this).attr("fill", "#F5DEB3");
            setTooltip((prev) => ({ ...prev, show: false }));
          });
      });

    svg
      .append("g")
      .selectAll("path")
      .data(turcasData.features)
      .join("path")
      .attr("d", pathGenerator)
      .attr("fill", (d: any) =>
        d.properties.Mudou_ === "Não"
          ? "red"
          : d.properties.Mudou_ === "Parcialmente"
          ? "rgba(255, 255, 102, 0.8)"
          : d.properties.Mudou_ === "Sim"
          ? "rgba(144, 238, 144, 0.8)"
          : "rgba(169, 169, 169, 0.7)"
      )

      .attr("stroke", "#333")
      .attr("stroke-width", 1.5)
      .attr("opacity", 0)
      .transition()
      .duration(1500)
      .ease(d3.easeCubic)
      .attr("opacity", 1)
      .on("end", function () {
        d3.select(this)
          .on("mousemove", (event, d: any) => {
            const [x, y] = d3.pointer(event);
            setTooltip({
              show: true,
              x,
              y,
              content: `${d.properties.VIL_NM_G} (${d.properties.VIL_NM_E})`,
            });
          })
          .on("mouseover", function () {
            d3.select(this).attr("fill", (d: any) =>
              d.properties.Mudou_ === "Não"
                ? "#ff6666"
                : d.properties.Mudou_ === "Parcialmente"
                ? "#ffcc00"
                : d.properties.Mudou_ === "Sim"
                ? "#228B22"
                : "#333"
            );
          })
          .on("mouseout", function () {
            d3.select(this).attr("fill", (d: any) =>
              d.properties.Mudou_ === "Não"
                ? "red"
                : d.properties.Mudou_ === "Parcialmente"
                ? "rgba(255, 255, 102, 0.8)"
                : d.properties.Mudou_ === "Sim"
                ? "rgba(144, 238, 144, 0.8)"
                : "rgba(169, 169, 169, 0.7)"
            );
            setTooltip((prev) => ({ ...prev, show: false }));
          })
          .on("click", (event, d: any) => {
            event.preventDefault();
            setSelectedCommunity(d.properties);
            setOpen(true);
          });
      });
  }, [turcasData, base_layer]);

  return (
    <DetalhamentoTurcas
      selectedCommunity={selectedCommunity}
      tooltip={tooltip}
      open={open}
      setOpen={setOpen}
      svgRef={svgRef}
    />
  );
}

export default ComunidadesTurcas;
