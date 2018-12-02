interface RequestOptions {
  method: "GET" | "POST";
  url: string;
  body?: object;
}

interface Response<T> {
  data: T;
}

export async function request<T>({ method, url, body }: RequestOptions): Promise<Response<T>> {
  const fetchOptions: RequestInit = {
    method,
    headers: {
      "X-Requested-With": "xhr",
    },
  };

  if (body) {
    fetchOptions.headers!["Content-Type"] = "application/json";
    fetchOptions.body = JSON.stringify(body);
  }

  const response = await fetch(url, fetchOptions);
  const json = await response.json();
  if (json.data) {
    return Promise.resolve(json);
  } else {
    throw new Error("Unexpected: response body does not include the 'data' field");
  }
}
