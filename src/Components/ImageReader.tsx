import React, { useEffect, useState } from "react";
import ImageCanvas from "./ImageCanvas";
import PolygonOverlay from "./PolygonOverlay";
const ImageReader = () => {
  const [areasData, setAreasData] = React.useState<
    { x: number; y: number }[][]
  >([]);
  const [imageSrc, setImageSrc] = useState<string>("");
  const [clickX, setClickX] = useState<number | null>(null);
  const [clickY, setClickY] = useState<number | null>(null);
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const image = e.currentTarget;
    const rect = image.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const adjustedX = x;
    const adjustedY = y;

    setClickX(x);
    setClickY(y);

    // Adicionar um ponto à lista de pontos
    setPoints([...points, { x: adjustedX, y: adjustedY }]);
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      // Quando Enter é pressionado, adicione o primeiro ponto à lista de pontos
      setAreasData([...areasData, points]);
      // Limpe a lista de pontos
      setPoints([]);
    }
  };

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8765");
    setSocket(ws);

    ws.onmessage = (event) => {
      setImageSrc(`data:image/jpeg;base64,${event.data}`);
    };
    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    // Enviar áreas para o servidor quando houver mudanças
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: "areas", data: areasData }));
    }
  }, [areasData, socket]);


  return (
    <div className="flex flex-col h-full w-full">
      <ImageCanvas
        imageSrc={imageSrc}
        onClick={handleImageClick}
        onKeyUp={handleKeyUp}
        tabIndex={0}
      />
      <PolygonOverlay areasData={areasData} points={points} />
    </div>
  );
};

export default ImageReader;
