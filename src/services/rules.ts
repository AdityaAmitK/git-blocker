import type { Rule } from "../types.js";
import { addRule, isConfigInstalled } from "./config.js";
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