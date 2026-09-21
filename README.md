# Space Station — 24-Hour Luxury Coworking Space in Lahore

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/madil132/space-station)

A high-performance, architectural website for **Space Station**, Lahore's premier 24-hour luxury coworking space located at Katar Bund Rd, Street 1, Sarai, 2 minutes from KFC Thokar Niaz Baig.

Built with clean semantic HTML5, modern vanilla CSS, responsive design grounded in Apple Human Interface Guidelines (HIG) and SureGuard visual hierarchy, and interactive JavaScript enhancements.

---

## 🌟 Pages & Architecture
- **Home (`index.html`)**: Split hero with frosted glass stat panel, animated metrics ribbon (`500+` members, `17+` reviews, `100%` power backup, `24/7` access, `0` deposit), 6-pillar *Why Us* breakdown, workstyle visual zones, interactive left-to-right reviews slider with animated date badges, and FAQ accordion.
- **Amenities (`amenities.html`)**: Deep dive into 15+ facilities categorized into Focus & Deep Work, Recreation (foosball, table tennis), Power/Gigabit Fiber Infrastructure, and Meeting Suites.
- **Membership & Pricing (`membership.html`)**: Transparent pricing in Pakistani Rupees (PKR) for Day Pass, Hot Desk, Dedicated Workstation, Private Office Suites, and Hourly Meeting Rooms.
- **Reviews (`reviews.html`)**: Verified Lahore member testimonials, 4.9★ Google Maps rating counter, and community culture spotlight.
- **Contact (`contact.html`)**: Location map, operating hours, and instant inquiry form routing directly to WhatsApp (+92 310 4004001).
- **Custom 404 (`404.html`)**: Custom branded fallback page for Vercel edge routing.

---

## 🚀 Vercel Deployment Readiness
This project is configured out-of-the-box for 1-click deployment on **Vercel**:
- `vercel.json` includes `cleanUrls: true` for clean slug routing, optimal static caching for `/assets/`, and security HTTP headers (`nosniff`, `SAMEORIGIN`, `strict-origin-when-cross-origin`).
- SEO & AI engine assets: `robots.txt`, `sitemap.xml`, `llms.txt`, and LocalBusiness JSON-LD schema.

### Deploying to Vercel:
1. Go to [vercel.com/new](https://vercel.com/new).
2. Connect your GitHub account and import `madil132/space-station`.
3. Keep default settings (Framework Preset: **Other**) and click **Deploy**.
4. Your site will instantly be live on a fast global edge CDN with free SSL.

---

## 💻 Local Development
Serve the directory with any local static HTTP server:
```bash
# Python
python -m http.server 8080

# Or Node.js
npx serve .
```
Visit `http://localhost:8080` in your browser.
