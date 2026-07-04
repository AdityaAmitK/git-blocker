import { Command } from "commander";
import { deleteRule } from "../services/rules.js";

export function registerRemoveCommand(
  program: Command,
): void {
  program
    .command("remove")
    .description("Remove a rule")
    .argument("<pattern>")
    .action(async (pattern) => {
      try {
        await deleteRule(pattern);

        console.log("✓ Rule removed.");
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