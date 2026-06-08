import { useState } from "react";
import H2 from "../components/H2";
import Contador from "../components/Contador";
import InputFile from "../components/InputFile";
import Table from "../components/Table";

const WithoutWorkers = () => {
  const [tableData, setTableData] = useState([]);
  const [isUpload, setIsUpload] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const csvText = event.target.result;

      const start = Date.now();

      while (Date.now() - start < 5000) {
        Math.sqrt(Math.random() * 1000);
      }

      const rows = csvText
        .trim()
        .split("\n")
        .map((row) => row.split(","));

      setTableData(rows);
    };

    reader.readAsText(file);
  };
  return (
    <div className="p-20 flex flex-col items-center gap-10">
        <div className="text-center">
            <p className="text-white text-xl">En esta prueba, el contador <span className="font-bold text-2xl">SI</span> se detendrá mientras se procesa el archivo CSV</p>
            <p className="text-white text-xl">El tiempo que se demora en procesar el archivo es de 5 segundos aproximadamente</p>
        </div>
      <div className="mb-10 w-300 backdrop-blur-sm border-4 rounded-xl bg-white/10 border-blue-400 mx-auto p-8 flex flex-col items-center gap-4">
        <H2 h2="Contador Automatico" />
        <Contador />
      </div>

      <div className="w-300 backdrop-blur-sm border-4 rounded-xl bg-white/10 border-blue-400 mx-auto p-8 flex flex-col items-center gap-4">
        {isUpload ? (
          <div>
            <H2 h2="Tabla de Datos" />
            <Table tableData={tableData} />
          </div>
        ) : (
          <div>
            <H2 h2="Subir Archivo CSV" />
            <InputFile
              handleFileUpload={handleFileUpload}
              uploadFile={setIsUpload}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default WithoutWorkers;
