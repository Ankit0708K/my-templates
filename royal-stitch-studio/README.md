# Royal Stitch Studio

A modern, production-ready website for Royal Stitch Studio - Premium Tailoring & Couture.

## 📁 Project Structure

```
royal-stitch-studio/
├── index.html          # Main HTML file
├── login.html          # Sign-in page
├── assets/
│   ├── css/
│   │   └── style.css   # All custom styles
│   ├── js/
│   │   └── main.js     # All custom JavaScript
│   └── img/            # Image assets (if needed)
└── README.md           # This file
```

## 🚀 Deployment

### GitHub
1. Initialize git repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Create a new repository on GitHub and push:
   ```bash
   git remote add origin <your-repo-url>
   git branch -M main
   git push -u origin main
   ```

### Netlify
1. **Option 1: Drag & Drop**
   - Go to [Netlify Drop](https://app.netlify.com/drop)
   - Drag the `royal-stitch-studio` folder
   - Your site will be live instantly!

2. **Option 2: Git Integration**
   - Connect your GitHub repository to Netlify
   - Set build command: (leave empty - static site)
   - Set publish directory: `/` (root)
   - Deploy!

## ✨ Features (2026 redesign)

- **Editorial atelier look**: bone paper, ink type, madder red and brass accents, Instrument Serif + Geist + Geist Mono
- **Motion**: intro loader with a stitched thread, word-by-word headline reveals, clip-path image reveals, parallax
- **Scroll effects**: measuring-tape ruler, marquee that reacts to scroll speed, statement text that lights up as you read, process "thread" that fills in
- **Interactions**: custom cursor, magnetic buttons, fabric swatch that follows the cursor over services, animated filter pill
- **Swatch book portfolio**: pure-CSS fabric patterns (no images needed), filterable
- **Testimonials**: auto-advancing quotes with progress bar
- **Contact form**: floating labels, service chips, inline validation and success state (no alerts)
- **Login page**: matching split layout, show/hide password, loading state
- **Accessible**: respects `prefers-reduced-motion`, keyboard focus styles, works without JS
- **No framework**: Bootstrap removed. Plain HTML, CSS and JS only

## 🛠️ Technologies

- **Vanilla JavaScript**: no dependencies
- **Modern CSS**: custom properties, grid, clip-path, masks
- **Google Fonts**: Instrument Serif, Geist, Geist Mono

## 📝 Notes

- Photos load from Unsplash; if they fail, a fabric-toned background shows instead. Replace with your own in `assets/img/`
- Forms are demo-only. Connect them to your backend (or Formspree / WhatsApp) in `assets/js/main.js`

## 🎨 Customization

- **Colors & fonts**: CSS variables at the top of `assets/css/style.css`
- **Content**: edit `index.html` / `login.html` directly
- **Motion**: `assets/js/main.js`

---

**Ready for Production** ✅

