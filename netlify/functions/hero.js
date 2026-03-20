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

const BANNER_IDS = new Set([
  'banner1_o61h0v',
  'schoolawardbanner_tga7ln',
  'admissionbanner2023_rsnvxt',
  'excellence_cjgvpg',
]);

exports.handler = async () => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Missing env vars' }) };
  }

  try {
    const path = `/v1_1/${cloudName}/resources/image?type=upload&max_results=500`;
    const data = await cloudinaryRequest(cloudName, apiKey, apiSecret, path);
    const images = (data.resources || [])
      .filter(r => BANNER_IDS.has(r.public_id))
      .map(r => ({ url: r.secure_url, public_id: r.public_id }));

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300'
      },
      body: JSON.stringify(images)
    };
  } catch (e) {
    console.error('Handler error:', e.message);
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
