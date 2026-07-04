import { Command } from "commander";

import {
  uninstall,
} from "../services/uninstaller.js";

export function registerUninstallCommand(
  program: Command,
): void {
  program
    .command("uninstall")
    .description("Uninstall Git Blocker")
    .action(async () => {
      try {
        const result = await uninstall();

        switch (result) {
          case "uninstalled":
            console.log(
              "✓ Git Blocker uninstalled successfully.",
            );
            break;

          case "already-uninstalled":
            console.log(
              "✓ Git Blocker is already uninstalled.",
            );
            break;
        }
      } catch (error) {
        console.error(
          error instanceof Error
            ? error.message
            : error,
        );

        process.exit(1);
      }
    });
}