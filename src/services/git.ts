import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

async function runGit(args: string[]): Promise<string> {
  const { stdout } = await execFileAsync("git", args);
  return stdout.trim();
}

export async function isGitRepository(): Promise<boolean> {
  try {
    const output = await runGit([
      "rev-parse",
      "--is-inside-work-tree",
    ]);

    return output === "true";
  } catch {
    return false;
  }
}

export async function getGitDirectory(): Promise<string> {
  return runGit([
    "rev-parse",
    "--git-dir",
  ]);
}
export async function getStagedFiles(): Promise<string[]> {
  const output = await runGit([
    "diff",
    "--cached",
    "--name-only",
  ]);

  return output.split("\n");
}