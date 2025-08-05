import fs from 'fs';

const config = JSON.parse(fs.readFileSync(process.cwd() + '/cli.json', 'utf8'));

export default config;