import { useEffect, useRef } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";

interface GloboProps {
  onFinish: () => void;
}

const Globo = ({ onFinish }: GloboProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const width = 800;
    const height = 600;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const projection = d3
      .geoOrthographic()
      .scale(300)
      .translate([width / 2, height / 2])
      .clipAngle(90);

    const path = d3.geoPath().projection(projection);

    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
      .then((worldData: any) => {
        const land = topojson.feature(
          worldData,
          worldData.objects.countries
        ) as unknown as GeoJSON.FeatureCollection<GeoJSON.Geometry>;

        svg
          .append("path")
          .datum(land)
          .attr("fill", "#69b3a2")
          .attr("stroke", "#fff")
          .attr("d", (d: any) => path(d)!);

        flyToCyprus(projection, path, svg);
      })
      .catch((error) => {
        console.error("Erro ao carregar o mapa:", error);
      });

    const flyToCyprus = (
      projection: d3.GeoProjection,
      path: d3.GeoPath<any, d3.GeoPermissibleObjects>,
      svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>
    ) => {
      const cyprus: [number, number] = [33.4299, 35.1264];
      const i = d3.geoInterpolate([0, 0], cyprus);

      svg
        .transition()
        .duration(2500)
        .tween("rotate", () => (t: number) => {
          const p = i(t);
          projection.rotate([-p[0], -p[1]]);
          svg.selectAll("path").attr("d", (d: any) => path(d)!);
        })
        .on("end", () => {
          svg
            .transition()
            .duration(800)
            .tween("zoom", () => {
              const start = 300;
              const end = 3000;
              return (t: number) => {
                projection.scale(start + (end - start) * t);
                svg.selectAll("path").attr("d", (d: any) => path(d)!);
              };
            })
            .on("end", () => {
              setTimeout(() => {
                d3.select(svgRef.current)
                  .transition()
                  .duration(300)
                  .style("opacity", 0)
                  .on("end", () => {
                    onFinish();
                  });
              }, 100);
            });
        });
    };
  }, [onFinish]);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white">
      <svg
        ref={svgRef}
        width={800}
        height={600}
        className="transition-opacity duration-500"
      />
    </div>
  );
};

export default Globo;
