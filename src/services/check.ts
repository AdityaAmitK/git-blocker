import type { Match } from "../types.js";

import { isConfigInstalled, listRules } from "./config.js";
import {
  getGitDirectory,
  getStagedFiles,
} from "./git.js";
import { matchRules } from "./matcher.js";

export async function check(): Promise<Match[]> {
  const gitDirectory = await getGitDirectory();

  if (!isConfigInstalled(gitDirectory)) {
    throw new Error(
      "Git Blocker is not installed. Run 'git blocker install' first.",
    );
  }

  const rules = listRules(gitDirectory);

  const stagedFiles = await getStagedFiles();

  return matchRules(rules, stagedFiles);
}