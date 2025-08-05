import ora from 'ora';
import fse from 'fs-extra';
import chalk from 'chalk';
import { morning, teen } from 'gradient-string';
import keytar from "keytar";
import cliAPI from './api.js';
import { select, input, password as passwordInput } from '@inquirer/prompts';
import { helpCommands, pgsGradient, versionCommand } from './start.js';
import { session } from '../index.js';
import TemplatesSection from './commands/templates.js';
import AccountSection from './commands/account.js';


async function AuthChecker() {
    const loader = ora({text: 'Connecting to PGS CLI...', color: 'green'}).start();
    try{
        const token = await keytar.getPassword('api', 'token')

        if(!token) throw {status: 401}

        cliAPI.defaults.headers.common['Authorization'] = `Bearer ${token}`

        const getUser = await cliAPI.get('/user')

        session.name = getUser.data?.data.name
        session.email = getUser.data?.data.email    
        session.job = getUser.data?.data.job
        session.company = getUser.data?.data.company

        loader.succeed('Connected to PGS CLI')
        console.log('\nHello ' + chalk.bold(morning(`${session.name}`)) + ", Let's get started! 🚀 \n");
        console.log(('---------------------------------------------------------------------\n'));

    }catch(error){
        if(error.status === 401) {
            loader.info('Login Required')
            console.log(chalk.bold(morning("\nLet's get started! 🚀 \n")));
            console.log(('---------------------------------------------------------------------\n'));
            await AuthSection()
        }
    }
}

async function AuthSection() {
    try{

        console.log(chalk.bold(pgsGradient("You need to login first to continue! \n")));

        const option = await select({
            message: chalk.bold.green('Login or Create an account to continue.'),
            choices: [
              {
                name: chalk.bold('Login'),
                value: 'login',
              },
              {
                name: chalk.bold('Create Account'),
                value: 'create',
              }
            ],
          });

          if(option === 'login') {
            await LoginSection()
          }else if(option === 'create') {
            await CreateUserSection()
          }
    }catch(error){
       process.exit(0)
    }finally{
        console.log(('\n---------------------------------------------------------------------\n'));
    }
}

async function LoginSection() {
    const loader = ora({text: 'Logging in...', color: 'green'})
    try{
        console.log(('\n---------------------------------------------------------------------\n'));
        console.log(chalk.bold(teen("🔑 Login in to your account \n")));

        const email = await input({
            message: chalk.bold.blue("Enter your email"),
            validate: (value) => {
                if (value.length === 0) {
                  return 'Please enter your email';
                }
                // Simple email regex validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                  return 'Please enter a valid email address';
                }
                return true;
              },
        })

        const password = await passwordInput({
            message: chalk.bold.blue("Enter your password"),
            mask: true,
            validate: (value) => {
                if (value.length === 0) {
                  return 'Please enter your password';
                }
                if(value.length < 8) {
                    return 'Password must be at least 8 characters long';
                }
                return true;
            },
        })

       loader.start();

        const login = await cliAPI.post('/login', {
            email,
            password
        })

        cliAPI.defaults.headers.common['Authorization'] = `Bearer ${login.data?.data.token}`

        await keytar.setPassword('api', 'token', login.data?.data.token)

        const getUser = await cliAPI.get('/user', {
            headers: {
                'Authorization': `Bearer ${login.data?.data.token}`
            }
        })
        
        session.name = getUser.data?.data.name
        session.email = getUser.data?.data.email
        session.job = getUser.data?.data.job
        session.company = getUser.data?.data.company

        loader.succeed('Logged in successfully')

        return true
    }catch(error){
        `\n${loader.fail(chalk.bold.red(error.response.data.error || error.message || 'Something went wrong'))}`
        console.log(('\n---------------------------------------------------------------------\n'));
        await AuthSection()
    }
}

