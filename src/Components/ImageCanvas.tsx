import React from "react";

interface ImageCanvasProps {
  imageSrc: string;
  onClick: (e: React.MouseEvent<HTMLImageElement>) => void;
  onKeyUp: (e: React.KeyboardEvent) => void;
  tabIndex: number;
}

const ImageCanvas: React.FC<ImageCanvasProps> = ({ imageSrc, onClick, onKeyUp, tabIndex }) => {
  return (
    <div className="relative">
      {imageSrc === "" ? (
        <p className="text-center">Loading image...</p>
      ) : (
        <img
          src={imageSrc}
          className="w-full h-full"
          onClick={onClick}
          style={{ cursor: "crosshair" }}
          onKeyUp={onKeyUp}
          tabIndex={tabIndex}
          alt="Imagem"
        />
      )}
    </div>
  );
};

export default ImageCanvas;
