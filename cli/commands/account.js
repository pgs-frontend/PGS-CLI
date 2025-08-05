import { select } from '@inquirer/prompts';
import { pgsGradient } from '../start.js';
import chalk from 'chalk';
import { morning } from 'gradient-string';
import { session } from '../../index.js';
import { LogoutSection } from '../app.js';
import { confirm } from '@inquirer/prompts';
import ora from 'ora'

export default async function AccountSection() {
    try{
        console.log(('\n---------------------------------------------------------------------\n'));
        const option = await select({
            message: "Manage your account : " + chalk.bold(morning(session.name)) + "\n",
            choices: [
                {name: '👤  Update Profile', value: 'update-profile'},
                {name: '🔐  Change Password', value: 'change-password'},
                {name: '🗑️  Delete Account', value: 'delete-account'},
                {name: '🔄  Logout', value: 'logout'},
            ]
        })

        switch(option){
            case 'update-profile':
                await UpdateProfileSection()
                break
            case 'change-password':
                await ChangePasswordSection()
                break
            case 'delete-account':
                await DeleteAccountSection()
                break
            case 'logout':
                await LogoutSection()
                break
        }

    }catch(error){
        console.log(error);
        process.exit(0);
    }
}

async function UpdateProfileSection() {
    console.log("Update Profile")
}

async function ChangePasswordSection() {
    console.log("Change Password")
}

async function DeleteAccountSection() {   
    try{

        const confirmDelete = await confirm({ message: 'Are you sure you want to delete your account?' }); 

        const loader = ora({text: 'Deleting account...', color: 'red'}).start();
        if(true){
            loader.succeed('Account deleted')
            await LogoutSection()
        }else{
            loader.fail('Account not deleted')
        }
    }catch(error){
        console.log(error);
    }
}

