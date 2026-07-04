import micromatch from "micromatch";

import type { Match, Rule } from "../types.js";

export function matchRules(
  rules: Rule[],
  stagedFiles: string[],
): Match[] {
  const matches: Match[] = [];

  for (const file of stagedFiles) {
    for (const rule of rules) {
      if (micromatch.isMatch(file, rule.pattern)) {
        matches.push({
          file,
          rule,
        });
      }
    }
  }

  return matches;
}