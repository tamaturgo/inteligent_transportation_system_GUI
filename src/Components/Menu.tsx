import React from "react";
import { Button } from "antd";
import ImageReader from "./ImageReader";


const LayoutAntDesign = () => {
  return (
    <div className="h-screen bg-gray-100 flex flex-col w-screen mx-auto">
      <div className="bg-blue-500 p-4 text-white">
        <h1 className="text-2xl font-bold">Inteligent Transportation System</h1>
      </div>

      <div className="flex p-4 h-full w-full">
        <div className="mb-4 bg-blue-500 p-4 text-white w-2/12 rounded mx-4 h-full">
          <button className="w-full mb-4 bg-blue-600 p-4 text-white rounded hover:bg-blue-700">
            Áreas de Interesse
          </button>
        </div>

        <div className="mb-4 bg-blue-500 p-4 text-white w-6/12 rounded mx-4 h-full">
          <div className="h-2/3 w-full rounded p-4">
            <ImageReader/>
          </div>
          <div className="flex flex-col h-1/3 w-full mt-4  rounded p-4">
            <h4 className="font-bold">Information</h4>
            <p>Here goes the information</p>
          </div>
        </div>
        <div className="mb-4 bg-blue-500 p-4 text-white w-4/12 rounded mx-4 h-full">
          <button className="w-full mb-4 bg-blue-600 p-4 text-white rounded hover:bg-blue-700">
            Adicionar Área de Interesse
          </button>
          <div className="flex flex-col h-1/3 w-full mt-4  rounded p-4">
            <h4 className="font-bold">Information</h4>
            <p>Here goes the information</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutAntDesign;
