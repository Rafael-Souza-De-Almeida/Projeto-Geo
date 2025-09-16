import { useEffect, useRef } from "react";
import * as d3 from "d3";

const ComunidadesGerais = ({ geoData }: any) => {
  const svgRef = useRef(null);

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

    const tooltip = d3
      .select("body")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background-color", "white")
      .style("border", "1px solid #ccc")
      .style("border-radius", "4px")
      .style("padding", "6px 10px")
      .style("font-size", "0.75rem")
      .style("pointer-events", "none")
      .style("z-index", "100");

    svg
      .selectAll("path")
      .data(geoData.features)
      .join("path")
      .attr("d", pathGenerator)
      .attr("fill", "#F5DEB3")
      .attr("stroke", "#333")
      .style("cursor", "pointer")
      .on("mouseover", function () {
        tooltip.style("opacity", 1);
        d3.select(this).attr("fill", "red");
      })
      .on("mousemove", function (event, d: any) {
        tooltip
          .html(
            `<strong>${d.properties.VIL_NM_G}</strong><br/>(${d.properties.VIL_NM_E})`
          )
          .style("left", () => {
            const tooltipWidth = 200;
            const mouseX = event.pageX;
            return mouseX + tooltipWidth > window.innerWidth
              ? `${mouseX - tooltipWidth - 10}px`
              : `${mouseX + 10}px`;
          })
          .style("top", () => {
            const tooltipHeight = 60;
            const mouseY = event.pageY;
            return mouseY + tooltipHeight > window.innerHeight
              ? `${mouseY - tooltipHeight - 10}px`
              : `${mouseY + 10}px`;
          });
      })
      .on("mouseleave", function () {
        tooltip.style("opacity", 0);
        d3.select(this).attr("fill", "#F5DEB3");
      });

    return () => {
      tooltip.remove();
    };
  }, [geoData]);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <svg
        ref={svgRef}
        className="w-full h-[60vw] max-h-[80vh] sm:h-[500px] md:h-[550px] lg:h-[600px]"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid meet"
      />
    </div>
  );
};

export default ComunidadesGerais;
