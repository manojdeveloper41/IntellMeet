(async ()=>{
  const fs = require('fs');
  const path = require('path');
  const fetch = global.fetch;

  const ts = Date.now();
  const email = `avatar${ts}@example.com`;
  const base = 'http://localhost:5050';

  // small 1x1 PNG (red) base64
  const pngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=';
  const imgPath = path.join('/tmp', `avatar-${ts}.png`);
  fs.writeFileSync(imgPath, Buffer.from(pngBase64, 'base64'));
  console.log('Wrote test image to', imgPath);

  const signupRes = await fetch(base + '/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Avatar Test', email, password: 'password123' }),
  });
  const signupJson = await signupRes.json();
  console.log('signup:', signupJson && signupJson.user ? 'ok' : signupJson);

  const loginRes = await fetch(base + '/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password: 'password123' }),
  });
  const loginJson = await loginRes.json();
  console.log('login:', loginJson && loginJson.user ? 'ok' : loginJson);

  const access = loginJson.accessToken;
  if (!access) {
    console.error('No access token, aborting');
    process.exit(1);
  }

  // Upload using FormData + Blob
  const buffer = fs.readFileSync(imgPath);
  const form = new (globalThis.FormData)();
  const blob = new Blob([buffer], { type: 'image/png' });
  form.append('avatar', blob, 'avatar.png');

  const uploadRes = await fetch(base + '/api/profile/avatar', {
    method: 'POST',
    headers: { Authorization: `Bearer ${access}` },
    body: form,
  });

  const uploadJson = await uploadRes.json();
  console.log('upload response:', uploadJson);

})();
