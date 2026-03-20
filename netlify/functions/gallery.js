const https = require('https');

function cloudinaryRequest(cloudName, apiKey, apiSecret, prefix) {
  return new Promise((resolve, reject) => {
    const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
    const path = `/v1_1/${cloudName}/resources/image?type=upload&prefix=${encodeURIComponent(prefix)}&max_results=100`;
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
    { prefix: 'gurukul/gallery/annualday/', cat: 'annualday', label: 'Annual Day 2022-23' },
    { prefix: 'gurukul/gallery/events/',    cat: 'events',    label: 'Events' },
    { prefix: 'gurukul/gallery/sports/',    cat: 'sports',    label: 'Sports' },
    { prefix: 'gurukul/gallery/campus/',    cat: 'campus',    label: 'Campus' },
  ];

  const results = [];
  const seen = new Set();

  for (const { prefix, cat, label } of categories) {
    try {
      const data = await cloudinaryRequest(cloudName, apiKey, apiSecret, prefix);
      (data.resources || []).forEach(r => {
        if (!seen.has(r.public_id)) {
          seen.add(r.public_id);
          results.push({ url: r.secure_url, public_id: r.public_id, cat, label });
        }
      });
    } catch (e) {
      console.error(`Failed fetching ${prefix}:`, e.message);
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
