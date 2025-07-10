import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function generateComponent(stack) {
  const stackMap = {
    mern: 'SignInButton.mern.jsx',
    next: 'SignInButton.next.jsx',
  };

  if (!stackMap[stack]) {
    console.error('❌ Invalid stack. Use "mern" or "next"');
    process.exit(1);
  }

  const templateFile = path.resolve(__dirname, `../templates/${stackMap[stack]}`);
  const targetDir = path.resolve(process.cwd(), 'components/supabase');
  const targetFile = path.join(targetDir, 'SignInButton.jsx');

  // Ensure directory exists
  fs.mkdirSync(targetDir, { recursive: true });

  // Copy template to target
  fs.copyFileSync(templateFile, targetFile);

  console.log(`✅ SignInButton component generated at: ${targetFile}`);

  console.log(`
📦 Now install Supabase SDK in your project:

For MERN:
  npm install @supabase/supabase-js

For Next.js (app router):
  npm install @supabase/auth-helpers-nextjs @supabase/supabase-js

📥 Then use the component like this:
  import SignInButton from './components/supabase/SignInButton';

  <SignInButton />

✅ That's it!
`);
}
