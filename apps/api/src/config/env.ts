import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";

function loadDotEnv() {
  const candidates = [
    path.resolve(process.cwd(), ".env"),
    path.resolve(process.cwd(), "..", ".env"),
    path.resolve(process.cwd(), "..", "..", ".env")
  ];
  const file = candidates.find((p) => fs.existsSync(p));
  if (file) dotenv.config({ path: file });
}

loadDotEnv();

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

function optional(name: string, fallback: string): string {
  return process.env[name] ?? fallback;
}

export const env = {
  PORT: Number(optional("PORT", "4000")),
  MONGODB_URI: required("MONGODB_URI"),
  JWT_SECRET: required("JWT_SECRET"),
  BOOTSTRAP_TOKEN: optional("BOOTSTRAP_TOKEN", "")
};
