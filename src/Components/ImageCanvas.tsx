import React from "react";

interface ImageCanvasProps {
  imageSrc: string;
  onClick: (e: React.MouseEvent<HTMLImageElement>) => void;
  onKeyUp: (e: React.KeyboardEvent) => void;
  tabIndex: number;
  cursor: string;
}

const ImageCanvas: React.FC<ImageCanvasProps> = ({ imageSrc, onClick, onKeyUp, tabIndex, cursor }) => {
  return (
    <div className="relative">
      {imageSrc === "" ? (
        <p className="text-center">Loading image...</p>
      ) : (
        <img
          src={imageSrc}
          onClick={onClick}
          style={{ cursor: cursor, width: "720px", height: "360px" }}
          onKeyUp={onKeyUp}
          tabIndex={tabIndex}
          alt="Imagem"
        />
      )}
    </div>
  );
};

export default ImageCanvas;
