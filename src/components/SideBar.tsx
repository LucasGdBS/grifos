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
  shortestPathResult: { cost: number; path: string[] } | null, // Recebe o resultado do menor caminho
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
  shortestPathResult,
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
    <aside className="w-80 bg-black-night-rider p-5 space-y-4">
      <h1 className="text-2xl text-center">GRIFO</h1>

      {/* Botão para alternar entre grafo direcionado e não direcionado */}
      <div className="flex items-center justify-center w-full space-x-2">
        {ativo ? (
          <h2 className="text-base">Direcionado</h2>
        ) : (
          <h2 className="text-base">Não direcionado</h2>
        )}
        <div className="transform scale-75">
          <Interruptor onToggle={handleToggle}/>
        </div>
      </div>

      <textarea
        className="w-full h-32 p-2 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Digite a string do grafo aqui..."
        value={inputText}
        onChange={handleInputChange}
      ></textarea>

      <div className="justify-between flex">
        <h2 className="text-sm">Ordem: {ordem}</h2>
        <h2 className="text-sm">Tamanho: {tamanho}</h2>
      </div>

      <hr/>
      <div className="text-gray-800 flex flex-col space-y-4">

        <label className="text-white text-sm font-semibold">Menor caminho, custo e adjacência:</label>
        <div className="flex flex-row space-x-2 ">
          <input
            type="text"
            placeholder="Vértice 1"
            onChange={handleFromNodeChange}
            className="p-2 rounded-md w-1/2"
          />
          <input
            type="text"
            placeholder="Vértice 2"
            onChange={handleToNodeChange}
            className="p-2 rounded-md w-1/2"
          />
          </div>

        {areNodesAdjacent ? (
          <h2 className="text-green-400 text-sm">Vértices são adjacentes</h2>
        ) : (
          <h2 className="text-red-400 text-sm">Vértices não são adjacentes</h2>
        )}

        {shortestPathResult ? (
        <div>
          <h2 className="text-green-400 text-sm">Custo: {shortestPathResult.cost}</h2>
          <h2 className="text-green-400 text-sm">Caminho: {shortestPathResult.path.join(" -> ")}</h2>
        </div>
        ) : (
          <h2 className="text-red-400 text-sm">Vértices não conexos</h2>
        )}
      </div>

      <hr/>

      <div className="text-gray-800 flex flex-col space-y-4">
        <label className="text-white text-sm font-semibold"> Grau e vertices adjacentes </label>
        <input
          type="text"
          placeholder={"Escolha um vértice"}
          onChange={handleVerticeChange}
          className="p-2 rounded-md"
        />
        {ativo ? (
          <div className="flex flex-col space-y-4 text-lg text-white text-sm">
            <div className="flex flex-col">
              <h2>Vértices de Entrada : {adjacenteEntrada.join(" ")}</h2>
              <h2>Vértices de Saída : {adjacenteSaida.join(" ")}</h2>
            </div>
            <div className="flex flex-col">
              <h2>Grau de Entrada: {inDegree}</h2> {/* Exibindo o grau de entrada */}
              <h2>Grau de Saída: {outDegree}</h2>   {/* Exibindo o grau de saída */}
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-white text-sm">Vértices Adjacentes: {Array.from(
                new Set([...adjacenteEntrada, ...adjacenteSaida])
              ).join(" ")}
            </h2>
          </div>
        )}
      </div>
    </aside>
  );
}
