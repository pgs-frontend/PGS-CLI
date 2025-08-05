import ora from 'ora';
import fse from 'fs-extra';
import chalk from 'chalk';
import { morning } from 'gradient-string';
import keytar from "keytar";
import cliAPI from './api.js';

async function AuthChecker() {
    const loader = ora({text: 'Connecting to PGS CLI...', color: 'green'}).start();
    try{
        const token = await keytar.getPassword('api', 'token')

        if(!token) throw {status: 401}

        cliAPI.defaults.headers.common['Authorization'] = `Bearer ${token}`

        const getUser = await cliAPI.get('/user')

        const user = getUser.data?.data

        console.log(user)

        loader.succeed('Connected to PGS CLI')
        console.log('\nHello ' + chalk.bold(morning(`Alan Sha Salim`)) + ", Let's get started! 🚀 \n");
        console.log(('\n---------------------------------------------------------------------\n'));

    }catch(error){
        if(error.status === 401) {
            loader.info('Login Required')
            console.log(chalk.bold(morning("\nLet's get started! 🚀 \n")));
            console.log(('\n---------------------------------------------------------------------\n'));
        }
    }
}

async function AuthSection() {
    try{

    }catch(error){
        console.log(error)
    }
}

async function LoginSection() {
    try{

    }catch(error){
        console.log(error)
    }
}

async function CreateUserSection() {
    try{

    }catch(error){
        console.log(error)
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

    }catch(error){
        console.log(error)
    }
}

export { AuthChecker, AuthSection, LoginSection, CreateUserSection, UpdateProfileSection, LandingSection }