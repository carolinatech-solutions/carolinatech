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

### Prerequisites
- You must have **[Node.js](https://nodejs.org/)** installed on your computer to run the build script.

### How to Edit and Update the Website:
1. **Never edit the files in the root folder** (`index.html`, `assets/css/style.css`, etc.) directly. These are generated files and your changes will be overwritten.
2. **Always make your changes inside the `src/` folder** (e.g., edit `src/index.html` or `src/assets/js/main.js`).
3. Open your terminal (or Command Prompt / PowerShell) in the project folder.
4. Run the build script to compile and encrypt the changes into the production root:
   ```bash
   node build.js
   ```
5. The build script will minify the CSS, obfuscate JavaScript string literals, inject security protection layers, base64-encrypt the HTML layout, and output the optimized files to the root directory. You can now upload the root files to your web server.

### Updating Contact Links & Social Media (Base64)
To prevent bots from scraping your contact information, URLs and phone numbers in `src/index.html` are obfuscated using Base64 encoding.

If you need to change a phone number or a Facebook link (look for `data-obf-href`, `data-obf-text`, or `data-obf-title`), you must encode the new text into Base64 first:
1. Go to a free Base64 encoder like [Base64Encode.org](https://www.base64encode.org/).
2. Type your link (e.g., `https://wa.me/639496437357`) or text (e.g., `0949 643 7357`) into the top box.
3. Click "Encode" and copy the resulting string (e.g., `aHR0cHM6Ly93YS5tZS82Mzk0OTY0MzczNTc=`).
4. Paste that string into the corresponding `data-obf-*` attribute in `src/index.html`.
5. Run `node build.js`.

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
