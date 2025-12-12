interface RequestOptions {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
}

async function httpClient<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, headers = {} } = options;

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

export const http = {
  get: <T>(url: string) => httpClient<T>(url),
  post: <T>(url: string, body: unknown) => httpClient<T>(url, { method: 'POST', body }),
  put: <T>(url: string, body: unknown) => httpClient<T>(url, { method: 'PUT', body }),
  delete: <T>(url: string) => httpClient<T>(url, { method: 'DELETE' }),
};
