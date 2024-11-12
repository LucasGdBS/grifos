export function degreeCheck(input: string, vertexId: string) {
  const edges = input
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "")
    .map((line) => {
      const [from, to, weight] = line.split(" ");
      return {
        from,
        to,
        label: weight ? weight : undefined,
      };
    });

  //* Graus das arestas de entrada
  const inDegree = edges.filter((edge) => edge.to === vertexId).length;

  //* Graus das arestas de saída
  const outDegree = edges.filter((edge) => edge.from === vertexId).length;

  return {
    inDegree,
    outDegree,
  };
}
