// api/admin-auth.js
// Vercel Serverless Function
// Set environment variables in Vercel dashboard:
//   ADMIN_USERNAME = your username
//   ADMIN_PASSWORD = your password

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const { username, password } = req.body;

  const correctUser = process.env.ADMIN_USERNAME;
  const correctPass = process.env.ADMIN_PASSWORD;

  if (!correctUser || !correctPass) {
    return res.status(500).json({ ok: false, error: 'Server not configured' });
  }

  if (username === correctUser && password === correctPass) {
    // Simple session token — timestamp + secret hash
    const token = Buffer.from(
      `${username}:${Date.now()}:${process.env.ADMIN_PASSWORD}`
    ).toString('base64');
    return res.status(200).json({ ok: true, token });
  }

  return res.status(401).json({ ok: false, error: 'Invalid credentials' });
}
