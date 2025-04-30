import * as d3 from "d3";
import { useRef, useState, useEffect } from "react";

import DetalhamentoCristas from "./detalhamentoCristas";

const ComunidadesCristas = ({
  cristasData,
  base_layer,
  second_base_layer,
}: any) => {
  const [selectedCommunity, setSelectedCommunity] = useState<any>();
  const [open, setOpen] = useState<boolean>(false);

  const svgRef = useRef(null);
  const [tooltip, setTooltip] = useState({
    show: false,
    x: 0,
    y: 0,
    content: "",
  });

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
      .attr("fill", "#FFFACD")
      .attr("stroke", "#333")
      .attr("opacity", 0)
      .transition()
      .duration(1000)
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
            d3.select(this).attr("fill", "#F5DEB3");
          })
          .on("mouseout", function () {
            d3.select(this).attr("fill", "#FFFACD");
            setTooltip((prev) => ({ ...prev, show: false }));
          });
      });

    svg
      .append("g")
      .selectAll("path")
      .data(second_base_layer.features)
      .join("path")
      .attr("d", pathGenerator)
      .attr("fill", "rgba(255, 255, 102, 0.8)")
      .attr("stroke", "#333")
      .attr("opacity", 0)
      .transition()
      .duration(1000)
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
            d3.select(this).attr("fill", "#ffcc00");
          })
          .on("mouseout", function () {
            d3.select(this).attr("fill", "rgba(255, 255, 102, 0.8)");
            setTooltip((prev) => ({ ...prev, show: false }));
          });
      });

    svg
      .append("g")
      .selectAll("path")
      .data(cristasData.features)
      .join("path")
      .attr("d", pathGenerator)
      .attr("fill", "red")
      .attr("stroke", "#8b4513")
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
            d3.select(this).attr("fill", "darkred");
          })
          .on("mouseout", function () {
            d3.select(this).attr("fill", "red");
            setTooltip((prev) => ({ ...prev, show: false }));
          })
          .on("click", (event, d: any) => {
            event.preventDefault();
            setSelectedCommunity(d.properties);
            setOpen(true);
          });
      });
  }, [cristasData, second_base_layer, base_layer]);

  return (
    <DetalhamentoCristas
      selectedCommunity={selectedCommunity}
      tooltip={tooltip}
      open={open}
      setOpen={setOpen}
      svgRef={svgRef}
    />
  );
};

export default ComunidadesCristas;
