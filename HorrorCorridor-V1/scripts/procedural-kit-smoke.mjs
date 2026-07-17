#!/usr/bin/env node
import { spawn } from "node:child_process";

const port = Number(process.env.PROCEDURAL_KIT_SMOKE_PORT ?? 3010);
const host = "127.0.0.1";
const seed = process.argv.includes("--seed")
  ? process.argv[process.argv.indexOf("--seed") + 1]
  : "protokit-smoke";
const url = `http://${host}:${port}/api/procedural-kit-smoke?seed=${encodeURIComponent(seed)}`;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchSmoke = async () => {
  const response = await fetch(url);
  const body = await response.json();

  return { response, body };
};

const waitForServer = async () => {
  let lastError = null;

  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      return await fetchSmoke();
    } catch (error) {
      lastError = error;
      await wait(500);
    }
  }

  throw lastError ?? new Error("Timed out waiting for procedural kit smoke server.");
};

const server = spawn(
  "npm",
  ["run", "dev", "--", "--webpack", "--hostname", host, "--port", String(port)],
  {
    env: {
      ...process.env,
      PORT: String(port),
    },
    stdio: ["ignore", "pipe", "pipe"],
  },
);

let serverLog = "";
server.stdout.on("data", (chunk) => {
  serverLog += chunk.toString();
});
server.stderr.on("data", (chunk) => {
  serverLog += chunk.toString();
});

const stopServer = () => {
  if (!server.killed) {
    server.kill("SIGTERM");
  }
};

process.on("exit", stopServer);
process.on("SIGINT", () => {
  stopServer();
  process.exit(130);
});

try {
  const { response, body } = await waitForServer();
  console.log(JSON.stringify(body, null, 2));
  stopServer();

  if (!response.ok || !body.ok) {
    process.exitCode = 1;
  }
} catch (error) {
  stopServer();
  console.error(
    JSON.stringify(
      {
        ok: false,
        error: error instanceof Error ? error.message : String(error),
        serverLog: serverLog.slice(-4000),
      },
      null,
      2,
    ),
  );
  process.exitCode = 1;
}
