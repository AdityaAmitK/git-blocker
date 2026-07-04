import { ensureConfigExists, isConfigInstalled } from "./config.js";
import { getGitDirectory, isGitRepository } from "./git.js";
import { installHook } from "./hook.js";

export type InstallResult = "installed" | "already-installed";

export async function install(): Promise<InstallResult> {
  if (!(await isGitRepository())) {
    throw new Error("Not inside a Git repository.");
  }

  const gitDirectory = await getGitDirectory();

  const configAlreadyInstalled = isConfigInstalled(gitDirectory);

  if (!configAlreadyInstalled) {
    ensureConfigExists(gitDirectory);
  }

  const hookInstalled = installHook(gitDirectory);

  if (configAlreadyInstalled && !hookInstalled) {
    return "already-installed";
  }

  return "installed";
}
