import { Command } from "commander";
import { install } from "../services/installer.js";

export function registerInstallCommand(
  program: Command,
) {
  program
    .command("install")
    .description("Install Git Blocker")
    .action(async () => {
      await install();
    });
}