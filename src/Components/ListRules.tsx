import { Button, Modal } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
interface Rule {
  id: number;
  poligono_id: number;
  tipo: string;
  valor: number;
  aux_valor: number;
  criado_em: Date;
}

enum RuleType {
  "speed",
  "not_allowed",
  "allowed_only",
  "allowed_except",
  "not_stopping",
  "need_stop",
  "not_parking",
  "parking_allowed",
  "parking_only",
  "cross_area_to_area",
  "time_limit",
}

enum classTypes {
  "car",
  "truck",
  "biker",
  "cycle",
  "person",
}
interface Area {
  id: number;
}

const ListRules: React.FC = () => {
  const [rules, setRules] = useState<Rule[]>([]);
  const [needUpdateRules, setNeedUpdateRules] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [type, setType] = useState<any>(RuleType.speed);

  const [areasData, setAreasData] = useState<Area[]>([]);

  useEffect(() => {
    if (needUpdateRules) {
      handleUpdateRules();
      setNeedUpdateRules(false);
    }
  }, [needUpdateRules]);

  useEffect(() => {
    handleUpdateAreas();
  }, []);

  const handleUpdateAreas = () => {
    axios
      .get("http://localhost:5000/area")
      .then((response) => {
        setAreasData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateRules = () => {
    axios
      .get("http://localhost:5000/rule")
      .then((response) => {
        setRules(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddRule = () => {
    axios
      .post("http://localhost:5000/rule", {
        type: "type",
        value: 1,
      })
      .then((response) => {
        setNeedUpdateRules(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Modal
        title="Adicionar Regra"
        centered
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
        }}
        onCancel={() => {
          setModalVisible(false);
        }}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { backgroundColor: "#e90e63" } }}
        okText="Fechar"
      >
        <form className="flex flex-col items-start justify-center w-full">
          <label>Tipo:</label>
          <select
            name="type"
            style={{
              marginLeft: 5,
              backgroundColor: "#fff",
              borderRadius: 5,
              border: "1px solid #ccc",
              padding: 5,
            }}
            className="mb-4 w-full"
            onChange={(e) => {
              const key = e.target.value;
              setType(key as unknown as RuleType);
            }}
          >
            <option value={RuleType.speed}>Velocidade</option>
            <option value={RuleType.not_allowed}>Proibido todos</option>
            <option value={RuleType.allowed_only}>Permitido apenas</option>
            <option value={RuleType.allowed_except}>Proibido apenas</option>
            <option value={RuleType.not_stopping}>Não parar</option>
            <option value={RuleType.need_stop}>Parar</option>
            <option value={RuleType.not_parking}>Não estacionar</option>
            <option value={RuleType.parking_allowed}>Estacionar</option>
            <option value={RuleType.parking_only}>Estacionar apenas</option>
            <option value={RuleType.cross_area_to_area}>
              Cruzar área para área
            </option>
            <option value={RuleType.time_limit}>Tempo limite</option>
          </select>

          {type === RuleType.speed.toLocaleString() && (
            <div className="flex flex-col w-full">
              <label>Valor máximo:</label>
              <input
                type="number"
                name="value"
                style={{
                  marginLeft: 5,
                  backgroundColor: "#fff",
                  borderRadius: 5,
                  border: "1px solid #ccc",
                  padding: 5,
                }}
                className="mb-4 w-full"
              />

              <label>Valor mínimo:</label>
              <input
                type="number"
                name="aux_value"
                style={{
                  marginLeft: 5,
                  backgroundColor: "#fff",
                  borderRadius: 5,
                  border: "1px solid #ccc",
                  padding: 5,
                }}
                className="mb-4 w-full"
              />
            </div>
          )}

          {type === RuleType.allowed_only.toLocaleString() && (
            <div className="flex flex-col w-full">
              <label>Classes:</label>
              <select
                name="classes"
                style={{
                  marginLeft: 5,
                  backgroundColor: "#fff",
                  borderRadius: 5,
                  border: "1px solid #ccc",
                  padding: 5,
                }}
                className="mb-4 w-full"
              >
                <option value={classTypes.car}>Carro</option>
                <option value={classTypes.truck}>Caminhão</option>
                <option value={classTypes.biker}>Motocicleta</option>
                <option value={classTypes.cycle}>Bicicleta</option>
                <option value={classTypes.person}>Pessoa</option>
              </select>
            </div>
          )}
          {type === RuleType.allowed_except.toLocaleString() && (
            <div className="flex flex-col w-full">
              <label>Classes:</label>
              <select
                name="classes"
                style={{
                  marginLeft: 5,
                  backgroundColor: "#fff",
                  borderRadius: 5,
                  border: "1px solid #ccc",
                  padding: 5,
                }}
                className="mb-4 w-full"
              >
                <option value={classTypes.car}>Carro</option>
                <option value={classTypes.truck}>Caminhão</option>
                <option value={classTypes.biker}>Motocicleta</option>
                <option value={classTypes.cycle}>Bicicleta</option>
                <option value={classTypes.person}>Pessoa</option>
              </select>
            </div>
          )}

          {type === RuleType.not_stopping.toLocaleString() && (
            <div className="flex flex-col w-full">
              <label>Classes:</label>
              <select
                name="classes"
                style={{
                  marginLeft: 5,
                  backgroundColor: "#fff",
                  borderRadius: 5,
                  border: "1px solid #ccc",
                  padding: 5,
                }}
                className="mb-4 w-full"
              >
                <option value={classTypes.car}>Carro</option>
                <option value={classTypes.truck}>Caminhão</option>
                <option value={classTypes.biker}>Motocicleta</option>
                <option value={classTypes.cycle}>Bicicleta</option>
                <option value={classTypes.person}>Pessoa</option>
              </select>
            </div>
          )}

          {type === RuleType.cross_area_to_area.toLocaleString() && (
            <div className="flex flex-col w-full">
              <label>Área de interesse de origem:</label>
              <select
                name="classes"
                style={{
                  marginLeft: 5,
                  backgroundColor: "#fff",
                  borderRadius: 5,
                  border: "1px solid #ccc",
                  padding: 5,
                }}
                className="mb-4 w-full"
              >
                {areasData.map((area) => (
                  <option value={area.id}>Área {area.id}</option>
                ))}
              </select>
              <label>Área de interesse de destino:</label>
              <select
                name="classes"
                style={{
                  marginLeft: 5,
                  backgroundColor: "#fff",
                  borderRadius: 5,
                  border: "1px solid #ccc",
                  padding: 5,
                }}
                className="mb-4 w-full"
              >
                {areasData.map((area) => (
                  <option value={area.id}>Área {area.id}</option>
                ))}
              </select>
            </div>
          )}

          <Button
            type="primary"
            htmlType="submit"
            style={{
              marginLeft: 5,
              backgroundColor: "#03a9f4",
              width: "wrap-content",
            }}
            className="mb-4 w-full"
          >
            Salvar
          </Button>
        </form>
      </Modal>

      <div className="flex justify-between items-center mb-12 border-b-2 border-white pb-2">
        <p>Lista de Regras</p>
        <Button
          className="rounded bg-emerald-800 hover:bg-emerald-900 text-white px-2 py-1"
          onClick={() => {
            setModalVisible(true);
          }}
        >
          Adicionar Regra
        </Button>
      </div>

      <div className="list overflow-y-auto h-full">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            {rules.length === 0 ? (
              <p className="text-white text-center w-full text-sm">
                Não há regras cadastradas.
              </p>
            ) : (
              <div className="flex flex-col w-full">
                {rules.map((rule) => (
                  <div
                    key={rule.id}
                    className="flex flex-row justify-between items-center bg-gray-900 p-2 mb-2 rounded"
                  >
                    <div className="flex flex-col">
                      <p className="text-white text-sm">Tipo: {rule.tipo}</p>
                      <p className="text-white text-sm">Valor: {rule.valor}</p>
                    </div>
                    <div className="flex flex-row">
                      <Button
                        className="rounded bg-red-800 hover:bg-red-900 text-white px-2 py-1"
                        onClick={() => {
                          console.log("delete");
                        }}
                      >
                        Remover
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListRules;
