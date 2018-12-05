interface RequestOptions {
  query: string;
  variables?: object;
}

interface Response<T> {
  data: T;
}

export async function request<T>({ query, variables }: RequestOptions): Promise<Response<T>> {
  const fetchOptions: RequestInit = {
    method: "POST",
    headers: {
      "X-Requested-With": "xhr",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  };

  const response = await fetch("/graphql", fetchOptions);
  const json = await response.json();
  if (json.data) {
    return Promise.resolve(json);
  } else {
    throw new Error("Unexpected: response body does not include the 'data' field");
  }
}
