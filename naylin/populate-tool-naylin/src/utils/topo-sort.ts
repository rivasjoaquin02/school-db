class Graph<T> {
	private adjList: Map<number, number[]>;

	constructor(nodes: T[]) {
		this.adjList = new Map<number, number[]>();
	}

	addEdge(v: number, w: number): void {
		if (!this.adjList.has(v)) {
			this.adjList.set(v, []);
		}
		this.adjList.get(v)!.push(w);
	}

	topologicalSortUtil(v: number, visited: boolean[], stack: number[]): void {
		visited[v] = true;
		const neighbours = this.adjList.get(v);
		if (neighbours) {
			for (const neighbour of neighbours) {
				if (!visited[neighbour]) {
					this.topologicalSortUtil(neighbour, visited, stack);
				}
			}
		}
		stack.unshift(v);
	}

	topologicalSort(): number[] {
		const stack: number[] = [];
		const visited: boolean[] = [];
		for (let i = 0; i <= Array.from(this.adjList.keys()).length; i++) {
			visited[i] = false;
		}
		for (const node of Array.from(this.adjList.keys())) {
			if (!visited[node]) {
				this.topologicalSortUtil(node, visited, stack);
			}
		}
		return stack;
	}
}

const tables = [
	"persona",
	"estudiante",
	"profesor",
	"libro",
	"prestamo",
	"perdida",
	"autor",
	"autorLibro",
];

const g = new Graph(tables);
g.addEdge(tables.indexOf("libro"), tables.indexOf("prestamo"));
g.addEdge(tables.indexOf("libro"), tables.indexOf("autorLibro"));
g.addEdge(tables.indexOf("prestamo"), tables.indexOf("perdida"));
g.addEdge(tables.indexOf("persona"), tables.indexOf("prestamo"));
g.addEdge(tables.indexOf("persona"), tables.indexOf("estudiante"));
g.addEdge(tables.indexOf("persona"), tables.indexOf("profesor"));
g.addEdge(tables.indexOf("autor"), tables.indexOf("autorLibro"));

export const getOrderOfTables = (): string[] => {
	return g.topologicalSort().map((i) => tables[i]);
};
