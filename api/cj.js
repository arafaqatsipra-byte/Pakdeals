export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const apiKey = process.env['CJ_API_KEY'];

  if (!apiKey) {
    return res.status(500).json({ error: 'API key missing in Vercel Environment Variables.' });
  }

  try {
    const response = await fetch('https://developers.cjdropshipping.com/api2.0/v1/product/list?pageSize=12&pageNum=1', {
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
