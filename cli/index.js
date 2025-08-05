import { helpCommands, versionCommand } from "./start.js";
import chalk from "chalk";
import { LandingSection } from "./app.js";

async function CLICommands(option) {

    if(option.help) {
        helpCommands();
    }

    if(option.ver) {
       versionCommand()
    }

    if(option.user) {
       if(option.user === "create") {
       }
       if(option.user === "delete") {
       }else{
        console.log(chalk.red("Invalid command, use -h to see the help"));
       }
    }

  if (!option || Object.keys(option).length === 0) {
    await LandingSection()
  }

}

export default CLICommands;