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

const ANNUAL_DAY_IDS = new Set([
  '319198740_880603143122873_9065863911290292844_n_jasun0_g4j2bm',
  '319279049_876553286804407_1134803563494000727_n_x3i4iv_nyncd1',
  '320939118_917197896320829_5413228705354113457_n_e10lgl_j2ls8k',
  '320743081_856703712305977_9047804523845030779_n_pstfkl_ykplfl',
  '320567470_839945713879681_5695204885911194873_n_rionrh_xahiib',
  '320764868_1258519004709721_1216194572544851073_n_fjaugo_j9hk6r',
  '320383089_524495669605498_5010522661448928819_n_as2i6h_zywijw',
  '320444081_670660401397032_6672830741023371619_n_uepy8p_cesltq',
  '320447891_540139528022017_5961710052113965276_n_egcu4z_zs9u8n',
  '320265235_855985992381385_6096539664081696224_n_zmzlne_quxkg9',
  '320410407_701150534915065_3952782130309275383_n_iyt3f6_jwwfm3',
  '320709790_825213952039973_245988699067263799_n_kpwyvv_jnw3xq',
  '320691716_660919512476237_1058115201519476356_n_xikqtd_l3e476',
  '320743081_856703712305977_9047804523845030779_n_sc8nbu_b3ize3',
  '320212798_474316794785676_7935323957723332841_n_ip4zkk_rvvoum',
  '320698360_689385592812016_5694098737924098421_n_el8lfy_mzlxdq',
  '320075330_518154636929184_1822554983112385745_n_ztpsxo_qtmeue',
  '319729483_1808030379570671_8164970800489319362_n_jbcjv8_om2vms',
  '320728451_1333618314073564_8941264738793842874_n_udd3nd_wxbt37',
  '320562412_677998964113857_1462106803551549634_n_folbks_oygkqn',
  '320819396_1003655600475934_1523819978700135324_n_zkggva_te6fin',
  '320766792_3025961734372096_3815229438331209684_n_x7ycwc_mceab4',
  '320378348_889895425341227_2207355818422927836_n_aiwyd9_ca6rjt',
  '320694183_5768723819879817_2722672393492552768_n_vjkgu8_oawsdd',
  '320933261_1295485454354182_8634754613841213729_n_yxtzhj_r3lstu',
  '320274669_5154890081279113_1870422072081869895_n_opw36i_acqaqr',
  '320443052_823841272036818_5348663827431612302_n_y8sou9_yyabwa',
  '320559262_686534859723217_1202588319570989780_n_yro9ks_jhlsqq',
]);

const EVENTS_IDS = new Set([
  'nov2023_2_fmlfav_elpfkl',
  'nov2023_3_g8sahu_ad53by',
  'nov2023_4_yrgcps_wiqzue',
  'nov2023_5_juroch_qmwhsq',
  'nov2023_6_qtducp_cofvqa',
  'nov2023_7_g3vfiv_kd14rl',
  'nov2023_8_szn0vg_oubxyv',
]);

const SPORTS_IDS = new Set([
  'sports_hzvo5q_f0rb8g',
  'yoga_ycrytu_w1s6xx',
  'sports_hzvo5q',
  'yoga_ycrytu',
]);

const CAMPUS_IDS = new Set([
  'computerlab_qer4e5_ng86fw',
  'libraries_smsz4c_acakkx',
  'computerlab_qer4e5',
  'libraries_smsz4c',
  'chemlab_mvcqk0',
  'biolab_sg9gwx',
  'physicslabitems_wbfbr0',
  'laboratories_bskfmd',
]);

function categorize(public_id) {
  if (ANNUAL_DAY_IDS.has(public_id)) return { cat: 'annualday', label: 'Annual Day 2022-23' };
  if (EVENTS_IDS.has(public_id)) return { cat: 'events', label: 'Events' };
  if (SPORTS_IDS.has(public_id)) return { cat: 'sports', label: 'Sports' };
  if (CAMPUS_IDS.has(public_id)) return { cat: 'campus', label: 'Campus' };
  return null;
}

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
    const results = [];

    (data.resources || []).forEach(r => {
      const match = categorize(r.public_id);
      if (match) {
        results.push({ url: r.secure_url, public_id: r.public_id, cat: match.cat, label: match.label });
      }
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300'
      },
      body: JSON.stringify(results)
    };
  } catch (e) {
    console.error('Handler error:', e.message);
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
