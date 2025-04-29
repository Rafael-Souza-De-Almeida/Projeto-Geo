import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const ComunidadesGerais = ({ geoData }: any) => {
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
      .fitSize([width, height], geoData);
    const pathGenerator: any = d3.geoPath().projection(projection);

    svg
      .selectAll("path")
      .data(geoData.features)
      .join("path")
      .attr("d", pathGenerator)
      .attr("fill", "#FFFACD")
      .attr("stroke", "#333")
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
        d3.select(this).attr("fill", "red");
      })
      .on("mouseout", function () {
        d3.select(this).attr("fill", "#FFFACD");
        setTooltip({ ...tooltip, show: false });
      });
  }, []);

  return (
    <div style={{ position: "relative" }}>
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
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
};

export default ComunidadesGerais;
