type Node = { id: string; label: string };
type Edge = { from: string; to: string; label?: string };

type GraphData = {
  nodes: Node[];
  edges: Edge[];
};

type ShortestPathResult = {
  cost: number;
  path: string[];
} | null;

export function shortestPathBetweenTwoPoints(
  graphData: GraphData,
  startNode: string,
  endNode: string,
  directed: boolean = true
): ShortestPathResult {
  const { nodes, edges } = graphData;
  const graph: { [key: string]: { [key: string]: number } } = {};

  edges.forEach((edge) => {
    if (!graph[edge.from]) graph[edge.from] = {};
    graph[edge.from][edge.to] = edge.label ? parseFloat(edge.label) : 1;

    if (!directed) {
      if (!graph[edge.to]) graph[edge.to] = {};
      graph[edge.to][edge.from] = edge.label ? parseFloat(edge.label) : 1;
    }
  });

  const distances: { [key: string]: number } = {};
  const previousNodes: { [key: string]: string | null } = {};
  const unvisitedNodes: Set<string> = new Set(nodes.map((node) => node.id));

  nodes.forEach((node) => {
    distances[node.id] = Infinity;
    previousNodes[node.id] = null;
  });
  distances[startNode] = 0;

  while (unvisitedNodes.size > 0) {
    let currentNode: string | null = null;
    unvisitedNodes.forEach((node) => {
      if (currentNode === null || distances[node] < distances[currentNode]) {
        currentNode = node;
      }
    });

    if (currentNode === null || distances[currentNode] === Infinity) break;

    unvisitedNodes.delete(currentNode);

    if (currentNode === endNode) {
      const path: string[] = [];
      let tempNode: string | null = endNode;
      while (tempNode) {
        path.unshift(tempNode);
        tempNode = previousNodes[tempNode];
      }
      return { cost: distances[endNode], path };
    }

    for (const neighbor in graph[currentNode]) {
      const distance = distances[currentNode] + graph[currentNode][neighbor];
      if (distance < distances[neighbor]) {
        distances[neighbor] = distance;
        previousNodes[neighbor] = currentNode;
      }
    }
  }

  return null;
}
