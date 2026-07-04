import { ensureConfigExists, isConfigInstalled } from "./config.js";
import {
  getGitDirectory,
  isGitRepository,
} from "./git.js";

export type InstallResult =
  | "installed"
  | "already-installed";

export async function install(): Promise<InstallResult> {
  if (!(await isGitRepository())) {
    throw new Error("Not inside a Git repository.");
  }

  const gitDirectory = await getGitDirectory();

  if (isConfigInstalled(gitDirectory)) {
    return "already-installed";
  }

  ensureConfigExists(gitDirectory);

  return "installed";
}