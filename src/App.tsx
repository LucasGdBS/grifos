import BackgroundGraph from "./components/BackGroundGraph";
import SideBar from "./components/SideBar";

function App() {
  return (
    <div className="flex h-screen overflow-x-hidden bg-black-eclipse text-white-whisper">
      <SideBar />

      {/* Nesse main deverá ser implementado a visualização do grafo */}
      <main className="flex w-full h-full justify-center items-center">
        <BackgroundGraph />
      </main>
    </div>
  );
}

export default App;
