import fs from "node:fs";
import path from "node:path";

import { CONFIG_DIRECTORY, CONFIG_FILE } from "../constants.js";
import type { Config } from "../types.js";

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