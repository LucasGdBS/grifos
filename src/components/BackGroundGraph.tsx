import {
  ReactFlow,
  Background,
  Node,
  useEdgesState,
  useNodesState,
  ConnectionMode,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import Vertice from "./Vertice";

const NODE_TYPES = {
  vertice: Vertice,
};

const INITIAL_NODES = [
  {
    id: "1",
    type: "vertice",
    data: { label: "A" },
    position: { x: 200, y: 400 },
  },
  {
    id: "2",
    type: "vertice",
    data: { label: "B" },
    position: { x: 400, y: 400 },
  },
] satisfies Node[];

export default function BackgroundGraph() {
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);

  return (
    <div className="w-3/4 h-3/4 border border-white-whisper rounded-2xl">
      <ReactFlow
        nodeTypes={NODE_TYPES}
        nodes={nodes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        connectionMode={ConnectionMode.Loose}
      >
        <Background />
      </ReactFlow>
    </div>
  );
}
