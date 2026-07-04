import { Command } from "commander";

import { check } from "../services/check.js";

export function registerCheckCommand(
  program: Command,
): void {
  program
    .command("check")
    .description("Check staged files against protected rules")
    .action(async () => {
      try {
        const matches = await check();

        if (matches.length === 0) {
          console.log("✓ No protected files staged.");
          return;
        }

        console.log("\nProtected files detected:\n");

        matches.forEach((match) => {
          console.log(`• ${match.file}`);

          if (match.rule.reason) {
            console.log(
              `  Reason: ${match.rule.reason}`,
            );
          }

          console.log();
        });
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