import { ensureConfigExists } from "./config.js";
import {
  getGitDirectory,
  isGitRepository,
} from "./git.js";

export async function install(): Promise<void> {
  if (!(await isGitRepository())) {
    throw new Error("Not inside a Git repository.");
  }

  const gitDirectory = await getGitDirectory();

  ensureConfigExists(gitDirectory);
}