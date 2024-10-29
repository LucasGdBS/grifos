export function parseGraphString(input: string) {
  const edges = input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line !== "") // Ignora linhas vazias
    .map((line) => {
      const [from, to, weight] = line.split(' ');
      return {
        from,
        to,
        label: weight ? weight : undefined,
      };
    });

  // Identificar nós únicos
  const uniqueNodeIds = Array.from(new Set(edges.flatMap((edge) => [edge.from, edge.to])));
  const nodes = uniqueNodeIds
    .filter((id) => id !== undefined && id !== '') // Ignora nós indefinidos
    .map((id) => ({ id, label: `Node ${id}` }));

  return { nodes, edges };
}
