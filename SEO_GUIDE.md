# SEO Optimization for HexHive Solutions

This guide outlines the SEO optimizations implemented for the HexHive Solutions website.

## 1. Google Search Console Verification
- **Implemented**: Added `<meta name="google-site-verification" ... />` to `index.html`.
- **File**: `public/google06f176bbbd5a0a56.html` is present and accessible.
- **Action**: Once deployed, go to Google Search Console and click "Verify".

## 2. Dynamic Meta Tags (SEO Component)
- **Library**: Installed `react-helmet-async`.
- **Component**: Created `src/components/SEO.jsx` which handles:
  - Title (Dynamic per page)
  - Description
  - Keywords
  - Canonical URLs (Auto-generated based on current path)
  - Open Graph (Facebook/LinkedIn)
  - Twitter Cards
- **Usage**:
  - `Home.jsx`: Impactful title/description.
  - `Programs.jsx`: Specific program related keywords.
  - `Register.jsx`: Conversion focused metadata.

## 3. Technical SEO & Sitemap
- **Sitemap**: Installed `vite-plugin-sitemap`.
  - Automatically generates `sitemap.xml` specifically for your routes (`/`, `/programs`, `/register`, etc.).
  - Configured in `vite.config.js`.
- **Robots.txt**: Updated `public/robots.txt` to point to the sitemap.
- **SPA Fix**: `package.json` includes `cp build/index.html build/404.html` in the build script. This ensures GitHub Pages handles direct links to sub-routes (like `/programs`) correctly without 404s.

## 4. Performance
- **Compression**: Installed `vite-plugin-compression` (Brotli) to reduce bundle size.
- **Lazy Loading**: Existing lazy loading in `App.jsx` + `SEO` component ensures metadata is injected correctly even for lazy-loaded routes.

## 5. Deployment Instructions

1. **Commit and Push**:
   ```bash
   git add .
   git commit -m "SEO Optimization: Verification, Meta Tags, Sitemap"
   git push origin main
   ```

2. **Deploy**:
   The `deploy` script is already set up.
   ```bash
   npm run deploy
   ```
   (Or push to your deployment branch if using a workflow).

3. **Verify**:
   - Visit `https://hexhive.solutions/sitemap.xml` to check the sitemap.
   - Visit `https://hexhive.solutions/google06f176bbbd5a0a56.html` to verify availability.
   - Use Google Search Console "URL Inspection" tool to verify a page.

## 6. Checklist for Future Pages
When creating a new page (e.g., `About.jsx`), always:
1. Import `SEO`: `import SEO from '../components/SEO';`
2. Add it at the top of your component:
   ```jsx
   <SEO 
     title="Page Title" 
     description="Description under 160 characters." 
   />
   ```
3. Add the route to `vite.config.js` `dynamicRoutes` list if you want it in the sitemap instantly (though not strictly required if linked from home, it helps).

## 7. Prerendering vs. Client-Side SEO
We used Client-Side Rendering (CSR) with `react-helmet-async`. Googlebot renders JavaScript well.
- **Why not Prerender?**: Adding full SSG/Prerendering to an existing Auth-heavy app can break dynamic features. The current setup is "Production Ready" for Google.
- **Canonical URLs**: Automatically set to `https://hexhive.solutions/your-path`.
