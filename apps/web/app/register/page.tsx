"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { setAccessToken } from "@/lib/auth";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { accessToken } = await api.auth.register({ email, phone, password });
      setAccessToken(accessToken);
      window.location.href = "/catalog";
    } catch {
      setError("Registration failed (email may already exist).");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Create account</h1>
        <p className="text-sm text-neutral-600">Register to start ordering.</p>
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
          <div className="mb-1 text-neutral-700">Phone</div>
          <input
            className="w-full rounded-lg border border-neutral-300 px-3 py-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
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
          {loading ? "Creating..." : "Create account"}
        </button>
        <div className="text-sm text-neutral-600">
          Already have an account?{" "}
          <a href="/login" className="text-brand-500 hover:underline">
            Sign in
          </a>
        </div>
      </form>
    </div>
  );
}

