'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function SignInButton() {
  const supabase = createClientComponentClient();

  const signInWithProvider = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) console.error('Error signing in:', error.message);
  };

  return (
    <div>
      <button onClick={() => signInWithProvider('google')}>
        Sign in with Google
      </button>
      <button onClick={() => signInWithProvider('github')}>
        Sign in with GitHub
      </button>
    </div>
  );
}
