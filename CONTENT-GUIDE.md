# Gurukul Website — Content Update Guide

This guide covers how to update every part of the website without breaking anything.
The live site is at `gurukulgroup.in`. Always test on staging before pushing to main.

---

## Workflow for Any Change

```
1. Edit files locally (in the gurukul folder)
2. Push to staging branch
3. Test at the Vercel staging preview URL
4. If good → open Pull Request from staging to main → merge
5. Live site at gurukulgroup.in updates automatically
```

Terminal commands:
```bash
git checkout staging
# make your changes
git add <files>
git commit -m "describe what you changed"
git push origin staging
# test on Vercel preview URL, then open PR on GitHub
```

To find your staging preview URL: Vercel dashboard → Deployments → click the latest staging deploy → Visit.

---

## 1. Hero Slider (Home Page Banner Images)

**To add a new banner image:**
1. Go to cloudinary.com → Media Library → gurukul/banners folder
2. Upload your image (recommended size: 1728x864px, JPG)
3. Select the uploaded image → Edit Tags → add tag: hero-banner → Save
4. The image appears in the slider automatically. No code changes needed.

**To remove a banner image:**
1. Go to Cloudinary → find the image
2. Remove the hero-banner tag or delete the image
3. It disappears from the slider automatically.

Recommended banner image specs:
- Size: 1728x864px or 1280x640px
- Format: JPG
- Keep file size under 300KB for fast loading

---

## 2. Gallery Page

### Adding images to an existing category

1. Go to Cloudinary → Media Library → gurukul/gallery/ → open the correct subfolder
2. Upload your images
3. Select all new images → Edit Tags → add the correct tag:
   - Annual Day photos: gallery-annualday
   - Events photos: gallery-events
   - Sports photos: gallery-sports
   - Campus photos: gallery-campus
4. Save. Images appear in the gallery automatically. No code changes needed.

### Adding a completely new category

This requires a small code change:

Step 1 — Tag images in Cloudinary
Upload images and add a new tag like gallery-sports2024.

Step 2 — Update api/gallery.js
Add one line to the categories array:
{ tag: 'gallery-sports2024', cat: 'sports2024', label: 'Sports 2024' },

The filter button on the gallery page appears automatically. No HTML changes needed.

Step 3 — Push to staging, test, merge to main.

---

## 3. Hero Notice Bar (Home Page)

File: index.html

Find this line and update the text:
Admissions open text is inside the notice-bar div.

---

## 4. Staff Page

File: pages/staff.html

Each staff card structure:
- Upload photo to Cloudinary gurukul/persons folder
- Copy image URL
- Add a new staff-card block in pages/staff.html
- Push to staging, test, merge to main

To remove a staff member: delete their staff-card block from the HTML.

---

## 5. Toppers / Achievements

File: pages/achievements.html

Upload topper photos to Cloudinary gurukul/toppers2024 folder, copy the URL, update the HTML.

---

## 6. Notice Board / Events

File: pages/events.html

Add new notices at the top of the list. Remove old ones by deleting their block.

---

## 7. Admission Form / Prospectus (PDF files)

Current Cloudinary URLs:
- Prospectus: https://res.cloudinary.com/dsfgnnpho/image/upload/v1774780911/Prospectus_zc6pkr.pdf
- Admission Form: https://res.cloudinary.com/dsfgnnpho/image/upload/v1773927411/Admission_20form_oet9xg.pdf

To replace a PDF:
1. Upload the new PDF to Cloudinary → gurukul/files folder
2. Copy the new Cloudinary URL
3. Search the repo for the old URL and replace it
4. Files to check: pages/admission.html, pages/procedure.html, index.html

---

## 8. MPD Page Documents

File: pages/disclosure.html

Current Cloudinary PDF links:
- Affiliation Letter: v1774780805/AFFILIATION_Extension_Letter_qlmjtt.pdf
- Trust/Society Certificate: v1774780806/Trust__Society_Certificate_o1oa72.pdf
- NOC: v1774780806/NOC_from_STate_Govt_d1bfmg.pdf
- Recognition Certificate: v1774780813/Recognition_Certificate_Under_RTE_ndrp1s.pdf
- Building Safety Certificate: v1774780808/Building_Safety_Certificate_efts0x.pdf
- Fire Safety Certificate: v1774780807/Fire_Safety_Certificate_ipa6ds.pdf
- DEO Certificate: v1774780808/DEO_Certificate_meiejc.pdf
- Water, Health and Sanitation: v1774780813/Water_health_sanitation_l5enw6.pdf
- Fee Structure: v1774780809/Fee_Structure_ed34gp.pdf

Still need Cloudinary links for: Academic Calendar, List of SMC, PTA Details, Result Summary, SARAS 4.0

---

## 9. Contact Details (Phone, Email, Address)

Topbar (every page) — File: js/layout.js
Contact page — File: pages/contact.html

After updating layout.js, the topbar changes on every page automatically.

---

## 10. Principal's / Founder's Message

Files: pages/principals-message.html, pages/founders-message.html

Edit text inside the p and blockquote tags.
To update the photo, upload to Cloudinary gurukul/gurukul folder and replace the src URL.

---

## 11. Academic Calendar

File: pages/calendar.html

Add, edit, or delete rows in the HTML table as needed.

---

## 12. Infrastructure / Hostel Pages

Files: pages/infrastructure.html, pages/hostel.html

Upload new photos to Cloudinary gurukul/infrastructure folder, copy URL, replace src in the img tag.

---

## Cloudinary Quick Reference

Cloud name: dsfgnnpho
Media Library URL: console.cloudinary.com

| Folder | Contents |
|--------|----------|
| gurukul/banners | Hero slider images — tag with hero-banner |
| gurukul/gallery/annualday | Annual day photos — tag with gallery-annualday |
| gurukul/gallery/events | Events photos — tag with gallery-events |
| gurukul/gallery/sports | Sports photos — tag with gallery-sports |
| gurukul/gallery/campus | Campus photos — tag with gallery-campus |
| gurukul/gurukul | Logo, principal, director photos |
| gurukul/persons | Staff photos |
| gurukul/toppers2024 | Topper photos |
| gurukul/infrastructure | Lab and facility photos |
| gurukul/files | PDFs (prospectus, admission form, certificates) |

---

## Branch and Deploy Reference

| Branch | Purpose |
|--------|---------|
| staging | Test changes here first — deploys to Vercel preview URL |
| main | Live site at gurukulgroup.in — only merge after testing |

Never push directly to main. Always go through staging first.

Hosting: Vercel
Functions: api/gallery.js and api/hero.js
Domain registrar: GoDaddy (nameservers pointing to Vercel: ns1.vercel-dns.com, ns2.vercel-dns.com)

---

## Things That Need Code Changes

| What | File to edit |
|------|-------------|
| Phone / email in topbar | js/layout.js |
| Navigation menu links | js/layout.js |
| Footer content | js/layout.js |
| Hero notice bar text | index.html |
| Adding a new gallery category | api/gallery.js |
| Page text content | The relevant HTML file in pages/ |
| Academic calendar entries | pages/calendar.html |
| Notice board entries | pages/events.html |
| MPD document links | pages/disclosure.html |
