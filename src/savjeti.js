import './input.css';

// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Navbar scroll behavior - starts with white/light colored state since hero has solid bg
const navbar = document.getElementById('navbar');
const logoText = document.getElementById('logo-text');
const logoSubtext = document.getElementById('logo-subtext');

// Set initial state - navbar on subpages starts white/light (not transparent)
navbar?.classList.add('bg-white/95', 'backdrop-blur-md', 'shadow-lg');
logoText?.classList.add('text-primary-900');
logoText?.classList.remove('text-white');
logoSubtext?.classList.add('text-charcoal-500');
logoSubtext?.classList.remove('text-white/70');

// Set desktop nav links initial state
document.querySelectorAll('.nav-link').forEach(link => {
  link.classList.remove('text-white/80', 'hover:text-white');
  link.classList.add('text-charcoal-600', 'hover:text-accent-600');
});

// Highlight current page link
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href && href.includes('savjeti.html') && !link.classList.contains('text-accent-300')) {
    link.classList.add('text-accent-600', 'font-semibold');
  }
});

function updateNavbar() {
  // Subpages keep the navbar white/light regardless of scroll
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add('bg-white', 'shadow-md');
    } else {
      navbar.classList.remove('shadow-md');
    }
  }
}

window.addEventListener('scroll', updateNavbar);

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = mobileMenuBtn?.querySelector('.menu-icon');
const closeIcon = mobileMenuBtn?.querySelector('.close-icon');

// Update mobile menu button color for subpages
if (mobileMenuBtn) {
  mobileMenuBtn.classList.remove('text-white');
  mobileMenuBtn.classList.add('text-charcoal-700');
}

mobileMenuBtn?.addEventListener('click', () => {
  mobileMenu?.classList.toggle('hidden');
  menuIcon?.classList.toggle('hidden');
  closeIcon?.classList.toggle('hidden');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu?.classList.add('hidden');
    menuIcon?.classList.remove('hidden');
    closeIcon?.classList.add('hidden');
  });
});

// Scroll animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll, .animate-on-scroll-left').forEach(el => {
  observer.observe(el);
});

// Scroll to top button
const scrollTopBtn = document.getElementById('scroll-top-btn');
scrollTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
