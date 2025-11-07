# Royal Stitch Studio

A modern, production-ready website for Royal Stitch Studio - Premium Tailoring & Couture.

## 📁 Project Structure

```
royal-stitch-studio/
├── index.html          # Main HTML file
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

## ✨ Features

- **Modern Design**: Premium glassmorphism effects with gold accents
- **Fully Responsive**: Works perfectly on all devices
- **Smooth Animations**: Intersection Observer-based reveal animations
- **Interactive Portfolio**: Filterable portfolio section
- **Scroll to Top**: Smooth scroll button
- **Active Navigation**: Auto-highlights current section

## 🛠️ Technologies

- **Bootstrap 5.3.3**: Responsive framework
- **Bootstrap Icons**: Icon library
- **Poppins Font**: Google Fonts
- **Vanilla JavaScript**: No dependencies
- **CSS3**: Modern styling with CSS variables

## 📝 Notes

- All external resources (Bootstrap, Icons, Fonts) are loaded via CDN
- Images are currently using Unsplash URLs - replace with your own images in `assets/img/`
- Form submissions are currently demo (alert-based) - integrate with your backend
- All styles and scripts are properly separated for maintainability

## 🎨 Customization

- **Colors**: Edit CSS variables in `assets/css/style.css` (lines 18-32)
- **Content**: Edit `index.html` directly
- **Functionality**: Modify `assets/js/main.js` for custom behavior

---

**Ready for Production** ✅

