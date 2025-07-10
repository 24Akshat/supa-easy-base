import inquirer from 'inquirer';
import fs from 'fs';

export default async function init() {
  console.log('🔧 Supabase Project Initialization');

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'url',
      message: 'Enter your Supabase Project URL:',
      validate: input => input.startsWith('https://') || 'Must start with https://'
    },
    {
      type: 'input',
      name: 'anonKey',
      message: 'Enter your Supabase Anon/Public Key:',
      validate: input => input.length > 20 || 'Looks too short'
    }
  ]);

  const envContent = `SUPABASE_URL=${answers.url}
SUPABASE_ANON_KEY=${answers.anonKey}
`;

  fs.writeFileSync('.env', envContent);

  console.log('✅ .env file created with your Supabase credentials.');
}
