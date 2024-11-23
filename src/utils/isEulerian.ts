type Edge = {
  from: string;
  to: string;
  label: string | undefined;
};

export function isEulerian(edges: Edge[], directed: boolean): boolean {
  // Parse da string para criar a lista de arestas

  // Map para armazenar os graus dos vértices
  const degrees: Map<string, { in: number; out: number }> = new Map();

  // Calculando graus de entrada e saída
  edges.forEach(({ from, to }) => {
    if (!degrees.has(from)) degrees.set(from, { in: 0, out: 0 });
    if (!degrees.has(to)) degrees.set(to, { in: 0, out: 0 });

    degrees.get(from)!.out += 1;
    degrees.get(to)!.in += 1;

    if (!directed) {
      degrees.get(from)!.in += 1;
      degrees.get(to)!.out += 1;
    }
  });

  // Verificando as condições de eulerianidade
  if (directed) {
    // Para grafos direcionados, grau de entrada deve ser igual ao grau de saída
    return Array.from(degrees.values()).every(
      (degree) => degree.in === degree.out
    );
  } else {
    // Para grafos não direcionados, todos os vértices devem ter grau par
    return Array.from(degrees.values()).every((degree) => degree.in % 2 === 0);
  }
}
