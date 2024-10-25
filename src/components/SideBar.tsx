import { useEffect, useState } from "react";

export default function SideBar() {
  const [inputText, setinputText] = useState<string>("");

  const [ordem, setOrdem] = useState<number>(0);
  const [grau, setGrau] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setinputText(e.target.value);
  };

  // TODO: Implementar função para calcular a ordem e o grau do grafo
  useEffect(() => {
    setGrau(2);
    setOrdem(2);
  }, []);

  return (
    <aside className="w-64 bg-black-night-rider p-5 space-y-6">
      <h1 className="text-2xl text-center">GRIFO</h1>

      <textarea
        className="w-full h-32 p-2 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Digite a string do grafo aqui..."
        value={inputText}
        onChange={handleInputChange}
      ></textarea>

      <div className="justify-between flex">
        <h2 className="text-xl">Ordem: {ordem}</h2>
        <h2 className="text-xl">Grau: {grau}</h2>
      </div>
    </aside>
  );
}
