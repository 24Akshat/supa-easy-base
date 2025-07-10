import React from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default function SignInButton() {
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
