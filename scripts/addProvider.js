import inquirer from 'inquirer';
import dotenv from 'dotenv';
import open from 'open';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Always load .env from project root
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const PROVIDER_INFO = {
  google: {
    consoleUrl: 'https://console.cloud.google.com/apis/credentials',
    name: 'Google'
  },
  github: {
    consoleUrl: 'https://github.com/settings/developers',
    name: 'GitHub'
  }
};

export default async function addProvider(providerKey) {
  const provider = PROVIDER_INFO[providerKey];

  if (!provider) {
    console.error(`❌ Unsupported provider: ${providerKey}`);
    process.exit(1);
  }

  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;

  if (!SUPABASE_URL) {
    console.error('❌ Missing SUPABASE_URL in .env. Please run "init" first.');
    process.exit(1);
  }

  let serviceKey = SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceKey) {
    const { key } = await inquirer.prompt([
      {
        type: 'input',
        name: 'key',
        message: `
Enter your Supabase Service Role Key:

How to find it:
1. Open your Supabase Dashboard
2. Click "Project Settings" (⚙️ icon in sidebar)
3. Click "API"
4. Copy the "Service Role Key"

Paste it below:
`
      }
    ]);
    serviceKey = key;
    fs.appendFileSync(path.resolve(__dirname, '../.env'), `SUPABASE_SERVICE_ROLE_KEY=${serviceKey}\n`);
    console.log('✅ Saved Service Role Key to .env');
  }

  console.log(`
===============================================
🌐 Setting up ${provider.name} OAuth Provider

✅ Follow these exact steps in the browser page that will open:

1️⃣ Create a new ${provider.name === 'Google' ? 'OAuth Client ID (type: Web Application)' : 'OAuth App'}.

2️⃣ Set this **Authorized Redirect URI** exactly:
   👉 ${SUPABASE_URL}/auth/v1/callback

3️⃣ Copy the Client ID and Client Secret.

4️⃣ Return here and paste them below.
===============================================
`);

  await open(provider.consoleUrl);

  const credentials = await inquirer.prompt([
    {
      type: 'input',
      name: 'clientId',
      message: `Paste your ${provider.name} OAuth Client ID:`
    },
    {
      type: 'input',
      name: 'clientSecret',
      message: `Paste your ${provider.name} OAuth Client Secret:`
    }
  ]);

  // Save credentials to .env
  const envPath = path.resolve(__dirname, '../.env');
  fs.appendFileSync(
    envPath,
    `${provider.name.toUpperCase()}_CLIENT_ID=${credentials.clientId}\n${provider.name.toUpperCase()}_CLIENT_SECRET=${credentials.clientSecret}\n`
  );

  console.log(`
✅ Saved ${provider.name} Client ID and Secret to .env.

===============================================
🚀 Final Steps:

1️⃣ In the Supabase Dashboard, go to:
   https://app.supabase.com/project/YOUR_PROJECT_REF/auth/providers

2️⃣ Scroll to the "${provider.name}" provider section.

3️⃣ Paste the credentials you just saved in .env:
   - Client ID: ${credentials.clientId}
   - Client Secret: ${credentials.clientSecret}

4️⃣ Click "Enable" and "Save".

✅ Done! Your ${provider.name} OAuth setup is complete.
===============================================
  `);
}
