import { useEffect, useRef } from "react";
import { Network } from "vis-network";
import "vis-network/styles/vis-network.css";

interface GraphProps {
  nodes: { id: string; label: string }[];
  edges: { from: string; to: string }[];
  isDirectional: boolean;
  primaryNodeInput: string;
}

export default function Graph({
  nodes,
  edges,
  isDirectional,
  primaryNodeInput,
}: GraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<Network | null>(null);

  const getOptions = () => ({
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
      width: 2,
      color: {
        color: "#6B7280",
        highlight: "#4F46E5",
      },
      font: {
        size: 12,
      },
    },
    physics: {
      enabled: true,
      solver: "forceAtlas2Based",
      forceAtlas2Based: {
        gravitationalConstant: -26,
        centralGravity: 0.005,
        springLength: 230,
        springConstant: 0.18,
      },
    },
  });

  useEffect(() => {
    if (containerRef.current && !networkRef.current) {
      networkRef.current = new Network(
        containerRef.current,
        { nodes, edges },
        getOptions()
      );
    }
  }, []);

  // Atualiza o grafo apenas se `primaryNodeInput` for alterado
  useEffect(() => {
    if (networkRef.current) {
      networkRef.current.setData({ nodes, edges });
    }
  }, [primaryNodeInput]);

  // Atualiza as arestas e a direção, mantendo o nível de zoom e posição
  useEffect(() => {
    if (networkRef.current) {
      const updatedEdges = edges.map((edge) => ({
        ...edge,
        arrows: isDirectional
          ? { to: { enabled: true, scaleFactor: 1 } }
          : undefined,
      }));
      networkRef.current.setData({ nodes, edges: updatedEdges });
    }
  }, [isDirectional]); // Observa mudanças apenas em `isDirectional`

  return <div ref={containerRef} className="w-full h-full" />;
}
