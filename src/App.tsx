import { useState } from "react";
import SideBar from "./components/SideBar";
import Graph from "./components/Graph";
import { parseGraphString } from "./utils/parseGraphString";

function App() {
  const [grafoText, setGrafoText] = useState<string>("");
  const [directed, setDirected] = useState<boolean>(false);

  const { nodes, edges } = parseGraphString(grafoText);

  return (
    <div className="flex h-screen overflow-x-hidden bg-black-eclipse text-white-whisper">
      <SideBar setGrafo={setGrafoText} setDirected={setDirected} />

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
