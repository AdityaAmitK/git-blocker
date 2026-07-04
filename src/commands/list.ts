import { Command } from "commander";
import { getRules } from "../services/rules.js";

export function registerListCommand(
  program: Command,
): void {
  program
    .command("list")
    .description("List protected rules")
    .action(async () => {
      try {
        const rules = await getRules();

        if (rules.length === 0) {
          console.log("No rules configured.");
          return;
        }

        console.log("\nProtected Rules\n");

        rules.forEach((rule, index) => {
          console.log(`${index + 1}. ${rule.pattern}`);

          if (rule.reason) {
            console.log(`   Reason: ${rule.reason}`);
          }

          console.log();
        });
      } catch (error) {
        console.error(
          error instanceof Error ? error.message : error,
        );
        process.exit(1);
      }
    });
}