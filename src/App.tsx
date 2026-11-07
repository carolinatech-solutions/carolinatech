import { useEffect, useRef, useState } from "react";

type IconName =
  | "arrow"
  | "computer"
  | "laptop"
  | "network"
  | "camera"
  | "printer"
  | "software"
  | "support"
  | "pin"
  | "clock"
  | "phone"
  | "mail"
  | "check"
  | "menu"
  | "close";

type Service = {
  title: string;
  description: string;
  icon: IconName;
};

const services: Service[] = [
  {
    title: "Computer repair",
    description: "Troubleshooting, upgrades, and dependable PC repairs.",
    icon: "computer",
  },
  {
    title: "Laptop repair",
    description: "Help with slow, damaged, or unreliable laptops.",
    icon: "laptop",
  },
  {
    title: "Wi-Fi & networks",
    description: "Router setup, Wi-Fi coverage, and office networking.",
    icon: "network",
  },
  {
    title: "CCTV installation",
    description: "Camera systems installed and set up for remote viewing.",
    icon: "camera",
  },
  {
    title: "Printer support",
    description: "Printer repairs, setup, and connection issues.",
    icon: "printer",
  },
  {
    title: "Software & IT support",
    description: "Windows setup and practical help for small businesses.",
    icon: "software",
  },
];

