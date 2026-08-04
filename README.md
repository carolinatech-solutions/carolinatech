# CarolinaTech — IT Solutions Landing Page

A premium, modern, and high-performance landing page for CarolinaTech, providing professional IT & computer repair services for homes and businesses.

## 🚀 Features

- **Dark, Professional Tech Aesthetic**: A sleek design featuring deep dark backgrounds, vibrant electric blue accents, glowing gradients, and glassmorphism elements.
- **Interactive Particle Canvas**: A custom-built, lightweight HTML5 canvas animation in the hero section displaying floating, connected nodes to symbolize networking and technology.
- **Dynamic Sticky Navigation**: A transparent navbar that smoothly transitions into a frosted glass (backdrop-filter) sticky header upon scrolling. Includes a custom animated mobile hamburger menu.
- **Scroll Reveal Animations**: Elements fade and slide in beautifully as they enter the viewport, powered by an efficient `IntersectionObserver`.
- **Animated Data Counters**: Smoothly animating number counters that count up when scrolled into view.
- **CCTV Packages Modal**: A clean, fully responsive modal window showcasing available security camera packages without leaving the page.
- **Interactive Contact Bubble**: A slick, animated floating contact menu providing quick access to Viber, WhatsApp, Call/SMS, and Facebook.
- **Functional Contact Form**: A spam-protected, fully functional contact form powered by [Web3Forms](https://web3forms.com/) (No backend required) with interactive button states (loading, success, error).
- **Responsive Design**: Mobile-first architecture ensuring the site looks and functions perfectly across all device sizes (Desktop, Tablet, Mobile).

## 🛠️ Technology Stack

- **HTML5**: Semantic and accessible markup.
- **CSS3**: Custom properties (variables), Grid, Flexbox, Keyframe Animations, Glassmorphism, organized in a modular structure. (No CSS frameworks used).
- **Vanilla JavaScript (ES6+)**: Handles canvas rendering, DOM interactions, scroll events, `IntersectionObserver`, and async form submission (`fetch`). (No JS frameworks used).

## 📂 Project Structure

- `index.html` - **[Obfuscated/Encrypted Production Build]** The entry file served to users. It contains a dynamic loader that decrypts the page content on load and blocks F12/Inspect element shortcuts.
- `assets/` - **[Obfuscated/Production Bundles]**
  - `css/style.css` - Minified and consolidated CSS styles.
  - `js/main.js` - Minified, obfuscated, and protected script bundle containing form controls, sliders, navigation logic, and security features.
- `src/` - **[Raw Editable Source Code]** 👈 **Edit your code here!**
  - `index.html` - Raw, fully readable and structured HTML source.
  - `assets/css/style.css` - Raw stylesheet with custom variables, layout rules, and components.
  - `assets/js/main.js` - Raw scripts including form integrations, particle canvas, etc.
- `build.js` - Node.js compilation script that compiles the source code from `src/` into the production root.

## 💻 Development & Build Process

This project features a build pipeline to compress the codebase and protect your intellectual property (disabling right-click, F12 inspector, View Source shortcut, and obfuscating the HTML markup).

### How to Edit and Update the Website:
1. Always make your changes inside the **`src/`** folder (e.g., edit `src/index.html` or `src/assets/js/main.js`).
2. Run the build script in your terminal to compile and encrypt the changes into the production root:
   ```bash
   node build.js
   ```
3. The build script will minify the CSS, obfuscate JavaScript string literals, inject security protection layers, base64-encrypt the HTML layout, and output the optimized files to the root directory.

## 📝 Configuration (Web3Forms)

The contact form is configured to send emails using Web3Forms. The access key is assembled at runtime in the JavaScript file to prevent simple scraping.

To change the email destination, you need to update the Web3Forms access key:

1. Visit [web3forms.com](https://web3forms.com/) and enter your email address to get a free Access Key.
2. Open `src/assets/js/main.js` and locate the `initForm` function.
3. Find the `_k` array where the key is split into parts (to avoid scraper bots finding it easily):
   ```javascript
   // Change these string pieces to match your new access key separated by dashes
   const _k = ['your', 'new', 'access', 'key', 'here'];
   ```
4. Run `node build.js` in the terminal to compile your new configuration.

## 📄 License

This project is created for CarolinaTech. All rights reserved.
