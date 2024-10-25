import SideBar from "./components/SideBar";

function App() {
  return (
    <div className="flex h-screen overflow-x-hidden bg-black-eclipse text-white-whisper">

      <SideBar/>
      
      {/* Nesse main deverá ser implementado a visualização do grafo */}
      <main className="w-full">
        <h1 className="flex h-screen justify-center items-center">O grafo ficará aqui (eu acho)</h1>
      </main>
    </div>
  );
}

export default App;
