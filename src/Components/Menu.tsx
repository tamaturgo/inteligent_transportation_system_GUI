import ImageReader from "./ImageReader";
import ListRules from "./ListRules";
import VideoUploader from "./VideoUploader";
import { useDispatch, useSelector } from "react-redux";
import { enableAddArea, disableAddArea } from "../redux/actions";

const LayoutAntDesign = () => {
  const dispatch = useDispatch();
  const addAreaEnabled = useSelector((state: any) => state.addAreaEnabled);

  return (
    <div className="h-screen bg-gray-100 flex w-screen mx-auto">
      <div className="w-1/2 bg-gray-100 p-4">
        <div className="mb-4 bg-gray-900 p-4 text-white rounded">
          <div className="h-2/3 w-full rounded p-4">
            <ListRules />
          </div>
        </div>
        <div className="mb-4 bg-gray-900 p-4 text-white rounded">
          <div className="h-2/3 w-full rounded p-4">
            <VideoUploader />
          </div>
        </div>
      </div>
      <div className="mb-4 bg-gray-900 p-4 text-white rounded">
        <div className="h-2/3 w-full rounded p-4">
          <ImageReader />
        </div>
        <div className="flex flex-col justify-between items-center">
          <p className="text-white text-center w-2/3 text-sm">
            Você pode adicionar uma área de interesse clicando na imagem, ao
            finalizar o poligono pressione "<strong>Enter</strong>".
          </p>
          <div className="mb-4 bg-gray-900 p-4 flex w-full rounded">
            <button
              className="w-full mb-4 p-1 text-white rounded"
              onClick={() => {
                dispatch(disableAddArea());
              }}
              disabled={!addAreaEnabled}
              style={{
                backgroundColor: addAreaEnabled
                  ? "rgba(255, 0, 0, 0.5)"
                  : "rgba(255, 0, 0, 0.2)",
                cursor: addAreaEnabled ? "pointer" : "not-allowed",
              }}
            >
              Cancelar
            </button>
            <button
              className="w-full mb-4 p-1 text-white rounded hover:bg-gray-900 hover:text-white"
              onClick={() => {
                dispatch(enableAddArea());
              }}
              style={{
                backgroundColor: addAreaEnabled
                  ? "rgba(0, 255, 0, 0.1)"
                  : "rgba(0, 255, 0, 0.5)",
                cursor: addAreaEnabled ? "not-allowed" : "pointer",
              }}
              disabled={addAreaEnabled}
            >
              Adicionar Área de Interesse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutAntDesign;
