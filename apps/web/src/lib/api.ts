import { env } from "./env";

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${env.API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(init?.headers ?? {})
    },
    cache: "no-store"
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return (await res.json()) as T;
}

export const api = {
  auth: {
    login: (body: { email: string; password: string }) =>
      http<{ accessToken: string }>("/auth/login", { method: "POST", body: JSON.stringify(body) }),
    register: (body: { email: string; phone: string; password: string }) =>
      http<{ accessToken: string }>("/auth/register", { method: "POST", body: JSON.stringify(body) })
  },
  catalog: {
    products: () =>
      http<
        Array<{
          _id: string;
          name: string;
          price: number;
          unit?: string;
          slug: string;
        }>
      >("/catalog/products")
  },
  orders: {
    create: (token: string, body: { items: Array<{ productId: string; quantity: number }>; deliveryAddress: string }) =>
      http("/orders", {
        method: "POST",
        body: JSON.stringify(body),
        headers: { authorization: `Bearer ${token}` }
      }),
    mine: (token: string) => http("/orders", { headers: { authorization: `Bearer ${token}` } })
  }
};

