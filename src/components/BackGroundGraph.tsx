import { ReactFlow, Background } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

export default function BackgroundGraph() {
  return (
    <div className="w-3/4 h-3/4 border border-white-whisper rounded-2xl">
      <ReactFlow>
        <Background/>
      </ReactFlow>
    </div>
  );
}
