import "@fontsource/ibm-plex-sans/latin-400.css";
import "@fontsource/ibm-plex-sans/latin-500.css";
import "@fontsource/ibm-plex-sans/latin-600.css";
import "@fontsource/ibm-plex-sans/latin-700.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Missing root element");
}

const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
const syncMotionPreference = () => {
  document.documentElement.classList.toggle(
    "motion-enabled",
    !motionPreference.matches && "IntersectionObserver" in window,
  );
};

syncMotionPreference();
motionPreference.addEventListener("change", syncMotionPreference);

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
