export function adjacencyCheck(input: string) {
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

    function findAdjacentNodes(id: string) {
        const fromEdges = edges.filter((edge) => edge.from === id);
        const toEdges = edges.filter((edge) => edge.to === id);
        const fromNodes = fromEdges.map((edge) => edge.to);
        const toNodes = toEdges.map((edge) => edge.from);

        // Remover duplicados
        const uniqueFromNodes = [...new Set(fromNodes)];
        const uniqueToNodes = [...new Set(toNodes)];

        return {
            from: uniqueFromNodes,
            to: uniqueToNodes
        };
    }

    return {
        findAdjacentNodes
    };
}
