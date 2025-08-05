import { helpCommands, versionCommand } from "./start.js";
import auth from "./commands/auth.js";
import chalk from "chalk";

async function CLICommands(option) {

    if(option.help) {
        helpCommands();
    }

    if(option.ver) {
       versionCommand()
    }

    if(option.user) {
       if(option.user === "create") {
        auth.create();
       }
       if(option.user === "delete") {
        auth.delete();
       }else{
        console.log(chalk.red("Invalid command, use -h to see the help"));
       }
    }

  if (!option || Object.keys(option).length === 0) {
  }

}

export default CLICommands;