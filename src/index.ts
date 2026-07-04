#!/usr/bin/env node

import { Command } from "commander";
import { registerInstallCommand } from "./commands/install";
import { registerAddCommand } from "./commands/add";
import { registerListCommand } from "./commands/list";
import { registerRemoveCommand } from "./commands/remove";
import { registerCheckCommand } from "./commands/check";
import { registerHookCommand } from "./commands/hook";
import { registerUninstallCommand } from "./commands/uninstall";

const program = new Command();

program
  .name("git-blocker")
  .description("Protect important files from accidental Git commits.")
  .version("0.1.0");

registerInstallCommand(program);
registerAddCommand(program);
registerListCommand(program);	
registerRemoveCommand(program);
registerCheckCommand(program);
registerHookCommand(program);
registerUninstallCommand(program);

program.parse();