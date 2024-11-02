import { useState } from "react";
import SideBar from "./components/SideBar";
import Graph from "./components/Graph";
import { parseGraphString } from "./utils/parseGraphString";
import {adjacencyCheck} from "./utils/adjacencyCheck.ts";

function App() {
  const [grafoText, setGrafoText] = useState<string>("");
  const [directed, setDirected] = useState<boolean>(false);

  const [noEscolhido, setNoEscolhido] = useState<string>("");
  const { nodes, edges } = parseGraphString(grafoText);

  const adjacencyCheck1 = adjacencyCheck(grafoText);
  const {from, to} = adjacencyCheck1.findAdjacentNodes(noEscolhido);
  return (
    <div className="flex h-screen overflow-x-hidden bg-black-eclipse text-white-whisper">
      <SideBar
        setGrafo={setGrafoText}
        setDirected={setDirected}
        setNoEscolhido={setNoEscolhido}
        ordem={nodes.length}
        tamanho={nodes.length > 1 ? edges.length : 0}
        adjacenteEntrada={from}
        adjacenteSaida={to}
      />

      {/* Nesse main deverá ser implementado a visualização do grafo */}
      <main className="flex w-full h-full justify-center items-center ">
        <div className="border rounded-xl h-4/5 w-4/5 bg-white-whisper">
          <Graph nodes={nodes} edges={edges} isDirectional={directed} />
        </div>
      </main>
    </div>
  );
}

export default App;
