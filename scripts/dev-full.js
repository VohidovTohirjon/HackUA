import { spawn } from "node:child_process";

const commands = [
  ["backend", "npm", ["run", "server"]],
  ["frontend", "npm", ["run", "dev"]]
];

const children = commands.map(([label, command, args]) => {
  const child = spawn(command, args, {
    stdio: ["ignore", "pipe", "pipe"],
    shell: true
  });

  child.stdout.on("data", (data) => {
    process.stdout.write(`[${label}] ${data}`);
  });

  child.stderr.on("data", (data) => {
    process.stderr.write(`[${label}] ${data}`);
  });

  child.on("exit", (code) => {
    if (code && code !== 0) {
      console.error(`[${label}] exited with code ${code}`);
    }
  });

  return child;
});

function shutdown() {
  for (const child of children) {
    child.kill("SIGTERM");
  }
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
