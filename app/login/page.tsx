// ==================================================================================================
// File: C:\dev\justdefenders\app\login\page.tsx
// Timestamp: 12 April 2026 18:50
// Purpose: Proper Supabase magic link handling (FIXES session missing issue)
// JustDefenders ©
// ==================================================================================================

'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// ----------------------------------------------------------------------------------------------
// INIT SUPABASE
// ----------------------------------------------------------------------------------------------

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ----------------------------------------------------------------------------------------------
// COMPONENT
// ----------------------------------------------------------------------------------------------

export default function Login() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

// ----------------------------------------------------------------------------------------------
// HANDLE AUTH CALLBACK (🔥 THIS FIXES YOUR ISSUE)
// ----------------------------------------------------------------------------------------------

  useEffect(() => {
    const handleAuthCallback = async () => {

      console.log("🔄 Processing auth callback...");

      // 🔥 THIS LINE IS THE KEY FIX
      const { data, error } = await supabase.auth.exchangeCodeForSession(
        window.location.href
      );

      console.log("🔐 SESSION EXCHANGE:", data, error);

      const { data: userData } = await supabase.auth.getUser();

      console.log("👤 USER AFTER EXCHANGE:", userData);

      if (userData?.user) {
        console.log("✅ LOGIN COMPLETE:", userData.user.email);

        // redirect after login
        window.location.href = '/';
      } else {
        console.log("❌ Still no session");
      }
    };

    handleAuthCallback();
  }, []);

// ----------------------------------------------------------------------------------------------
// LOGIN FUNCTION
// ----------------------------------------------------------------------------------------------

  const handleLogin = async () => {

    console.log("🚀 BUTTON CLICKED");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: 'http://localhost:3000/login' // 🔥 IMPORTANT
      }
    });

    if (error) {
      setStatus(error.message);
    } else {
      setStatus("Magic link sent — check email");
    }
  };

// ----------------------------------------------------------------------------------------------
// UI
// ----------------------------------------------------------------------------------------------

  return (
    <div style={{ padding: 40 }}>
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>
        Send Magic Link
      </button>

      <p>{status}</p>
    </div>
  );
}