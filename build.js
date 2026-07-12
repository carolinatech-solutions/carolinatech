const fs = require('fs');
const path = require('path');

// Helper to encode string to Base64
function base64Encode(str) {
  return Buffer.from(str, 'utf-8').toString('base64');
}

// Simple minifier for CSS (removes comments, spaces, newlines)
function minifyCSS(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '') // remove comments
    .replace(/\s+/g, ' ')             // collapse multiple whitespaces
    .replace(/\s*([\{\}:;,])\s*/g, '$1') // remove spaces around brackets/colons/semicolons
    .trim();
}

// Simple minifier/obfuscator for JS
function minifyAndObfuscateJS(js) {
  // 1. Add keypress and inspect element protection at the top
  const protectionScript = `
(function() {
  // Disable right-click
  document.addEventListener('contextmenu', function(e) { e.preventDefault(); });
  
  // Disable keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    // F12 (123)
    if (e.keyCode === 123) {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+I (73), Ctrl+Shift+J (74), Ctrl+Shift+C (67)
    if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
      e.preventDefault();
      return false;
    }
    // Ctrl+U (85)
    if (e.ctrlKey && e.keyCode === 85) {
      e.preventDefault();
      return false;
    }
    // Ctrl+S (83)
    if (e.ctrlKey && e.keyCode === 83) {
      e.preventDefault();
      return false;
    }
  });

  // Constant anti-debugger loop
  setInterval(function() {
    (function() {
      return false;
    }
    .constructor('debugger')
    .call());
  }, 1000);
})();
`;

  // Combine minification (basic regex cleanup)
  let cleanedJS = js
    .replace(/\/\*[\s\S]*?\*\//g, '') // remove multi-line comments
    .replace(/\/\/.*$/gm, '')         // remove single-line comments
    .replace(/\s+/g, ' ')             // collapse multiple whitespaces
    .trim();

  // Simple string-to-hex obfuscation helper
  // Converts string literals to hex equivalents to make text searches harder
  cleanedJS = cleanedJS.replace(/(["'])(.*?)\1/g, (match, quote, content) => {
    // Skip empty strings or very short strings
    if (content.length < 2) return match;
    // Skip strings that look like regexes, colors, or SVGs
    if (content.includes('<svg') || content.includes('d=') || content.startsWith('#')) return match;
    
    let obfuscated = '';
    for (let i = 0; i < content.length; i++) {
      const hex = content.charCodeAt(i).toString(16);
      obfuscated += '\\x' + (hex.length < 2 ? '0' + hex : hex);
    }
    return quote + obfuscated + quote;
  });

  return protectionScript + '\n' + cleanedJS;
}

// Obfuscate HTML by turning the whole code into a Base64-decoded document.write
function obfuscateHTML(html) {
  // Compress HTML slightly
  const cleanHTML = html
    .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
    .replace(/\s+/g, ' ')            // Collapse whitespace
    .trim();

  const b64 = base64Encode(cleanHTML);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CarolinaTech | Professional IT Solutions</title>
  <meta name="description" content="CarolinaTech delivers trusted computer repair, networking, CCTV installation, printer repair, and complete IT solutions for homes and businesses.">
  <style>
    body { background: #0B1F3A; margin: 0; padding: 0; display: flex; align-items: center; justify-content: center; height: 100vh; font-family: system-ui, sans-serif; color: #fff; overflow: hidden; }
    .spinner { border: 4px solid rgba(255,255,255,0.1); width: 36px; height: 36px; border-radius: 50%; border-left-color: #1B4FD8; animation: spin 1s linear infinite; }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  </style>
</head>
<body>
  <div class="spinner"></div>
  <script>
    (function() {
      // Decode and render the full webpage securely
      var payload = "${b64}";
      document.open();
      document.write(atob(payload));
      document.close();
    })();
  </script>
</body>
</html>`;
}

// Main Build execution
function build() {
  console.log('Starting build and code obfuscation process...');

  try {
    // 1. Process CSS
    const rawCSS = fs.readFileSync(path.join(__dirname, 'src/assets/css/style.css'), 'utf-8');
    const minCSS = minifyCSS(rawCSS);
    fs.writeFileSync(path.join(__dirname, 'assets/css/style.css'), minCSS, 'utf-8');
    console.log('✔ style.css minified and bundled.');

    // 2. Process JS
    const rawJS = fs.readFileSync(path.join(__dirname, 'src/assets/js/main.js'), 'utf-8');
    const obfJS = minifyAndObfuscateJS(rawJS);
    fs.writeFileSync(path.join(__dirname, 'assets/js/main.js'), obfJS, 'utf-8');
    console.log('✔ main.js minified, string-obfuscated, and protection scripts added.');

    // 3. Process HTML
    const rawHTML = fs.readFileSync(path.join(__dirname, 'src/index.html'), 'utf-8');
    const obfHTML = obfuscateHTML(rawHTML);
    fs.writeFileSync(path.join(__dirname, 'index.html'), obfHTML, 'utf-8');
    console.log('✔ index.html fully encrypted into custom dynamic loader.');

    console.log('Build process completed successfully! Check the root folder.');
  } catch (error) {
    console.error('Error during build process:', error);
  }
}

build();
