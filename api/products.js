export default async function handler(req, res) {
  try {
    // 1. Access Token fetch karein (Server-side)
    const tokenRes = await fetch('https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: process.env.CJ_EMAIL,
        apiKey: process.env.CJ_API_KEY
      })
    });

    const tokenData = await tokenRes.json();
    const accessToken = tokenData?.data?.accessToken;

    if (!accessToken) {
      return res.status(400).json({ error: "Token fetch failed", details: tokenData });
    }

    // 2. Products fetch karein
    const productRes = await fetch('https://developers.cjdropshipping.com/api2.0/v1/product/list?pageSize=12&pageNum=1', {
      method: 'GET',
      headers: {
        'CJ-Access-Token': accessToken
      }
    });

    const productData = await productRes.json();
    return res.status(200).json(productData);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
