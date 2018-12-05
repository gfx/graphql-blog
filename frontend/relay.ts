export interface Edge<T> {
  readonly node: T;
}

export interface Connection<T> {
  readonly edges: ReadonlyArray<Edge<T>>;
}

export function connectionFromArray<T>(array: ReadonlyArray<T>): Connection<T> {
  return {
    edges: array.map((node) => ({ node })),
  };
}

export function arrayFromConnection<T>(connection: Connection<T>): ReadonlyArray<T> {
  return connection.edges.map((edge) => edge.node);
}
