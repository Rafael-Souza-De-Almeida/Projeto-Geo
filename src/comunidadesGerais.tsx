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
      <svg
        ref={svgRef}
        width={800}
        height={600}
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid meet"
      />
      {tooltip.show && (
        <div
          style={{
            position: "absolute",
            top:
              tooltip.y + 120 > window.innerHeight
                ? Math.max(tooltip.y - 110, 10)
                : tooltip.y + 10,
            left:
              tooltip.x + 125 > window.innerWidth
                ? tooltip.x - 370
                : tooltip.x + 10,
            maxWidth: "200px",
            background: "#fff",
            color: "#000",
            border: "1px solid #ccc",
            padding: "6px 10px",
            borderRadius: "4px",
            fontSize: "0.875rem",
            pointerEvents: "none",
            zIndex: 100,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            transition: "top 0.05s ease-out, left 0.05s ease-out",
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
};

export default ComunidadesGerais;
