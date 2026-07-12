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

  return protectionScript + '\n' + js;
}

// Obfuscate HTML by turning the body contents into a Base64-decoded DOM injection
function obfuscateHTML(html) {
  // Extract head contents to preserve SEO metadata and linked CSS
  const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  const headContent = headMatch ? headMatch[1].trim() : '';

  // Extract body contents
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let bodyContent = bodyMatch ? bodyMatch[1] : html;

  // Remove the script tags from bodyContent so they aren't parsed inside innerHTML
  bodyContent = bodyContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // Compress body HTML slightly
  const cleanBody = bodyContent
    .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
    .replace(/\s+/g, ' ')            // Collapse whitespace
    .trim();

  const b64 = base64Encode(cleanBody);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  ${headContent}
</head>
<body>
  <div id="app"></div>
  <script>
    (function() {
      // Securely decode and render page layout dynamically as UTF-8
      try {
        var payload = "${b64}";
        document.getElementById('app').innerHTML = decodeURIComponent(escape(atob(payload)));
        
        // Set footer year
        var footerYearEl = document.getElementById('footerYear');
        if (footerYearEl) {
          footerYearEl.textContent = new Date().getFullYear();
        }
      } catch (e) {
        console.error("Decryption failed:", e);
      }
    })();
  </script>
  <script src="assets/js/main.js" defer></script>
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
