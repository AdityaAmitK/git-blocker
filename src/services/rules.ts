import type { Rule } from "../types.js";
import { addRule, isConfigInstalled, listRules, removeRule } from "./config.js";

import { getGitDirectory } from "./git.js";

export async function createRule(rule: Rule): Promise<void> {
  const gitDirectory = await getGitDirectory();

  if (!isConfigInstalled(gitDirectory)) {
    throw new Error(
      "Git Blocker is not installed. Run 'git blocker install' first.",
    );
  }

  addRule(gitDirectory, rule);
}
export async function getRules(): Promise<Rule[]> {
	const gitDirectory = await getGitDirectory();
  
	if (!isConfigInstalled(gitDirectory)) {
	  throw new Error(
		"Git Blocker is not installed. Run 'git blocker install' first.",
	  );
	}
  
	return listRules(gitDirectory);
  }
  export async function deleteRule(
	pattern: string,
  ): Promise<void> {
	const gitDirectory = await getGitDirectory();
  
	if (!isConfigInstalled(gitDirectory)) {
	  throw new Error(
		"Git Blocker is not installed. Run 'git blocker install' first.",
	  );
	}
  
	removeRule(gitDirectory, pattern);
  }