import {
	uninstallConfig,
	isConfigInstalled,
  } from "./config.js";
  import {
	getGitDirectory,
	isGitRepository,
  } from "./git.js";
  import { uninstallHook } from "./hook.js";
  
  export type UninstallResult =
	| "uninstalled"
	| "already-uninstalled";
  
  export async function uninstall(): Promise<UninstallResult> {
	if (!(await isGitRepository())) {
	  throw new Error("Not inside a Git repository.");
	}
  
	const gitDirectory = await getGitDirectory();
  
	const configInstalled =
	  isConfigInstalled(gitDirectory);
  
	const hookRemoved =
	  uninstallHook(gitDirectory);
  
	if (configInstalled) {
	  uninstallConfig(gitDirectory);
	}
  
	if (!configInstalled && !hookRemoved) {
	  return "already-uninstalled";
	}
  
	return "uninstalled";
  }