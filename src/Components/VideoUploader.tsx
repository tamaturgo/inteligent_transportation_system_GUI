import { Button, Modal } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";




const CardProcessingVideo: React.FC<{ video: string; status: string, key: number }> = ({
  video,
  status,
  key
}) => {
  return (
    <li className="mb-1 bg-gray-900 p-1 text-white rounded" key={key}>
      <div className="video-processing flex justify-between items-center">
        <div className="video-processing__info mr-4 flex  items-center justify-between w-full">
          <h3> {video} </h3>

          <p className="text-sm"> {status} </p>
          <div className="video-processing__actions">
            <Button type="primary" danger>
              {" "}
              Cancelar{" "}
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
};

const VideoUploader: React.FC = () => {

  const [videosToProcess, setVideosToProcess] = useState<string[]>([]);

    useEffect(() => {
        axios.get("http://localhost:5000/video/to/process").then((res) => {
        setVideosToProcess(res.data);
        });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
        axios.get("http://localhost:5000/video/to/process").then((res) => {
            setVideosToProcess(res.data);
        });
        }, 2000);
        return () => clearInterval(interval);
    }, []);
  return (
    <div>
      <form>
        <div className="flex justify-between items-center mb-4">
          <h2 className="mb-4 text-xl font-bold">Analisar vídeo</h2>
          <label
            htmlFor="video"
            className="bg-emerald-800 p-2 text-white rounded hover:bg-gray-800 hover:text-white cursor-pointer"
          >
            Enviar vídeo
          </label>
        </div>
        <input
          type="file"
          id="video"
          name="video"
          accept="video/*"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files?.item(0);
            if (file) {
              const formData = new FormData();
              formData.append("video", file);
              axios
                .post("http://localhost:5000/video", formData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                })
                .then((res) => {
                  console.log(res);
                });
            }
          }}
        />
      </form>

      <div className="list-video-processings mt-4 mb-4">
        <h2 className="mb-4 text-xl font-bold">Vídeos em processamento</h2>
        <ul>
            {videosToProcess && videosToProcess.map((video, index) => {
                return <CardProcessingVideo video={video} status="Em processamento" key={index} />
            })}

            {videosToProcess.length === 0 && <p>Nenhum vídeo em processamento</p>}
        </ul>
      </div>
    </div>
  );
};

export default VideoUploader;
