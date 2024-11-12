import { useState } from "react";
import SideBar from "./components/SideBar";
import Graph from "./components/Graph";
import { parseGraphString } from "./utils/parseGraphString";
import { adjacencyCheck } from "./utils/adjacencyCheck.ts";
import { degreeCheck } from "./utils/degreeCheck.ts";
import { shortestPathBetweenTwoPoints } from "./utils/shortestPathBetweenTwoPoints";

function App() {
  const [grafoText, setGrafoText] = useState<string>("");
  const [directed, setDirected] = useState<boolean>(false);

  const [fromNode, setFromNode] = useState<string>("");
  const [toNode, setToNode] = useState<string>("");
  const [noEscolhido, setNoEscolhido] = useState<string>("");

  const { nodes, edges } = parseGraphString(grafoText);

  const adjacencyCheckInstance = adjacencyCheck(grafoText);
  const areNodesAdjacent = adjacencyCheckInstance
    ? adjacencyCheckInstance
        .findAdjacentNodes(fromNode)
        .from.includes(toNode) ||
      adjacencyCheckInstance.findAdjacentNodes(fromNode).to.includes(toNode)
    : false;

  const adjacencyCheck1 = adjacencyCheck(grafoText);
  const { from, to } = adjacencyCheck1.findAdjacentNodes(noEscolhido);

  const degreeCheckInstance = degreeCheck(grafoText, noEscolhido);
  const inDegree = degreeCheckInstance.inDegree;
  const outDegree = degreeCheckInstance.outDegree;

  const shortestPathResult = shortestPathBetweenTwoPoints(
    { nodes, edges },
    fromNode,
    toNode,
    directed
  );

  return (
    <div className="flex h-screen overflow-x-hidden bg-black-eclipse text-white-whisper">
      <SideBar
        setGrafo={setGrafoText}
        setDirected={setDirected}
        setNoEscolhido={setNoEscolhido}
        setFromNode={setFromNode}
        setToNode={setToNode}
        ordem={nodes.length}
        tamanho={nodes.length > 1 ? edges.length : 0}
        adjacenteEntrada={from}
        adjacenteSaida={to}
        areNodesAdjacent={areNodesAdjacent}
        inDegree={inDegree}
        outDegree={outDegree}
        shortestPathResult={shortestPathResult}
      />

      {/* Nesse main deverá ser implementado a visualização do grafo */}
      <main className="flex w-full h-full justify-center items-center ">
        <div className="border rounded-xl h-4/5 w-4/5 bg-white-whisper">
          <Graph
            nodes={nodes}
            edges={edges}
            isDirectional={directed}
            primaryNodeInput={grafoText}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
