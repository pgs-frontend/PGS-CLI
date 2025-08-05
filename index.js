#!/usr/bin/env node

import { Command } from "commander";
import startPGSCLI from './cli/start.js';
import config from "./cli/config.js";
import TemplatesSection from "./cli/commands/templates.js";
import {AuthChecker, LogoutSection, LoginSection, CLIDefaultSection} from "./cli/app.js";

const program = new Command();

export const session = {}

async function PGSCli(){

    startPGSCLI()

    program
    .command("login")
    .description("Login to the system")
    .option("-e, --email <email>", "Email")
    .option("-p, --password <password>", "Password")
    .action(LoginSection);

    program
    .command("logout")
    .description("Logout from the system")
    .action(LogoutSection);

    await AuthChecker()

    program
        .name(config.name)
        .version(config.version)
        .description(config.description)

    program
        .description('PGS CLI Helpers')
        .option("-h, --help", "Show help information")
        .option("-v, --ver", "Show help information")
        .option("-u, --user <user>", "User management")
        .action(CLIDefaultSection);

    program
        .command("create")
        .description("Create a new template")
        .option("-t, --template <template>", "Template name")
        .action(TemplatesSection);

    program.parse(process.argv);
}

PGSCli()

process.on('uncaughtException', (error) => {
    if (error instanceof Error && error.name === 'ExitPromptError') {
      //
    } else {}
  });