import './index.css';

// DOM Elements
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
const closeIcon = mobileMenuBtn.querySelector('.close-icon');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const scrollTopBtn = document.getElementById('scroll-top-btn');
const currentYearEl = document.getElementById('current-year');

// Set current year
if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();

// Navbar scroll effect
function updateNavbar() {
  const logoText = document.getElementById('logo-text');
  const logoSubtext = document.getElementById('logo-subtext');
  if (window.scrollY > 50) {
    navbar.classList.add('bg-white/95', 'backdrop-blur-md', 'shadow-lg', 'shadow-charcoal-200/20');
    navbar.classList.remove('bg-transparent');
    logoText.classList.remove('text-white');
    logoText.classList.add('text-primary-900');
    logoSubtext.classList.remove('text-white/70');
    logoSubtext.classList.add('text-charcoal-400');
    navLinks.forEach(link => {
      link.classList.remove('text-white/80', 'hover:text-white');
      link.classList.add('text-charcoal-600', 'hover:text-accent-600');
    });
    mobileMenuBtn.classList.remove('text-white');
    mobileMenuBtn.classList.add('text-primary-900');
  } else {
    navbar.classList.remove('bg-white/95', 'backdrop-blur-md', 'shadow-lg', 'shadow-charcoal-200/20');
    navbar.classList.add('bg-transparent');
    logoText.classList.add('text-white');
    logoText.classList.remove('text-primary-900');
    logoSubtext.classList.add('text-white/70');
    logoSubtext.classList.remove('text-charcoal-400');
    navLinks.forEach(link => {
      link.classList.add('text-white/80', 'hover:text-white');
      link.classList.remove('text-charcoal-600', 'hover:text-accent-600');
    });
    mobileMenuBtn.classList.add('text-white');
    mobileMenuBtn.classList.remove('text-primary-900');
  }
}

window.addEventListener('scroll', updateNavbar);
updateNavbar();

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  menuIcon.classList.toggle('hidden');
  closeIcon.classList.toggle('hidden');
});

mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
  });
});

// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right, .animate-on-scroll-scale')
  .forEach(el => observer.observe(el));

// Scroll to top
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Smooth scroll for on-page anchor links only
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#' || href.length < 2) return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
