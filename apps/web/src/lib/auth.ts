"use client";

const KEY = "uf_access_token";

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

