import { useState } from "react";
import BackgroundGraph from "./components/BackGroundGraph";
import SideBar from "./components/SideBar";

function App() {
  const [grafoText, setGrafoText] = useState<string>("");
  const [directed, setDirected] = useState<boolean>(false);

  return (
    <div className="flex h-screen overflow-x-hidden bg-black-eclipse text-white-whisper">
      <SideBar setGrafo={setGrafoText} setDirected={setDirected} />

      {/* Nesse main deverá ser implementado a visualização do grafo */}
      <main className="flex w-full h-full justify-center items-center">
        <BackgroundGraph grafoText={grafoText} directed={directed} />
      </main>
    </div>
  );
}

export default App;
