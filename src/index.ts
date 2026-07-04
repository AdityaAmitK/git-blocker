#!/usr/bin/env node

import { Command } from "commander";
import { registerInstallCommand } from "./commands/install";

const program = new Command();

program
  .name("git-blocker")
  .description("Protect important files from accidental Git commits.")
  .version("0.1.0");

registerInstallCommand(program);

program.parse();