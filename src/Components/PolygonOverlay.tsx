import React from "react";

interface PolygonOverlayProps {
  areasData: { x: number; y: number }[][];
  points: { x: number; y: number }[];
}

const PolygonOverlay: React.FC<PolygonOverlayProps> = ({ areasData, points }) => {
  const colorPalette = ["#FF0000", "#00FF00"];

  return (
    <svg className="absolute w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
      {areasData.map((area, index) => (
        <polygon
          key={index}
          points={area.map((point) => `${point.x},${point.y}`).join(" ")}
          fill={colorPalette[index]}
          fillOpacity="0.5"
          stroke={colorPalette[index]}
          strokeWidth="2"
        />
      ))}

      {points.map((point, index) => (
        <circle
          key={index}
          cx={point.x}
          cy={point.y}
          r={5}
          fill="red"
          cursor="pointer"
          onClick={() => {
            // Implemente a lógica do clique se necessário
          }}
        />
      ))}

      {points.length > 1 &&
        points.map((point, index) => {
          if (index < points.length - 1) {
            const nextPoint = points[index + 1];
            return (
              <line
                key={index}
                x1={point.x}
                y1={point.y}
                x2={nextPoint.x}
                y2={nextPoint.y}
                stroke="red"
                strokeWidth="2"
              />
            );
          }

          // Linha entre o último ponto e o primeiro ponto
          if (index === points.length - 1) {
            const firstPoint = points[0];
            return (
              <line
                key={index}
                x1={point.x}
                y1={point.y}
                x2={firstPoint.x}
                y2={firstPoint.y}
                stroke="red"
                strokeWidth="2"
              />
            );
          }

          return null;
        })}
    </svg>
  );
};

export default PolygonOverlay;
