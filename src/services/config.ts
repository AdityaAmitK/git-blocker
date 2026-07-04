import fs from "node:fs";
import path from "node:path";

import { CONFIG_DIRECTORY, CONFIG_FILE } from "../constants.js";
import type { Config, Rule } from "../types.js";

function getConfigDirectory(gitDirectory: string): string {
  return path.join(gitDirectory, CONFIG_DIRECTORY);
}

function getConfigPath(gitDirectory: string): string {
  return path.join(getConfigDirectory(gitDirectory), CONFIG_FILE);
}

function createDefaultConfig(configPath: string): void {
  const config: Config = {
    rules: [],
  };

  fs.writeFileSync(
    configPath,
    JSON.stringify(config, null, 2),
    "utf8",
  );
}

function readConfig(gitDirectory: string): Config {
  const configPath = getConfigPath(gitDirectory);

  return JSON.parse(
    fs.readFileSync(configPath, "utf8"),
  ) as Config;
}

function writeConfig(
  gitDirectory: string,
  config: Config,
): void {
  fs.writeFileSync(
    getConfigPath(gitDirectory),
    JSON.stringify(config, null, 2),
    "utf8",
  );
}

export function ensureConfigExists(
  gitDirectory: string,
): void {
  const configDirectory = getConfigDirectory(gitDirectory);

  fs.mkdirSync(configDirectory, {
    recursive: true,
  });

  const configPath = getConfigPath(gitDirectory);

  if (!fs.existsSync(configPath)) {
    createDefaultConfig(configPath);
  }
}

export function isConfigInstalled(
  gitDirectory: string,
): boolean {
  return fs.existsSync(getConfigPath(gitDirectory));
}

export function addRule(
  gitDirectory: string,
  rule: Rule,
): void {
  const config = readConfig(gitDirectory);

  const exists = config.rules.some(
    (existingRule) =>
      existingRule.pattern === rule.pattern,
  );

  if (exists) {
    throw new Error("Rule already exists.");
  }

  config.rules.push(rule);

  writeConfig(gitDirectory, config);
}
export function listRules(
	gitDirectory: string,
  ): Rule[] {
	const config = readConfig(gitDirectory);
  
	return config.rules;
  }
  export function removeRule(
	gitDirectory: string,
	pattern: string,
  ): void {
	const config = readConfig(gitDirectory);
  
	const initialLength = config.rules.length;
  
	config.rules = config.rules.filter(
	  (rule) => rule.pattern !== pattern,
	);
  
	if (config.rules.length === initialLength) {
	  throw new Error("Rule not found.");
	}
  
	writeConfig(gitDirectory, config);
  }
  export function uninstallConfig(
    gitDirectory: string,
  ): boolean {
    const configDirectory = getConfigDirectory(gitDirectory);
  
    if (!fs.existsSync(configDirectory)) {
      return false;
    }
  
    fs.rmSync(configDirectory, {
      recursive: true,
      force: true,
    });
  
    return true;
  }