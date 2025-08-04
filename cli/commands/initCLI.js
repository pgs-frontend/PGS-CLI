import ora from 'ora';
import auth from './auth.js';
import { select, Separator } from '@inquirer/prompts';

async function initCLI() {
    try{

        const spinner = ora('Auth checking...').start();

        const token = await auth.getToken()

        if(!token) {
            spinner.fail('Auth check failed, please login first')
            await auth.login()
        }else{
            spinner.succeed('Authenticated')
        }

        console.log('')

        const answer = await select({
            message: 'Select an option',
            choices: [
              {
                name: 'Boilerplate',
                value: 'boilerplate',
                description: 'Create a new boilerplate',
              },
              {
                name: 'Create User',
                value: 'create-user',
                description: 'Create a new user',
              },
              {
                name: 'Update Profile',
                value: 'update-profile',
                description: 'Update your profile',
              },
              {
                name: 'Logout',
                value: 'logout',
                description: 'Logout from the system',
              },
            ],
        });

        console.log(answer)

    }catch(error){
        console.log(error);
        process.exit(0);
    }
}

export default initCLI;