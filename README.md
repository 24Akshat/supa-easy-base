<h1 align="center">
  ⚡️ supa-easy-base
</h1>

<p align="center">
  🚀 A CLI to set up Supabase Auth with Google & GitHub OAuth, plus ready-made Sign-In components for MERN & Next.js.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/supa-easy-base">
    <img src="https://img.shields.io/npm/v/supa-easy-base?color=blue" alt="npm version" />
  </a>
  <a href="https://github.com/YOUR-USERNAME/supa-easy-base/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg" alt="license" />
  </a>
</p>

---

## ✨ What is this?

**supa-easy-base** is a CLI tool that automates your Supabase Auth workflow:

✅ Initializes Supabase project credentials  
✅ Configures OAuth providers step by step (Google & GitHub)  
✅ Generates ready-to-use Sign-In components  
✅ Works with **MERN** and **Next.js**

No boilerplate. No guesswork. Just fast setup.

---

## 🚀 Installation

**Using `npx`:**

```bash
npx supa-easy-base
```

Or install globally:

```bash
npm install -g supa-easy-base
```

---

## 💻 Quick Start

Below is the complete workflow:

---

### 1️⃣ Initialize your project

```bash
npx supa-easy-base
```

**You will be prompted to enter:**
- Supabase Project URL
- Supabase Anon/Public Key

✅ This creates a `.env` file:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

---

### 2️⃣ Add an OAuth Provider

Supported providers:
- `google`
- `github`

**Example:**

```bash
npx supa-easy-base add-provider google
```

**What happens:**
✅ Prompts for your Supabase Service Role Key (with instructions)  
✅ Opens the OAuth console for setup  
✅ Walks you through:

```
1. Create a new OAuth Client ID
2. Set Authorized Redirect URI:
   https://your-project.supabase.co/auth/v1/callback
3. Paste Client ID and Secret into terminal
```

✅ Supabase Auth is now ready.

---

### 3️⃣ Generate Sign-In Components

Use prebuilt components for MERN or Next.js.

**MERN:**

```bash
npx supa-easy-base generate-component mern
```

**Next.js:**

```bash
npx supa-easy-base generate-component next
```

✅ This creates:

```
components/supabase/SignInButton.jsx
```

---

## ✨ Example Usage

### MERN

1️⃣ Install Supabase SDK:

```bash
npm install @supabase/supabase-js
```

2️⃣ Create `.env`:

```
REACT_APP_SUPABASE_URL=...
REACT_APP_SUPABASE_ANON_KEY=...
```

3️⃣ Use your button:

```jsx
import SignInButton from './components/supabase/SignInButton';

function App() {
  return (
    <SignInButton />
  );
}
```

---

### Next.js

1️⃣ Install packages:

```bash
npm install @supabase/auth-helpers-nextjs @supabase/supabase-js
```

2️⃣ Create `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

3️⃣ Use your button:

```jsx
import SignInButton from './components/supabase/SignInButton';

export default function Page() {
  return <SignInButton />;
}
```

✅ Clicking the button starts the OAuth flow.

---

## 🛠 Commands Summary

| Command                                      | What it does                                  |
|----------------------------------------------|-----------------------------------------------|
| `npx supa-easy-base`                         | Initialize project credentials               |
| `npx supa-easy-base add-provider [provider]`| Add OAuth provider (google or github)        |
| `npx supa-easy-base generate-component [mern|next]` | Generate Sign-In component            |

---

## 🛡 Requirements

- Node.js >= 16
- A Supabase project

---

## 🗺 Roadmap

- [ ] Support for more providers (Facebook, Twitter, etc.)
- [ ] Auto-generate backend API routes
- [ ] VS Code extension for one-click setup

---

## 📄 License

MIT

---

## ✨ Author

Made with ❤️ by **Akshat Gupta**

---
