const https = require('https');

function cloudinaryRequest(path, cloudName, apiKey, apiSecret) {
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
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.on('error', reject);
    req.end();
  });
}

exports.handler = async () => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  const categories = [
    { folder: 'gurukul/gallery/annualday', cat: 'annualday', label: 'Annual Day 2022-23' },
    { folder: 'gurukul/gallery/events',    cat: 'events',    label: 'Events' },
    { folder: 'gurukul/gallery/sports',    cat: 'sports',    label: 'Sports' },
    { folder: 'gurukul/gallery/campus',    cat: 'campus',    label: 'Campus' },
    { folder: 'gurukul/gallery',           cat: 'all',       label: 'General' },
  ];

  const results = [];

  for (const { folder, cat, label } of categories) {
    try {
      const data = await cloudinaryRequest(
        `/v1_1/${cloudName}/resources/image?type=upload&prefix=${encodeURIComponent(folder + '/')}&max_results=100`,
        cloudName, apiKey, apiSecret
      );
      if (data.resources) {
        data.resources.forEach(r => {
          if (!results.find(x => x.public_id === r.public_id)) {
            results.push({
              url: r.secure_url,
              public_id: r.public_id,
              cat: cat === 'all' ? 'general' : cat,
              label
            });
          }
        });
      }
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
