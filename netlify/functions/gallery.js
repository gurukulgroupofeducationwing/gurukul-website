const https = require('https');

function cloudinaryRequest(cloudName, apiKey, apiSecret, path) {
  return new Promise((resolve, reject) => {
    const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
    const options = {
      hostname: 'api.cloudinary.com',
      path,
      method: 'GET',
      headers: { 'Authorization': `Basic ${auth}` }
    };
    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error('Invalid JSON: ' + data)); }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

exports.handler = async () => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Missing env vars' }) };
  }

  const categories = [
    { folder: 'annualday', cat: 'annualday', label: 'Annual Day 2022-23' },
    { folder: 'events',    cat: 'events',    label: 'Events' },
    { folder: 'sports',    cat: 'sports',    label: 'Sports' },
    { folder: 'campus',    cat: 'campus',    label: 'Campus' },
  ];

  const results = [];

  for (const { folder, cat, label } of categories) {
    try {
      const path = `/v1_1/${cloudName}/resources/image?asset_folder=${encodeURIComponent(folder)}&max_results=100`;
      const data = await cloudinaryRequest(cloudName, apiKey, apiSecret, path);
      (data.resources || []).forEach(r => {
        results.push({ url: r.secure_url, public_id: r.public_id, cat, label });
      });
    } catch (e) {
      console.error(`Failed fetching ${folder}:`, e.message);
    }
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=300'
    },
    body: JSON.stringify(results)
  };
};
