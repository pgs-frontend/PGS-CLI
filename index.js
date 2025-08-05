#!/usr/bin/env node

import { Command } from "commander";
import startPGSCLI from './cli/start.js';
import CLICommands from "./cli/index.js";
import config from "./cli/config.js";
import auth from "./cli/commands/auth.js";
import createTemplate from "./cli/commands/create.js";
import {AuthChecker} from "./cli/app.js";

const program = new Command();

async function PGSCli(){

    startPGSCLI()

    program
    .command("login")
    .description("Login to the system")
    .option("-e, --email <email>", "Email")
    .option("-p, --password <password>", "Password")
    .action(auth.login);

    program
    .command("logout")
    .action(auth.logout);

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
        .action(CLICommands);

    program
        .command("create")
        .description("Create a new template")
        .option("-t, --template <template>", "Template name")
        .action(createTemplate);

    program.parse(process.argv);
}

PGSCli()