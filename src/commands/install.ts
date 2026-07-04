import { Command } from "commander";
import { install } from "../services/installer.js";

export function registerInstallCommand(program: Command): void {
  program
    .command("install")
    .description("Install Git Blocker")
    .action(async () => {
      try {
        const result = await install();

        switch (result) {
          case "installed":
            console.log("✓ Git Blocker installed successfully.");
            break;

          case "already-installed":
            console.log("✓ Git Blocker is already installed.");
            break;
        }
      } catch (error) {
        console.error(
          error instanceof Error ? error.message : error,
        );
        process.exit(1);
      }
    });
}