import { Command } from "commander";
import inquirer from "inquirer";

import { check } from "../services/check.js";

export function registerHookCommand(program: Command): void {
  program
    .command("hook")
    .description("Internal command used by Git hooks")
    .action(async () => {
      try {
        const matches = await check();

        if (matches.length === 0) {
          process.exit(0);
        }

        console.log("\nGit Blocker\n");

        matches.forEach((match) => {
          console.log(`• ${match.file}`);

          if (match.rule.reason) {
            console.log(`  Reason: ${match.rule.reason}`);
          }

          console.log();
        });

        const { proceed } = await inquirer.prompt([
          {
            type: "confirm",
            name: "proceed",
            message: "Continue with commit?",
            default: false,
          },
        ]);

        process.exit(proceed ? 0 : 1);
      } catch (error) {
		if (
		  error instanceof Error &&
		  error.message.includes("force closed")
		) {
		  console.log("\nCommit aborted.");
		  process.exit(1);
		}
	  
		console.error(
		  error instanceof Error ? error.message : error,
		);
	  
		process.exit(1);
	  }
    });
}