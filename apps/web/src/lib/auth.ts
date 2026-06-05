"use client";

const KEY = "uf_access_token";

type JwtPayload = {
  sub?: string;
  email?: string;
  roles?: string[];
  exp?: number;
};

export function getAccessToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(KEY);
}

export function setAccessToken(token: string) {
  window.localStorage.setItem(KEY, token);
}

export function clearAccessToken() {
  window.localStorage.removeItem(KEY);
}

function decodeBase64Url(input: string): string {
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  const padding = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4));
  return window.atob(normalized + padding);
}

export function getJwtPayload(token: string): JwtPayload | null {
  try {
    const [, payload] = token.split(".");
    if (!payload) return null;
    const json = decodeBase64Url(payload);
    return JSON.parse(json) as JwtPayload;
  } catch {
    return null;
  }
}

export function hasAnyRole(token: string, roles: string[]): boolean {
  const payload = getJwtPayload(token);
  if (!payload?.roles?.length) return false;
  return payload.roles.some((r) => roles.includes(r));
}
