const fs = require('fs');

const cssContent = `
/* Reset y Base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --bg-primary: #0f1419;
  --bg-secondary: #1a2029;
  --bg-card: #1e252f;
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --accent: #06b6d4;
  --accent-hover: #22d3ee;
  --border: #2d3748;
  --sports: #ef4444;
  --electric: #22c55e;
  --suv: #f59e0b;
  --gt: #8b5cf6;
}

body {
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
}

a {
  text-decoration: none;
  color: inherit;
}

img {
  max-width: 100%;
  display: block;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Header */
.header {
  position: relative; /* CHANGED FROM FIXED TO AVOID OVERLAP WITH SPA NAVBAR */
  background: rgba(15, 20, 25, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
  z-index: 10;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.logo-icon {
  width: 32px;
  height: 32px;
  color: var(--accent);
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: var(--text-secondary);
  font-weight: 500;
  transition: color 0.3s;
}

.nav-link:hover {
  color: var(--accent);
}

/* Hero Section */
.hero {
  padding: 4rem 1.5rem 4rem; /* REDUCED TOP PADDING */
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.hero-content {
  text-align: center;
}

.hero-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: rgba(6, 182, 212, 0.15);
  border: 1px solid var(--accent);
  border-radius: 50px;
  color: var(--accent);
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
}

.hero-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

.highlight {
  color: var(--accent);
}

.hero-description {
  color: var(--text-secondary);
  font-size: 1.125rem;
  max-width: 600px;
  margin: 0 auto 2rem;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.875rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
}

.btn-primary {
  background: var(--accent);
  color: var(--bg-primary);
}

.btn-primary:hover {
  background: var(--accent-hover);
  transform: translateY(-2px);
}

.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border);
}

.btn-secondary:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border);
}

.stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: var(--accent);
}

.stat-label {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

/* API Info */
.api-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg-secondary);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  flex-wrap: wrap;
}

.api-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.api-dot {
  width: 8px;
  height: 8px;
  background: #22c55e;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.api-endpoint {
  background: var(--bg-card);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-family: monospace;
  font-size: 0.875rem;
  color: var(--accent);
}

/* Categories */
.categories {
  padding: 4rem 0;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 0.5rem;
}

.section-subtitle {
  color: var(--text-secondary);
  text-align: center;
  margin-bottom: 2.5rem;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.category-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s;
  cursor: pointer;
}

.category-card:hover {
  transform: translateY(-4px);
  border-color: var(--accent);
}

.category-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto 1rem;
  background: rgba(6, 182, 212, 0.15);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.category-icon svg {
  width: 24px;
  height: 24px;
  color: var(--accent);
}

.category-icon.electric {
  background: rgba(34, 197, 94, 0.15);
}

.category-icon.electric svg {
  color: var(--electric);
}

.category-icon.suv {
  background: rgba(245, 158, 11, 0.15);
}

.category-icon.suv svg {
  color: var(--suv);
}

.category-icon.gt {
  background: rgba(139, 92, 246, 0.15);
}

.category-icon.gt svg {
  color: var(--gt);
}

.category-card h3 {
  font-size: 1.125rem;
  margin-bottom: 0.25rem;
}

.category-card p {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

/* Catalog */
.catalog {
  padding: 4rem 0;
  background: var(--bg-secondary);
}

.cars-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* Car Card */
.car-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s;
}

.car-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  border-color: var(--accent);
}

.car-image {
  position: relative;
  height: 180px;
  overflow: hidden;
}

.car-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.car-card:hover .car-image img {
  transform: scale(1.1);
}

.car-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.375rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.car-badge.sports {
  background: rgba(239, 68, 68, 0.9);
  color: white;
}

.car-badge.electric {
  background: rgba(34, 197, 94, 0.9);
  color: white;
}

.car-badge.suv {
  background: rgba(245, 158, 11, 0.9);
  color: white;
}

.car-badge.gt {
  background: rgba(139, 92, 246, 0.9);
  color: white;
}

.car-content {
  padding: 1.25rem;
}

.car-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.car-name {
  font-size: 1.125rem;
  font-weight: 600;
}

.car-year {
  background: var(--bg-secondary);
  padding: 0.25rem 0.625rem;
  border-radius: 4px;
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.car-specs {
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  margin-bottom: 1rem;
}

.spec {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.spec svg {
  width: 16px;
  height: 16px;
  color: var(--accent);
}

.spec span {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.car-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.car-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--accent);
}

.btn-details {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-primary);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-details:hover {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--bg-primary);
}

/* Contact Section */
.contact {
  padding: 4rem 0;
}

.contact-info {
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-secondary);
}

.contact-item svg {
  width: 24px;
  height: 24px;
  color: var(--accent);
}

/* Footer */
.footer {
  background: var(--bg-secondary);
  border-top: 1px solid var(--border);
  padding: 3rem 0 1.5rem;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  text-align: center;
}

.footer-brand {
  margin-bottom: 2rem;
}

.footer-brand .logo {
  justify-content: center;
  margin-bottom: 1rem;
}

.footer-brand p {
  color: var(--text-secondary);
}

.footer-bottom {
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
}

.footer-bottom p {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

/* Responsive */
@media (max-width: 768px) {
  .nav {
    display: none;
  }
  
  .hero-stats {
    gap: 1.5rem;
  }
  
  .stat-number {
    font-size: 1.5rem;
  }
  
  .contact-info {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .hero-buttons {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
  
  .car-specs {
    gap: 0.5rem;
  }
}
`;

// Simple scoping logic
let scopedCss = cssContent
  .replace(/:root {/g, '.autoverse-module {')
  .replace(/body {/g, '.autoverse-module {')
  .replace(/\* {/g, '.autoverse-module * {')
  .replace(/a {/g, '.autoverse-module a {')
  .replace(/img {/g, '.autoverse-module img {')
  .replace(/\.(?!\d)([a-zA-Z0-9_-]+)/g, '.autoverse-module .$1')
  .replace(/\.autoverse-module \.autoverse-module/g, '.autoverse-module'); // fix double prefixing

fs.writeFileSync('c:/Users/DELL/Downloads/proyectomodulos/css/autoverse.css', scopedCss);
console.log('Done CSS');
