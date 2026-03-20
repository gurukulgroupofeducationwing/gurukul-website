const https = require('https');

function cloudinaryRequest(cloudName, apiKey, apiSecret, prefix) {
  return new Promise((resolve, reject) => {
    const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
    const path = `/v1_1/${cloudName}/resources/image?type=upload&prefix=${prefix}&max_results=20`;
    console.log('Requesting:', `https://api.cloudinary.com${path}`);
    const options = {
      hostname: 'api.cloudinary.com',
      path,
      method: 'GET',
      headers: { 'Authorization': `Basic ${auth}` }
    };
    const req = https.request(options, res => {
      let data = '';
      console.log('Response status:', res.statusCode);
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log('Response body:', data.substring(0, 300));
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error('Invalid JSON: ' + data)); }
      });
    });
    req.on('error', e => {
      console.error('Request error:', e.message);
      reject(e);
    });
    req.end();
  });
}

exports.handler = async () => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  console.log('Cloud name:', cloudName);
  console.log('API key present:', !!apiKey);
  console.log('API secret present:', !!apiSecret);

  if (!cloudName || !apiKey || !apiSecret) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Missing env vars' }) };
  }

  try {
    const data = await cloudinaryRequest(cloudName, apiKey, apiSecret, 'gurukul/banners/');
    console.log('Resources found:', data.resources?.length || 0);
    const images = (data.resources || []).map(r => ({ url: r.secure_url, public_id: r.public_id }));
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'public, max-age=300' },
      body: JSON.stringify(images)
    };
  } catch (e) {
    console.error('Handler error:', e.message);
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
