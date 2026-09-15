# Mishika Solar Sphere Website

Official web application for **Mishika Solar Sphere** — Rooftop Solar, Inverter, and Battery storage solutions in Sikar, Rajasthan.

## Features

- **Modern & Responsive UI**: Built with Tailwind CSS, custom design tokens, and fluid typography.
- **Mobile-First UX**: Slide-out navigation drawer, sticky bottom conversion bar (`md:hidden`), touch-optimized 28px slider thumb, and 44px+ tap targets.
- **Interactive Solar Savings & Subsidy Calculator**: Instant calculations for system capacity (kW), PM Surya Ghar direct government subsidy (up to ₹78,000), monthly bill savings, and payback period.
- **Dual-Layout Warranty Section**: Clean vertical card stack on mobile (`block md:hidden`) and 5-column comparison table on desktop (`hidden md:block`).
- **Dynamic Background Canvas Engine**: Adaptive 24/30 FPS frame sequence streaming with `IntersectionObserver` and tab idle pausing to conserve battery and cellular data.
- **1-Tap Direct Conversion**: Instant call (`tel:+918824601376`) and WhatsApp chat integration with pre-filled inquiry text.

## Getting Started

### Local Development

1. Ensure [Node.js](https://nodejs.org/) (v16+) is installed.
2. Start the local development server:
   ```bash
   npm start
   ```
3. Open your browser and navigate to:
   ```
   http://localhost:3000/
   ```

### Running Asset & Syntax Tests

To verify that all routes, images, frame sequence assets, and JavaScript files are working properly:
```bash
npm test
```

## Deployment

The website is a static-first SPA and can be deployed directly to:
- **Netlify / Vercel**: Drag and drop or connect repository with default publish directory `.`.
- **GitHub Pages**: Serve directly from root or `docs/`.
- **Node.js Cloud Hosts (Render / Railway / AWS)**: Runs via `npm start`.

---
© 2026 Mishika Solar Sphere. All rights reserved.
