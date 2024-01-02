import axios from "axios";
import React from "react";
import { Button, List, Modal } from "antd";

import { useState } from "react";

interface Point {
  x: number;
  y: number;
}

interface Area {
  id: number;
  points: Point[];
  rules: any[] | null;
}

interface PolygonOverlayProps {
  areasData: Area[];
  points: Point[];
}

const PolygonOverlay: React.FC<PolygonOverlayProps> = ({
  areasData,
  points,
}) => {
  const colorPalette = [
    "#808080",
    "#800000",
    "#808000",
    "#008000",
    "#800080",
    "#008080",
    "#000080",
  ];

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleShowModal = (area: Area) => {
    Modal.success({
      title: `Área ${area.id}`,
      visible: true,
      centered: true,
      okButtonProps: { style: { backgroundColor: "#03a9f4" } },
      style: { top: 20 },
      content: (
        <div>
          <p>
            Points: {area.points.map((point) => `(${point.x}, ${point.y})`)}
          </p>
          <List
            size="small"
            header={<div>Regras associadas:</div>}
            bordered
            dataSource={
              area.rules ? area.rules.map((rule) => `Area ${rule}`) : []
            }
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
          <form style={{ marginTop: 10 }}>
            <label>Adicionar regra:</label>
            <input
              type="text"
              name="name"
              style={{
                marginLeft: 5,
                backgroundColor: "#fff",
                borderRadius: 5,
                border: "1px solid #ccc",
                padding: 5,
              }}
            />
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginLeft: 5, backgroundColor: "#03a9f4" }}
            >
              +
            </Button>
          </form>

          <Button
            type="primary"
            style={{ marginTop: 10, backgroundColor: "#e91e63" }}
            onClick={() => {
              axios
                .delete(`http://localhost:5000/area/${area.id}`)
                .then((response) => {
                  setModalVisible(false);
                  window.location.reload();
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          >
            Remover área
          </Button>
        </div>
      ),
      onOk() {},
    });
  };

  return (
    <svg
      className="absolute w-full h-full pointer-events-none"
      style={{ zIndex: 1, width: "700px", height: "360px" }}
    >
      {areasData.map((area) => (
        <polygon
          key={area.id}
          points={area.points.map((point) => `${point.x},${point.y}`).join(" ")}
          fill={
            colorPalette[
              area.id > colorPalette.length
                ? area.id % colorPalette.length
                : area.id
            ]
          }
          fillOpacity="0.5"
          stroke={
            colorPalette[
              area.id > colorPalette.length
                ? area.id % colorPalette.length
                : area.id
            ]
          }
          strokeWidth="2"
          style={{
            pointerEvents: "all",
            cursor: "pointer",
          }}
          onClick={() => {
            axios
              .get(`http://localhost:5000/area/${area.id}/info`)
              .then((response) => {
                modalVisible ? setModalVisible(false) : setModalVisible(true);
                handleShowModal(area);
              });
          }}
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
