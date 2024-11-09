import { useEffect, useState } from "react";
import Interruptor from "./Interruptor";

interface SideBarProps {
  setGrafo: (text: string) => void;
  setDirected: (directed: boolean) => void;
  setNoEscolhido: (id: string) => void;
  setFromNode: (text: string) => void;
  setToNode: (text: string) => void;
  areNodesAdjacent: boolean;
  ordem: number;
  tamanho: number;
  adjacenteEntrada: string[];
  adjacenteSaida: string[];
  inDegree: number; // Adicionando inDegree ao tipo
  outDegree: number; // Adicionando outDegree ao tipo
}

export default function SideBar({
  setGrafo,
  setDirected,
  setNoEscolhido,
  setFromNode,
  setToNode,
  areNodesAdjacent,
  ordem: order,
  tamanho: size,
  adjacenteEntrada,
  adjacenteSaida,
  inDegree,  // Adicionando inDegree à desestruturação das props
  outDegree, // Adicionando outDegree à desestruturação das props
}: SideBarProps) {
  const [inputText, setinputText] = useState<string>("");

  const [ordem, setOrdem] = useState<number>(0);
  const [tamanho, setTamanho] = useState<number>(0);

  const [ativo, setAtivo] = useState<boolean>(false);
  const [, setVerticeEscolhido] = useState<string>("");

  const handleVerticeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerticeEscolhido(e.target.value);
    setNoEscolhido(e.target.value);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setinputText(e.target.value);
    setGrafo(e.target.value);
  };

  const handleFromNodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromNode(e.target.value);
  };

  const handleToNodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToNode(e.target.value);
  };

  const handleToggle = (newValue: boolean) => {
    // Atualiza o estado do grafo direcionado
    setAtivo(newValue);
    setDirected(newValue);
  };

  // TODO: Implementar função para calcular a ordem e o grau do grafo
  useEffect(() => {
    setTamanho(size);
    setOrdem(order);
  }, [order, size]);

  // TODO: Implementar função para transformar o texto em grafo

  return (
    <aside className="w-80 bg-black-night-rider p-5 space-y-6">
      <h1 className="text-2xl text-center">GRIFO</h1>

      {/* Botão para alternar entre grafo direcionado e não direcionado */}
      <div className="flex flex-col justify-center w-full items-center">
        {ativo ? (
          <h2 className="text-xl">Direcionado</h2>
        ) : (
          <h2 className="text-xl">Não direcionado</h2>
        )}
        <Interruptor onToggle={handleToggle} />
      </div>

      <textarea
        className="w-full h-32 p-2 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Digite a string do grafo aqui..."
        value={inputText}
        onChange={handleInputChange}
      ></textarea>

      <div className="justify-between flex">
        <h2 className="text-xl">Ordem: {ordem}</h2>
        <h2 className="text-xl">Tamanho: {tamanho}</h2>
      </div>

      <div className="text-gray-800 flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Vértice 1"
          onChange={handleFromNodeChange}
          className="p-2 rounded-md"
        />
        <input
          type="text"
          placeholder="Vértice 2"
          onChange={handleToNodeChange}
          className="p-2 rounded-md"
        />
        {areNodesAdjacent ? (
          <h2 className="text-green-500 text-lg">Vértices são adjacentes</h2>
        ) : (
          <h2 className="text-red-600 text-lg">Vértices não são adjacentes</h2>
        )}
      </div>

      <div className="text-gray-800 flex flex-col space-y-8">
        <input
          type="text"
          placeholder={"Escolha um vértice"}
          onChange={handleVerticeChange}
          className="p-2 rounded-md"
        />
        {ativo ? (
          <div className="flex flex-col space-y-4 text-lg text-white">
            <div className="flex flex-col">
              <h2>Vértices de Entrada : </h2>
              <h2>{adjacenteEntrada.join(" ")}</h2>
            </div>
            <div className="flex flex-col">
              <h2>Vértices de Saída : </h2>
              <h2>{adjacenteSaida.join(" ")}</h2>
            </div>
            <div className="flex flex-col">
              <h2>Grau de Entrada: {inDegree}</h2> {/* Exibindo o grau de entrada */}
              <h2>Grau de Saída: {outDegree}</h2>   {/* Exibindo o grau de saída */}
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-white text-xl">Vértices Adjacentes: </h2>
            <h2 className="text-white text-xl">
              {Array.from(
                new Set([...adjacenteEntrada, ...adjacenteSaida])
              ).join(" ")}
            </h2>
          </div>
        )}
      </div>
    </aside>
  );
}
