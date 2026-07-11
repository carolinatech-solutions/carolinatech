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

- `index.html` - The main HTML document containing all layout sections (Hero, Services, Why Us, About/Contact, Footer, and CCTV Modal).
- `assets/` - Directory containing all static assets:
  - `css/` - Modular styling architecture:
    - `style.css` - Main entry hub importing all stylesheets.
    - `variables.css` - CSS Custom Properties (colors, spacing, easing).
    - `reset.css` - Base resets, smooth scrolling, and base typography.
    - `animations.css` - Global animation `@keyframes`.
    - `components.css` - Reusable UI elements (buttons, cards, inputs, modales, hamburger, contact bubble).
    - `sections.css` - Layout specific styling for page sections (Hero, Services, Why Us, etc.).
    - `responsive.css` - Media queries for tablet and mobile adaptations.
  - `js/`
    - `main.js` - Application logic organized in modular IIFEs (Particle Canvas, Navbar states, Animated Counters, Scroll Reveal, Form Submission, Smooth Scrolling, Contact Bubble).
  - `images/` - Image assets including hero backgrounds.

## 💻 Getting Started

This is a static website, so no complex build tools, dependencies, or servers are required to run it locally.

1. Clone or download the repository.
2. Open the `index.html` file directly in any modern web browser.
3. *Optional*: For the best development experience, open the folder in VS Code and use the **Live Server** extension to preview changes in real-time.

## 📝 Configuration (Web3Forms)

The contact form is configured to send emails using Web3Forms. The access key is assembled at runtime in the JavaScript file to prevent simple scraping.

To change the email destination, you need to update the Web3Forms access key:

1. Visit [web3forms.com](https://web3forms.com/) and enter your email address to get a free Access Key.
2. Open `assets/js/main.js` and locate the `initForm` function.
3. Find the `_k` array where the key is split into parts (to avoid scraper bots finding it easily):
   ```javascript
   // Change these string pieces to match your new access key separated by dashes
   const _k = ['your', 'new', 'access', 'key', 'here'];
   ```
4. Save the file. The form will now send submissions to your registered email address.

## 📄 License

This project is created for CarolinaTech. All rights reserved.
