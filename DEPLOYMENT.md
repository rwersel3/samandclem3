# Deploying Sam & Clem Storybook

This React application can be deployed to the web in several ways:

## Option 1: Deploy to Netlify (Easiest - Free)

1. **Create a free account** at [netlify.com](https://netlify.com)

2. **Drag and drop deployment:**
   - Build the app locally (see below)
   - Drag the `dist` folder to Netlify's deployment page
   - Your site will be live instantly!

3. **Or connect to GitHub:**
   - Push your code to a GitHub repository
   - Connect the repo to Netlify
   - It will auto-deploy on every update

**Build settings for Netlify:**
- Build command: `pnpm install && pnpm run build`
- Publish directory: `dist`

---

## Option 2: Deploy to Vercel (Also Easy - Free)

1. **Create account** at [vercel.com](https://vercel.com)
2. **Import your GitHub repo** or drag and drop
3. Vercel auto-detects Vite projects
4. Done! Your site is live

---

## Option 3: GitHub Pages (Free)

1. Push code to GitHub
2. Add this to `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/sam-and-clem"
}
```
3. Install gh-pages: `pnpm add -D gh-pages`
4. Add deploy script to package.json:
```json
{
  "scripts": {
    "deploy": "vite build && gh-pages -d dist"
  }
}
```
5. Run `pnpm run deploy`

---

## Option 4: Any Static Host

Build the app and upload the `dist` folder to any static hosting:
- **AWS S3 + CloudFront**
- **Firebase Hosting**
- **Cloudflare Pages**
- **DigitalOcean App Platform**

### To build locally:

```bash
# Install dependencies
pnpm install

# Build for production
pnpm run build
```

This creates a `dist` folder with all your files. Upload this folder to any web host!

---

## Single HTML File Option (Advanced)

To bundle everything into a single HTML file, you'd need to:

1. Use a tool like `vite-plugin-singlefile`
2. Inline all CSS and JavaScript
3. Convert all assets to base64

**Note:** This is NOT recommended for this project because:
- The file would be 5-10 MB (slow to load)
- Harder to update
- No code splitting or optimization
- Browser caching won't work

---

## Recommended Approach

**For easiest deployment:** Use Netlify or Vercel
- No server setup needed
- Free SSL certificate
- Automatic builds from GitHub
- CDN for fast loading worldwide

**Steps:**
1. Push your code to GitHub
2. Sign up for Netlify (free)
3. Click "New site from Git"
4. Select your repository
5. Build command: `pnpm install && pnpm run build`
6. Publish directory: `dist`
7. Click Deploy!

Your storybook will be live at a URL like: `sam-and-clem.netlify.app`

You can then add a custom domain if you want!
