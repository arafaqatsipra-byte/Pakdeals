export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Environment Variable se Key uthana
  const apiKey = process.env['Cj-api_key'];

  if (!apiKey) {
    return res.status(500).json({ error: 'API key is missing in environment variables.' });
  }

  try {
    // CJ API Request (Example: Products Fetching)
    const response = await fetch('https://developers.cjdropshipping.com/api2.0/v1/product/list', {
      method: 'GET',
      headers: {
        'CJ-Access-Token': apiKey,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
