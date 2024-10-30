import { useEffect, useRef } from "react";
import { Network } from "vis-network";
import "vis-network/styles/vis-network.css";

interface GraphProps {
  nodes: { id: string; label: string }[];
  edges: { from: string; to: string }[];
  isDirectional: boolean;
}

export default function Graph({ nodes, edges, isDirectional }: GraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const data = { nodes, edges };
    const options = {
      autoResize: true,
      height: "100%",
      width: "100%",
      nodes: {
        shape: "circle", // Formato circular para os nós
        size: 20, // Tamanho da bolinha
        color: {
          background: "#97C2FC", // Cor de fundo do nó
          border: "#2B7CE9", // Cor da borda do nó
          highlight: { background: "#D2E5FF", border: "#2B7CE9" }, // Cores ao selecionar o nó
        },
        font: {
          color: "#343434", // Cor do texto
          size: 14, // Tamanho do texto
          align: "center", // Centraliza o texto
          vadjust: 0, // Ajusta a posição vertical da label
          multi: false, // Impede ajuste automático para várias linhas
        },
        scaling: {
          min: 25,
          max: 25,
          label: { enabled: false }, // Impede o redimensionamento da label
        },
      },
      edges: {
        arrows: isDirectional ? { to: { enabled: true } } : undefined,
      },
      physics: { enabled: true },
    };

    if (containerRef.current) {
      new Network(containerRef.current, data, options);
    }
  }, [nodes, edges, isDirectional]);

  return <div ref={containerRef} className="w-full h-full" />;
}
