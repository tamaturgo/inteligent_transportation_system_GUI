import React, { useEffect, useState } from "react";
import ImageCanvas from "./ImageCanvas";
import PolygonOverlay from "./PolygonOverlay";
import axios from "axios";
import { disableAddArea } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

interface Point {
  x: number;
  y: number;
}

interface Area {
  id: number;
  points: Point[];
  rules: any[] | null;
}

const ImageReader: React.FC = () => {
  const [areasData, setAreasData] = useState<Area[]>([]);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [canSendAreas, setCanSendAreas] = useState<boolean>(false);
  const [needUpdateAreas, setNeedUpdateAreas] = useState<boolean>(true);

  const dispatch = useDispatch();
  const addAreaEnabled = useSelector((state: any) => state.addAreaEnabled);

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!addAreaEnabled) {
      return;
    }
    const image = e.currentTarget;
    const rect = image.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setPoints([...points, { x, y }]);
  };

  useEffect(() => {
    handleUpdateImage();
    if (needUpdateAreas) {
      handleUpdateAreas();
      setNeedUpdateAreas(false);
    }
  }, [needUpdateAreas]);

  const handleUpdateImage = () => {
    axios
      .get("http://localhost:5000/image")
      .then((response) => {
        // seta a imagem
        setImageSrc("data:image/png;base64," + response.data.image);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateAreas = () => {
    axios
      .get("http://localhost:5000/area")
      .then((response) => {
        // seta as areas
        setAreasData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setAreasData([
        ...areasData,
        { id: areasData.length + 1, points, rules: null },
      ]);
      setPoints([]);
      setCanSendAreas(true);
      dispatch(disableAddArea());
    }
  };

  const sendAreas = () => {
    const lastArea = areasData[areasData.length - 1];
    axios
      .post("http://localhost:5000/area", {
        id: lastArea.id,
        polygon: lastArea.points,
      })
      .then((response) => {
        setNeedUpdateAreas(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (canSendAreas) {
      setCanSendAreas(false);
      sendAreas();
      handleUpdateAreas();
    }
  }, [areasData, canSendAreas]);

  return (
    <>
      <form className="flex flex-col items-end">
        <label htmlFor="image"
        className="mb-4 bg-emerald-900 p-1 text-white rounded w-1/2 text-center cursor-pointer hover:bg-emerald-800 hover:text-white"
        >Trocar imagem</label>
        <input
          type="file"
          name="image"
          id="image"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files?.[0];

            const formData = new FormData();
            formData.append("image", file as Blob);

            axios
              .post("http://localhost:5000/image", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((response) => {
                console.log(response.data);
                handleUpdateImage();
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        />
      </form>
      <div className="flex flex-col "
      style={{width: "700px", height: "700px"}}>
        <ImageCanvas
          imageSrc={imageSrc ?? ""}
          onClick={handleImageClick}
          onKeyUp={handleKeyUp}
          tabIndex={0}
          cursor={addAreaEnabled ? "crosshair" : "default"}
        />
        <PolygonOverlay areasData={areasData} points={points} />
      </div>
    </>
  );
};

export default ImageReader;
