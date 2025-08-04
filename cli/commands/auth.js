import chalk from 'chalk';
import fs from 'fs';
import { input, password as passwordPrompt } from '@inquirer/prompts';
import ora from 'ora';
import cliAPI from '../api.js';

const auth = {
    create: async () => {
        try{
            console.log("Create a new user");
        }catch(error){
            console.log(error);
            process.exit(0);
        }
    },
    delete: async () => {
        try{
            console.log("Delete a user");
        }catch(error){
            console.log(error);
            process.exit(0);
        }
    },
    login: async (option) => {
        const data = {}
        try{
            console.log(chalk.bold('\n🔐 Login to your Account\n'));
            if(option?.email) {
                data.email = option.email
            }else{
                let email = await input({ message: chalk.bold.green('Enter your email') });
                data.email = email
            }
            if(option?.password) {
                data.password = option.password
            }else{
                const password = await passwordPrompt({ message: chalk.bold.green('Enter your password') });
                data.password = password
            }
            console.log('')
            const spinner = ora('Logging in...').start();

            setTimeout(() => {
                spinner.succeed('Logged in successfully');
            }, 2000)
            return true
        }catch(error){
            console.log(error);
            process.exit(0)
        }
    },
    logout: async () => {
        try{
            const spinner = ora('Logging out...').start();
            const tokenExists = fs.existsSync('.pgscli.cred')
            const deleteToekn = tokenExists ? fs.unlinkSync('.pgscli.cred') : true
            cliAPI.defaults.headers.common['Authorization'] = null
            if(deleteToekn) {
                spinner.succeed('Logged out successfully');
            }else{
                spinner.fail('Failed to logout');
            }

            return true
        }catch(error){
            console.log(error);
            process.exit(0);
        }
    },
    getToken: async () => {
        try{
            const credentials = fs.existsSync('.pgscli.cred')
            if(!credentials) return false
            const token = fs.readFileSync('.pgscli.cred', 'utf8')
            return token;
        }catch(error){
            console.log(error);
            process.exit(0);
        }
    },
    initAuth: async () => {
        try{
            const spinner = ora('Authenticating to PGS CLI...').start();
            const credentials = fs.existsSync('.pgscli.cred')

            if(!credentials || credentials?.length === 0) {
                await auth.login()
            }
            
            const token = fs.readFileSync('.pgscli.cred', 'utf8')
            cliAPI.defaults.headers.common['Authorization'] = `Bearer ${token}`
            spinner.succeed('Authenticated to PGS CLI');

        }catch(error){
            console.log(error);
        }finally{
            return true
        }
    }
}

export default auth;