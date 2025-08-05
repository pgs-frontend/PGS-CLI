import chalk from 'chalk';
import figlet from 'figlet';
import gradient, {cristal, mind, teen} from 'gradient-string';
import config from './config.js';
import fs from 'fs';

export const pgsGradient = gradient(['#00B574', '#00A084', '#68E2B6'])

function startPGSCLI() {

const msg = figlet.textSync(`</> ${config.name}`, {
font: 'ANSI Shadow',
horizontalLayout: 'default',
verticalLayout: 'default',
});
    
console.log(pgsGradient('\n=====================================================================\n'));
console.log(pgsGradient(msg));
console.log(pgsGradient('=====================================================================\n'));
console.log(chalk.bold(mind(`Welcome to ${config.fullname} ${config.version} | Developer Tools 🚀\n`)));
console.log('PGS CLI – Project Generator System Quickly scaffold projects,\nfetch boilerplates, and access dev tools from your terminal');
console.log(('\n---------------------------------------------------------------------\n'));
}

function helpCommands() {
// console.log(chalk.bold(pgsGradient(`🌱 PGS Command Line Tool\n`)));
versionCommand();
console.log(('\n---------------------------------------------------------------------\n'));
console.log(chalk.bold(teen('- COMMANDS')));
console.log(`${chalk.gray('pgs login')}          Login to the system`);
console.log(`${chalk.gray('pgs logout')}         Logout from the system`);
console.log(`${chalk.gray('pgs create')}         Create a new project`);
console.log(`${chalk.gray('pgs -u create')}      Create a new user`);
console.log(`${chalk.gray('pgs -u delete')}      Delete a user`);
console.log(`${chalk.gray('pgs -v')}             Show version information`);
console.log(`${chalk.gray('pgs -h')}             Show help information`);
console.log(('\n---------------------------------------------------------------------\n'));
console.log(chalk.bold(teen('- Website')));
console.log(`${chalk.bold(config.website)}`);
console.log(('\n---------------------------------------------------------------------\n'));
console.log(chalk.bold(pgsGradient('- Author')));
console.log(`${chalk.bold(config.author)}`);
console.log(('\n---------------------------------------------------------------------\n'));

}

function versionCommand() {
    console.log(chalk.bold(teen('- VERSION')));
    console.log(chalk.bold(`${config.build} ${config.version}`));
}

export { helpCommands, versionCommand };
export default startPGSCLI;