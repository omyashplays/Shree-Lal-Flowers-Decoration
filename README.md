# Shree Lal Flowers & Decoration — Website

A mobile-first website for Shree Lal Flowers & Decoration, a flower decoration business in Ranchi, Jharkhand.

## 📁 File Structure

```
Shri Lal Flower/
├── index.html          ← Home page
├── services.html       ← Services page
├── gallery.html        ← Gallery page with photo filters
├── about.html          ← About & Contact page
├── css/
│   └── style.css       ← All styles
├── js/
│   └── script.js       ← All JavaScript
├── images/
│   ├── logo.png        ← Your shop logo (replace this!)
│   ├── hero-home.jpg   ← Home page hero image
│   ├── hero-services.jpg
│   ├── hero-gallery.jpg
│   ├── hero-about.jpg
│   ├── service-car.jpg
│   ├── service-home.jpg
│   ├── service-event.jpg
│   ├── service-mala.jpg
│   ├── about-shop.jpg
│   └── gallery/
│       ├── car-1.jpg, car-2.jpg, car-3.jpg, car-4.jpg
│       ├── home-1.jpg, home-2.jpg, home-3.jpg, home-4.jpg
│       ├── event-1.jpg, event-2.jpg, event-3.jpg, event-4.jpg
│       └── mala-1.jpg, mala-2.jpg, mala-3.jpg, mala-4.jpg
└── README.md           ← This file
```

## ✏️ How to Edit (Simple Steps)

### Change Phone Number and WhatsApp Number
Open `js/script.js` and change these lines at the very top:
```js
phone: "+91XXXXXXXXXX",      // ← Put your phone number here
whatsapp: "+91XXXXXXXXXX",   // ← Put your WhatsApp number here
```
Also search for `+91XXXXXXXXXX` in all HTML files and replace with your real number.

### Change Address
In `js/script.js`, change:
```js
address: "Piska Nagari, Ranchi, Jharkhand",  // ← Your full address
```

### Change Instagram Link
In `js/script.js`, your Instagram link is set to:
```js
instagram: "https://www.instagram.com/shri_lal_flower_and_events?utm_source=qr&exln=Y2pkejE2NzMzNzJj",
```
Also update the Instagram link in the footer of each HTML file.

### Add Google Maps
1. Go to Google Maps, find your shop
2. Click "Share" → "Embed a map" → Copy the iframe URL
3. In `about.html`, replace the map iframe `src` URL with your URL
4. In `js/script.js`, set `mapEmbedUrl` to the same URL

### Replace Photos
Simply replace any image file in the `images/` folder with your own photo, **keeping the same filename**.

For example:
- Replace `images/service-car.jpg` with a photo of your car decoration work
- Replace `images/gallery/event-1.jpg` with a photo of an event you decorated

**Tips for photos:**
- Use clear, well-lit photos
- Landscape (horizontal) photos work best for hero and service images
- Square photos work best for gallery
- Keep file sizes under 500KB for fast loading (use a free tool like [TinyPNG](https://tinypng.com))

### Add More Gallery Photos
1. Save your photo in the `images/gallery/` folder (e.g., `event-5.jpg`)
2. Open `gallery.html` and copy one of the existing gallery items:
```html
<div class="gallery-item" data-category="event">
    <img src="images/gallery/event-5.jpg" alt="Description of the photo" loading="lazy">
    <div class="gallery-item__overlay">
        <!-- zoom icon SVG -->
    </div>
</div>
```
3. Change `data-category` to: `car`, `home`, `event`, or `mala`
4. Change the `src` to your new file
5. Write a short description in `alt`

### Change Prices
In `services.html`, find each price like:
```html
<span class="service-detail__price">Starting from ₹2,500</span>
```
Change the number to your price.

### Add Owner Story
In `about.html`, find `[ADD OWNER STORY HERE]` and replace it with your story.

## 🌐 How to Put Online

### Option 1: Free Hosting with Netlify
1. Go to [netlify.com](https://www.netlify.com/) and sign up free
2. Drag and drop this entire folder onto the Netlify page
3. Done! You'll get a free URL

### Option 2: Free Hosting with GitHub Pages
1. Create a GitHub account
2. Create a new repository
3. Upload all files
4. Go to Settings → Pages → Select "main" branch → Save

### Option 3: Any Web Hosting
Upload all files to your hosting via FTP or file manager.

## 🔧 Technical Notes
- No frameworks needed — just HTML, CSS, and JavaScript
- Works on all modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile-first responsive design
- SEO optimized with meta tags, schema markup, and alt text
- Google Fonts: Playfair Display (headings) + Inter (body text)
- WhatsApp links use the wa.me API with pre-filled messages
