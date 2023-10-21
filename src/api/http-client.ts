/* eslint-disable @typescript-eslint/no-explicit-any */
import superjson from "superjson";

export type HttpMethod = "GET" | "POST" | "DELETE" | "PATCH";

export type HttpHeaders = Record<string, string>;

export type Config<T = unknown, R = unknown, B = unknown, TB = unknown> = {
  method: HttpMethod;
  body?: B;
  noJSON?: boolean;
  noContentHeader?: boolean;
  headers?: HttpHeaders;
  query?: Record<string, string | undefined>;
  bodyParser?: (data: B) => TB;
  responseParser?: (data: T) => R;
  authToken?: string;
};

export type RequestConfig<T = unknown, R = unknown> = {
  url: string;
  method: HttpMethod;
  query?: Record<string, string | undefined>;
  headers?: HttpHeaders;
  parseBodyAsJson?: boolean;
  responseParser?: (data: T) => R;
  authToken?: string;
};

/**
 * Wrapper for fetch function that handles repetetive tasks
 * @param url URL to make the request to
 * @param method HTTP Method
 * @param query Query Search parameters
 * @param headers Custom HTTP Headers
 * @param parseBodyAsJson Flag to parse the provided body as JSON and to add "Content-Type": "application/json" header
 * @param responseParser Function to parse the data received from the API
 * @param authToken Authorization token added as Bearer
 */
export const sendRequest =
  <T, B = unknown, R = unknown>({
    url,
    method,
    query = {},
    headers = {},
    parseBodyAsJson = true,
    responseParser = (r) => r as unknown as R,
    authToken,
  }: RequestConfig<T, R>) =>
  async (body: B) => {
    // Convert body to JSON
    const _body = (() => {
      if (method === "GET" || !body) {
        return undefined;
      }
      return parseBodyAsJson ? JSON.stringify(body) : body;
    })();

    // Setup Headers
    const _headers: HttpHeaders = (() => {
      let h: Record<string, string> = {};
      if (authToken) {
        h = { ...h, Authorization: `Bearer ${authToken}` };
      }
      if (parseBodyAsJson) {
        h = { ...h, "Content-Type": "application/json" };
      }

      return { ...h, ...headers };
    })();

    // Setup query params
    const fullUrl = (() => {
      const qp = Object.entries(query);

      if (qp.length > 0) {
        const params = qp
          .flatMap(([param, value]) =>
            value !== undefined ? `${param}=${encodeURIComponent(value)}` : []
          )
          .join("&");
        return `http://localhost:3000/api/${url}?${params}`;
      }
      return `http://localhost:3000/api/${url}`;
    })();

    let response: Response;
    let responseData: any;
    try {
      // Make HTTP Request
      response = await fetch(fullUrl, {
        headers: _headers,
        method,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        body: _body,
      });

      // Convert to json
      responseData = await response.json();
    } catch (error: any) {
      throw new Error(error?.message ?? "Something went wrong");
    }

    // Data in the json field is stringified by superjson
    const actualData =
      "json" in responseData
        ? superjson.parse(responseData.json)
        : responseData;

    if (!response.ok) {
      throw new Error(actualData?.message ?? "Something went wrong");
    }

    return responseParser(actualData) as R;
  };