async function CreateUserSection() {
    const loader = ora({text: 'Creating account...', color: 'green'})
    try{

        console.log(('\n---------------------------------------------------------------------'));
        console.log(chalk.bold(teen("\n🤖 Create an account \n")));

        const accessCode = await input({
            message: chalk.bold.blue("Enter your access code"),
            validate: (value) => {
                if (value.length === 0) {
                  return 'Please enter your access code';
                }
                return true;
            },
        })

        const name = await input({
            message: chalk.bold.blue("Enter your name"),
            validate: (value) => {
                if (value.length === 0) {
                  return 'Please enter your name';
                }
                return true;
            },
        })

        const email = await input({
            message: chalk.bold.blue("Enter your email"),
            validate: (value) => {
                if (value.length === 0) {
                  return 'Please enter your email';
                }
                // Simple email regex validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                  return 'Please enter a valid email address';
                }
                return true;
            },
        })

        const password = await passwordInput({
            message: chalk.bold.blue("Enter your password"),
            mask: true,
            validate: (value) => {
                if (value.length === 0) {
                  return 'Please enter your password';
                }
                if (value.length < 8) {
                  return 'Password must be at least 8 characters long';
                }
                if (!/[A-Z]/.test(value)) {
                  return 'Password must include at least one uppercase letter';
                }
                if (!/[a-z]/.test(value)) {
                  return 'Password must include at least one lowercase letter';
                }
                if (!/[0-9]/.test(value)) {
                  return 'Password must include at least one number';
                }
                if (!/[!@#$%^&*(),.?":{}|<>_\-\\[\];'/`~+=]/.test(value)) {
                  return 'Password must include at least one special character';
                }
                return true;
            },
        })

        const confirmPassword = await passwordInput({
            message: chalk.bold.blue("Confirm your password"),
            mask: true,
            validate: (value) => {
                if (value !== password) {
                    return 'Passwords do not match';
                }
                return true;
            },
        })

        const job = await select({
            message: chalk.bold.blue("Select your job"),
            choices: [
                {name: 'Frontend Developer', value: 'frontend_developer'},
                {name: 'Backend Developer', value: 'backend_developer'},
                {name: 'Fullstack Developer', value: 'fullstack_developer'},
                {name: 'Mobile Developer', value: 'mobile_developer'}, 
                {name: 'UI/UX Designer', value: 'ui_ux_designer'},
                {name: 'DevOps Engineer', value: 'devops_engineer'},
                {name: 'Database Administrator', value: 'database_administrator'},
                {name: 'System Administrator', value: 'system_administrator'},
            ]
        })

        const company = await input({
            message: chalk.bold.blue("Enter your company name"),
            default: 'PGS UAE',
            validate: (value) => {
                if (value.length === 0) {
                  return 'Please enter your company name';
                }
                return true;
            },
        })

        loader.start();
        
        const createUser = await cliAPI.post('/create/user', {
            accessCode,
            name,
            email,
            password,
            job,
            company
        })

        loader.succeed('Account created successfully')

        await LoginSection()
        return true

    }catch(error){
        loader.fail(error.response.data.error || error.message || 'Something went wrong')
        console.log(('\n---------------------------------------------------------------------\n'));
        await AuthSection()
    }
}

async function UpdateProfileSection() {
    try{

    }catch(error){
        console.log(error)
    }
}

async function LandingSection() {
    try{
        const option = await select({
            message: chalk.bold.green(pgsGradient('What do you want to do?')),
            choices: [
                {name: '🖥️ Templates', value: 'templates'},
                {name: '📚 Ebooks', value: 'ebooks'},
                {name: '⏯️ Tutorials', value: 'tutorials'},
                {name: '👤 My Account', value: 'my-account'},
                {name: '🛑 Exit', value: 'exit'},
            ]
        })

        switch(option){
            case 'templates':
                await TemplatesSection()
                break
            case 'ebooks':
                console.log(chalk.yellow.bold("Sorry, this feature is not available yet"))
                break
            case 'tutorials':
                console.log(chalk.yellow.bold("Sorry, this feature is not available yet"))
                break
            case 'my-account':
                await AccountSection()
                break
            case 'exit':
                process.exit(0)
                break
        }

    }catch(error){
        console.log(error)
    }
}

async function LogoutSection() {
    const loader = ora({text: 'Logging out...', color: 'green'})

    try{

        loader.start();

        await keytar.deletePassword('api', 'token')
        cliAPI.defaults.headers.common['Authorization'] = ''

        loader.succeed('Logged out successfully')
        console.log(('\n---------------------------------------------------------------------\n'));

        await AuthSection()

        // await LandingSection()

    }catch(error){
        console.log(error)
    }
}

async function CLIDefaultSection(option) {

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

export { AuthChecker, AuthSection, LoginSection, CreateUserSection, UpdateProfileSection, LandingSection, LogoutSection, CLIDefaultSection }