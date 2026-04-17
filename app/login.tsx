'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// JustDefenders ©
// File: C:\dev\justdefenders\app\login.tsx
// Timestamp: 12 April 2026 14:40
// Purpose: Login page with Supabase magic link + debug output

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Login() {
const [email, setEmail] = useState('');
const [status, setStatus] = useState('');

const handleLogin = async () => {
setStatus('Sending...');

```
const { data, error } = await supabase.auth.signInWithOtp({
  email,
  options: {
    emailRedirectTo: 'http://localhost:8081'
  }
});

console.log("AUTH RESULT:", { data, error });

if (error) {
  setStatus('Error: ' + error.message);
  alert(error.message);
} else {
  setStatus('Magic link requested — check email');
}
```

};

return (
<div style={{ padding: 40 }}> <h1>Login</h1>

```
  <input
    type="email"
    placeholder="Enter email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    style={{ padding: 10, width: 300 }}
  />

  <br /><br />

  <button onClick={handleLogin} style={{ padding: 10 }}>
    Send Magic Link
  </button>

  <p>{status}</p>
</div>
```

);
}
