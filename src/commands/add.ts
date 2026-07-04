import { Command } from "commander";
import { createRule } from "../services/rules.js";

export function registerAddCommand(
  program: Command,
): void {
  program
    .command("add")
    .argument("<pattern>")
    .option(
      "-r, --reason <reason>",
      "Reason for protection",
    )
    .action(async (pattern, options) => {
      try {
        await createRule({
          pattern,
          reason: options.reason,
        });

        console.log("✓ Rule added.");
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