function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  let shape;
  switch (name) {
    case "arrow":
      shape = <path d="M5 12h14m-7-7 7 7-7 7" />;
      break;
    case "computer":
      shape = (
        <>
          <rect x="3" y="4" width="18" height="13" rx="2" />
          <path d="M8 21h8m-4-4v4" />
        </>
      );
      break;
    case "laptop":
      shape = (
        <>
          <rect x="5" y="4" width="14" height="12" rx="1.5" />
          <path d="M2 20h20l-2-4H4l-2 4Z" />
        </>
      );
      break;
    case "network":
      shape = (
        <>
          <path d="M5 9a11 11 0 0 1 14 0m-11 4a6 6 0 0 1 8 0m-5 4h.01" />
          <path d="M3 5a14 14 0 0 1 18 0" />
        </>
      );
      break;
    case "camera":
      shape = (
        <>
          <rect x="3" y="6" width="13" height="12" rx="2" />
          <path d="m16 10 5-3v10l-5-3" />
        </>
      );
      break;
    case "printer":
      shape = (
        <>
          <path d="M6 9V3h12v6M6 17H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" />
          <path d="M6 14h12v7H6z" />
          <path d="M18 12h.01" />
        </>
      );
      break;
    case "software":
      shape = (
        <>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 9h18M8 9v11" />
        </>
      );
      break;
    case "support":
      shape = (
        <>
          <path d="M4 13v-2a8 8 0 0 1 16 0v2" />
          <path d="M4 13h3v6H6a2 2 0 0 1-2-2v-4Zm16 0h-3v6h1a2 2 0 0 0 2-2v-4ZM12 21h3" />
        </>
      );
      break;
    case "pin":
      shape = (
        <>
          <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10" r="2.5" />
        </>
      );
      break;
    case "clock":
      shape = (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </>
      );
      break;
    case "phone":
      shape = (
        <path d="M7 3H5a2 2 0 0 0-2 2 16 16 0 0 0 16 16 2 2 0 0 0 2-2v-2l-5-2-2 2a13 13 0 0 1-5-5l2-2-2-5H7Z" />
      );
      break;
    case "mail":
      shape = (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </>
      );
      break;
    case "check":
      shape = <path d="m5 12 4 4L19 6" />;
      break;
    case "menu":
      shape = <path d="M4 7h16M4 12h16M4 17h16" />;
      break;
    case "close":
      shape = <path d="m6 6 12 12M18 6 6 18" />;
      break;
  }

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...common}
    >
      {shape}
    </svg>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -32px 0px" },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const content = menuContentRef.current;
    if (!content) return;
    const mobileMenu = window.matchMedia("(max-width: 680px)");
    const syncMenuAccessibility = () => {
      if (!mobileMenu.matches || menuOpen) content.removeAttribute("inert");
      else content.setAttribute("inert", "");
    };

    syncMenuAccessibility();
    mobileMenu.addEventListener("change", syncMenuAccessibility);
    return () => mobileMenu.removeEventListener("change", syncMenuAccessibility);
  }, [menuOpen]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <nav className="nav-shell" aria-label="Main navigation">
          <a className="brand" href="#home" aria-label="CarolinaTech home">
            <span className="brand-mark" aria-hidden="true">
              <img src="/assets/images/carolinatech-logo.png" alt="" />
            </span>
            <span className="brand-name">
              Carolina<span>Tech</span>
            </span>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="primary-links"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>

          <div
            className={`nav-content${menuOpen ? " is-open" : ""}`}
            id="primary-links"
            ref={menuContentRef}
          >
            <div className="nav-links">
              <a href="#services" onClick={() => setMenuOpen(false)}>
                Services
              </a>
              <a href="#about" onClick={() => setMenuOpen(false)}>
                About
              </a>
              <a href="#contact" onClick={() => setMenuOpen(false)}>
                Contact
              </a>
            </div>
            <a
              className="button button-primary nav-cta"
              href="https://wa.me/639496437357"
              target="_blank"
              rel="noreferrer"
            >
              Message us <Icon name="arrow" size={18} />
            </a>
          </div>
        </nav>
      </header>

      <main id="main">
        <section className="hero section-wrap" id="home">
          <div className="hero-copy" data-reveal>
            <div className="eyebrow">
              <span className="status-dot" />
              Local IT support · Naga City
            </div>
            <h1>
              Tech trouble?
              <br />
              <span>We’ll come to you.</span>
            </h1>
            <p className="hero-description">
              Straightforward computer repair, networking, and CCTV services
              for homes and small businesses.
            </p>
            <div className="hero-actions">
              <a
                className="button button-primary"
                href="https://wa.me/639496437357"
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="phone" size={18} />
                Get in touch
              </a>
              <a className="button button-secondary" href="#services">
                View services <Icon name="arrow" size={18} />
              </a>
            </div>
            <div className="hero-note">
              <Icon name="check" size={17} />
              On-site service for homes and businesses
            </div>
          </div>

          <div className="hero-visual" data-reveal>
            <img
              src="/assets/images/carolinatech-hero.jpg"
              alt="CarolinaTech computer repair, CCTV, and networking services"
              fetchPriority="high"
            />
            <div className="image-caption">
              <span className="caption-icon">
                <Icon name="pin" size={20} />
              </span>
              <span>
                <strong>Local, on-site support</strong>
                <small>Carolina · Naga City</small>
              </span>
            </div>
          </div>
        </section>

        <section className="services-section section-wrap" id="services">
          <div className="section-heading" data-reveal>
            <span className="section-kicker">Services</span>
            <h2>IT help, made simple.</h2>
            <p lang="fil">
              Tinatamad ka bang pumunta sa shop para magpagawa? Walang problema,
              kami na ang pupunta sa’yo!
            </p>
          </div>

          <div className="service-grid">
            {services.map((service, index) => (
              <a
                className="service-card"
                data-reveal
                style={{ transitionDelay: `${(index % 3) * 70}ms` }}
                href={`https://wa.me/639496437357?text=${encodeURIComponent(
                  `Hi CarolinaTech, I need help with ${service.title.toLowerCase()}.`,
                )}`}
                target="_blank"
                rel="noreferrer"
                key={service.title}
              >
                <span className={`service-icon service-icon-${index + 1}`}>
                  <Icon name={service.icon} />
                </span>
                <span className="service-card-copy">
                  <strong>{service.title}</strong>
                  <span>{service.description}</span>
                </span>
                <span className="service-arrow">
                  <Icon name="arrow" size={18} />
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="about-section section-wrap" id="about">
          <div className="about-intro" data-reveal>
            <span className="section-kicker">Why CarolinaTech</span>
            <h2>Good service.<br />No tech jargon.</h2>
            <p>
              Practical IT support from a local technician, with clear
              communication from the first message to the finished job.
            </p>
          </div>
          <div className="about-points">
            <div className="about-point" data-reveal>
              <span className="point-number">01</span>
              <div>
                <strong>Tell us what you need</strong>
                <p>Send a quick message or call.</p>
              </div>
            </div>
            <div className="about-point" data-reveal>
              <span className="point-number">02</span>
              <div>
                <strong>Get a clear next step</strong>
                <p>We’ll talk through the issue and options.</p>
              </div>
            </div>
            <div className="about-point" data-reveal>
              <span className="point-number">03</span>
              <div>
                <strong>Get help on-site</strong>
                <p>We’ll arrange a visit that works for you.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section section-wrap" id="contact">
          <div className="contact-copy" data-reveal>
            <span className="section-kicker">Contact</span>
            <h2>Let’s get it sorted.</h2>
            <p>Describe the issue and we’ll get back to you.</p>
          </div>
          <div className="contact-actions" data-reveal>
            <a
              className="button button-primary"
              href="https://wa.me/639496437357"
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="phone" size={18} />
              WhatsApp us
            </a>
            <a className="button button-secondary" href="tel:+639496437357">
              <Icon name="phone" size={18} />
              Call 0949 643 7357
            </a>
            <a className="contact-email" href="mailto:carolinatechs@gmail.com">
              <Icon name="mail" size={17} /> carolinatechs@gmail.com
            </a>
          </div>
          <div className="contact-details" data-reveal>
            <span>
              <Icon name="pin" size={18} />
              Brgy. Carolina, Naga City, Camarines Sur
            </span>
            <span>
              <Icon name="clock" size={18} />
              Monday–Saturday, 8:00 AM–6:00 PM
            </span>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-mark" aria-hidden="true">
            <img src="/assets/images/carolinatech-logo.png" alt="" />
          </span>
          <span className="brand-name">
            Carolina<span>Tech</span>
          </span>
        </a>
        <span>On-site IT support in Naga City and nearby areas.</span>
        <span>© {new Date().getFullYear()} CarolinaTech</span>
      </footer>
    </>
  );
}

export default App;
