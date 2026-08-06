# AETHERIA IPTV - Dark Luxury IPTV Platform

A world-class, ultra-modern dark luxury IPTV subscription website built with vanilla HTML5, CSS3 glassmorphic design system, dynamic TMDB API integration, interactive HTML5 particle canvas, 3D tilt effects, and responsive mobile navigation.

## 🚀 Live Demo & Structure

- **Home Page** (`index.html`) - Hero section, 8K live match spotlight, available brand networks, dynamic TMDB API showcase, live sports arena, why choose us cards, supported devices grid.
- **Pricing Page** (`pricing.html`) - 4 subscription plan cards (1, 3, 6, 12 Months), feature comparison matrix table, direct contact booking integration.
- **About Page** (`about.html`) - Engineering story, mission, vision, core values grid, animated stats counters, milestone timeline.
- **Contact Page** (`contact.html`) - Glass contact form, VIP pre-fill plan detection, WhatsApp desk, Telegram VIP channel, email card, FAQ accordion.
- **Legal Policies**:
  - `privacy.html` - Privacy Policy & Data Protection
  - `terms.html` - Terms of Service & SLA Guarantee
  - `refund.html` - Return & 7-Day Money-Back Guarantee

## 🛠️ Technology Stack

- **HTML5 & CSS3**: Custom CSS variables, glassmorphism, floating ambient glow, 3D card tilt.
- **JavaScript (ES6+)**: `main.js`, `tmdb-engine.js`, `config.js`, `artwork-data.js`.
- **API Integration**: Dynamic TMDB API v3 endpoints with `localStorage` response caching.
- **SEO & Security**: `sitemap.xml`, `robots.txt`, `referrerpolicy="no-referrer"` image load protection.

## 📦 How to Run Locally

1. Unzip `aetheria-iptv-website.zip`.
2. Open `index.html` in any modern web browser or launch a local HTTP server:
   ```bash
   npx serve .
   ```
3. To customize TMDB API settings, edit `config.js`:
   ```javascript
   const TMDB_API_KEY = "YOUR_API_KEY";
   ```

## 🌐 Deploying to GitHub / Vercel / Netlify

- Push the repository directly to GitHub.
- Connect your GitHub repo to Vercel, Netlify, or GitHub Pages for instant 1-click hosting.
