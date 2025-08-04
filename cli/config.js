import fs from 'fs';

const config = JSON.parse(fs.readFileSync('./cli.json', 'utf8'));

export default config;