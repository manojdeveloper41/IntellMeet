(async ()=>{
  const ts = Date.now();
  const email = `smoke${ts}@example.com`;
  console.log('Using', email);
  const base = 'http://localhost:5050';

  const signupRes = await fetch(base + '/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Smoke Test', email, password: 'password123' }),
  });
  const signupJson = await signupRes.json();
  console.log('signup:', signupJson);

  const loginRes = await fetch(base + '/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password: 'password123' }),
  });
  const loginJson = await loginRes.json();
  console.log('login:', loginJson);

  const access = loginJson.accessToken;
  console.log('ACCESS:', access);

  const meRes = await fetch(base + '/api/auth/me', { headers: { Authorization: `Bearer ${access}` } });
  console.log('/api/auth/me:', await meRes.json());

  const updRes = await fetch(base + '/api/profile', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${access}` },
    body: JSON.stringify({ name: 'Smoke Updated' }),
  });
  console.log('/api/profile (update):', await updRes.json());

})();
