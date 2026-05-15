"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { setAccessToken } from "@/lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { accessToken } = await api.auth.login({ email, password });
      setAccessToken(accessToken);
      window.location.href = "/catalog";
    } catch {
      setError("Invalid credentials or API not reachable.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
        <p className="text-sm text-neutral-600">Access your UrbanFoods account.</p>
      </div>
      <form className="space-y-3" onSubmit={onSubmit}>
        <label className="block text-sm">
          <div className="mb-1 text-neutral-700">Email</div>
          <input
            className="w-full rounded-lg border border-neutral-300 px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
        </label>
        <label className="block text-sm">
          <div className="mb-1 text-neutral-700">Password</div>
          <input
            className="w-full rounded-lg border border-neutral-300 px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
        </label>
        {error ? <div className="text-sm text-red-600">{error}</div> : null}
        <button
          disabled={loading}
          className="w-full rounded-lg bg-brand-500 px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
        <div className="text-sm text-neutral-600">
          New here?{" "}
          <a href="/register" className="text-brand-500 hover:underline">
            Create an account
          </a>
        </div>
      </form>
    </div>
  );
}

