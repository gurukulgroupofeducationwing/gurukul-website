# Gurukul Website — Content Update Guide

This guide covers how to update every part of the website without breaking anything.
The live site is at `gurukulgroup.in`. Always test on staging before pushing to main.

---

## Workflow for Any Change

```
1. Edit files locally (in the gurukul folder)
2. Push to staging branch
3. Test at staging--gurukulgroupofeducationwing.netlify.app
4. If good → open Pull Request from staging to main → merge
5. Live site updates automatically
```

Terminal commands:
```bash
git checkout staging
# make your changes
git add <files>
git commit -m "describe what you changed"
git push origin staging
# test on staging URL, then open PR on GitHub
```

---

## 1. Hero Slider (Home Page Banner Images)

**To add a new banner image:**
1. Go to [cloudinary.com](https://cloudinary.com) → Media Library → `gurukul/banners` folder
2. Upload your image (recommended size: 1728×864px, JPG)
3. Select the uploaded image → click the edit/tag icon → **Edit Tags**
4. Add tag: `hero-banner` → Save
5. The image appears in the slider automatically. No code changes needed.

**To remove a banner image:**
1. Go to Cloudinary → find the image
2. Remove the `hero-banner` tag (or delete the image)
3. It disappears from the slider automatically.

**Recommended banner image specs:**
- Size: 1728×864px or 1280×640px
- Format: JPG
- Keep file size under 300KB for fast loading

---

## 2. Gallery Page

### Adding images to an existing category

1. Go to Cloudinary → Media Library → `gurukul/gallery/` → open the correct subfolder
2. Upload your images
3. Select all new images → **Edit Tags** → add the correct tag:
   - Annual Day photos: `gallery-annualday`
   - Events photos: `gallery-events`
   - Sports photos: `gallery-sports`
   - Campus photos: `gallery-campus`
4. Save. Images appear in the gallery automatically.

### Adding a completely new category

This requires a small code change:

**Step 1 — Tag images in Cloudinary**
Upload images and add a new tag like `gallery-sports2024`.

**Step 2 — Update `netlify/functions/gallery.js`**
Add one line to the `categories` array:
```js
{ tag: 'gallery-sports2024', cat: 'sports2024', label: 'Sports 2024' },
```

The filter button on the gallery page appears automatically. No HTML changes needed.

**Step 3 — Push to staging, test, merge to main.**

---

## 3. Staff Page

File: `pages/staff.html`

Each staff card follows this structure:
```html
<div class="staff-card">
  <div class="staff-photo">
    <img src="CLOUDINARY_URL" alt="Staff Name">
  </div>
  <div class="staff-info">
    <h4>Staff Name</h4>
    <p class="staff-role">Subject / Role</p>
    <p class="staff-qual">Qualification</p>
  </div>
</div>
```

**To add a new staff member:**
1. Upload their photo to Cloudinary → `gurukul/persons` folder
2. Copy the image URL from Cloudinary
3. Add a new `staff-card` block in `pages/staff.html`
4. Push to staging, test, merge to main

**To remove a staff member:**
Delete their `staff-card` block from the HTML.

---

## 4. Toppers / Achievements

File: `pages/achievements.html`

Each topper card:
```html
<div class="topper-card">
  <div class="topper-photo">
    <img src="CLOUDINARY_URL" alt="Student Name">
  </div>
  <div class="topper-pct">97.4%</div>
  <h5>Student Name</h5>
  <p>Class XII · 2024</p>
</div>
```

Upload topper photos to Cloudinary → `gurukul/toppers2024` folder, copy the URL, update the HTML.

---

## 5. Notice Board / Events

File: `pages/events.html`

The notice board section has a list of announcements. Each item:
```html
<div class="notice-item">
  <div class="notice-date">15 Mar 2025</div>
  <div class="notice-text">
    <strong>Title of Notice</strong>
    <p>Details here.</p>
  </div>
</div>
```

Add new notices at the top of the list. Remove old ones by deleting their block.

---

## 6. Admission Form / Prospectus (PDF files)

Files are stored in Cloudinary → `gurukul/files` folder.

Current files:
- `PROSPECTUS_shtol1.pdf`
- `Admission_20form_oet9xg.pdf`

**To replace a PDF:**
1. Upload the new PDF to Cloudinary → `gurukul/files`
2. Copy the new URL
3. Search the codebase for the old URL and replace it with the new one
4. Files to check: `pages/admission.html`, `pages/procedure.html`

---

## 7. Contact Details (Phone, Email, Address)

Contact details appear in two places:

**Topbar (every page)** — File: `js/layout.js`
Find this section near the top and update:
```js
<span>&#128222; +91 XXXXXXXXXX / XXXXXXXXXX</span>
<span>&#128231; youremail@gmail.com</span>
```

**Contact page** — File: `pages/contact.html`
Update the address, phone, and email in the contact details section.

After updating `layout.js`, the topbar changes on every page automatically.

---

## 8. Principal's / Founder's Message

Files: `pages/principals-message.html`, `pages/founders-message.html`

Open the file and edit the text directly inside the `<p>` and `<blockquote>` tags.
To update the photo, upload a new image to Cloudinary → `gurukul/gurukul` folder and replace the `src` URL.

---

## 9. Academic Calendar

File: `pages/calendar.html`

The calendar is an HTML table. Each row is one event:
```html
<tr>
  <td>April 2025</td>
  <td>School Reopens</td>
  <td>Academic</td>
</tr>
```

Add, edit, or delete rows as needed.

---

## 10. Infrastructure / Hostel Pages

Files: `pages/infrastructure.html`, `pages/hostel.html`

Images are loaded directly from Cloudinary URLs in the HTML. To update:
1. Upload new photos to Cloudinary → `gurukul/infrastructure` folder
2. Copy the URL
3. Replace the `src` attribute in the relevant `<img>` tag

---

## Cloudinary Quick Reference

**Cloud name:** `dsfgnnpho`
**Media Library URL:** `console.cloudinary.com`

| Folder | Contents |
|--------|----------|
| `gurukul/banners` | Hero slider images — tag with `hero-banner` |
| `gurukul/gallery/annualday` | Annual day photos — tag with `gallery-annualday` |
| `gurukul/gallery/events` | Events photos — tag with `gallery-events` |
| `gurukul/gallery/sports` | Sports photos — tag with `gallery-sports` |
| `gurukul/gallery/campus` | Campus photos — tag with `gallery-campus` |
| `gurukul/gurukul` | Logo, principal, director photos |
| `gurukul/persons` | Staff photos |
| `gurukul/toppers2024` | Topper photos |
| `gurukul/infrastructure` | Lab and facility photos |
| `gurukul/files` | PDFs (prospectus, admission form) |

---

## Branch and Deploy Reference

| Branch | URL | Purpose |
|--------|-----|---------|
| `staging` | `staging--gurukulgroupofeducationwing.netlify.app` | Test changes here first |
| `main` | `gurukulgroup.in` | Live site — only merge after testing |

Never push directly to `main`. Always go through `staging` first.

---

## Things That Need Code Changes

These cannot be updated from Cloudinary alone:

| What | File to edit |
|------|-------------|
| Phone / email in topbar | `js/layout.js` |
| Navigation menu links | `js/layout.js` |
| Footer content | `js/layout.js` |
| Adding a new gallery category | `netlify/functions/gallery.js` |
| Page text content | The relevant HTML file in `pages/` |
| Academic calendar entries | `pages/calendar.html` |
| Notice board entries | `pages/events.html` |
