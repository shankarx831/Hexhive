# Performance Optimization Guide

This project has been optimized for high performance, mobile responsiveness, and SEO.

## 1. Animation Performance (Mobile First)
- **Reduced Complexity**: Complex animations (blur, scale, heavy Y-axis movement) are disabled or simplified on mobile devices (<768px).
- **GPU Acceleration**: Added `will-change: transform, opacity` to `AnimatedSection` and page transitions to hint the browser compositor.
- **Lazy Motion**: Utilizes `framer-motion` efficient rendering.
- **Code**: See `src/components/AnimatedSection.jsx` and `src/App.jsx` for `isMobile` checks.

## 2. Rendering Optimization
- **Pre-rendering (SSG)**: Configured `vite-plugin-prerender` to generate static HTML for key routes (`/`, `/programs`, `/register`) at build time. This improves LCP and SEO significantly.
- **Code Splitting**: Routes are lazy-loaded using `React.lazy` and `Suspense`.
- **Manual Chunks**: `vite.config.js` is configured to split heavy dependencies (`react-pdf`, `framer-motion`) into separate chunks to prevent main-thread blocking during initial load.

## 3. Bundle Optimization
- **Compression**: `vite-plugin-compression` (Brotli) is active.
- **Tree Shaking**: Standard Vite production build removes unused code.
- **Vendor Splitting**: `rollupOptions` separates vendor code from app logic.

## 4. Mobile Strategy
- **Detection**: We use `window.matchMedia` to detect mobile devices.
- **Adjustment**: Transitions are faster (0.3s) and simpler (opacity only) on mobile.
- **Layout**: No layout shift (`y: 0`) on mobile during page transitions.

## 5. How to Deploy
The deployment workflow remains the same, but the build process now includes a pre-rendering step.

```bash
# Install dependencies (if not already)
npm install

# Build (includes prerendering)
npm run build

# Deploy
npm run deploy
```

## 6. Debugging Performance
If you experience lag:
1. Open Chrome DevTools -> Performance tab.
2. Record a session while scrolling.
3. Look for "Long Tasks" (Red bars).
4. Ensuring `will-change` is present on the animated elements.
5. Verify that `renderAfterTime` in `vite.config.js` is sufficient for content to load during pre-rendering.
