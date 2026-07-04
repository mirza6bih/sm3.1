import './input.css';

// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Navbar scroll behavior
const navbar = document.getElementById('navbar');
const logoText = document.getElementById('logo-text');
const logoSubtext = document.getElementById('logo-subtext');

function updateNavbar() {
  if (window.scrollY > 50) {
    navbar.classList.add('bg-white/95', 'backdrop-blur-md', 'shadow-lg');
    navbar.classList.remove('bg-transparent');
    document.getElementById('mobile-menu')?.classList.add('bg-white');
    logoText?.classList.remove('text-white');
    logoText?.classList.add('text-primary-900');
    logoSubtext?.classList.remove('text-white/70');
    logoSubtext?.classList.add('text-charcoal-500');
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('text-white/80', 'hover:text-white');
      link.classList.add('text-charcoal-600', 'hover:text-accent-600');
    });
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.classList.remove('text-white/80');
      link.classList.add('text-charcoal-700');
    });
  } else {
    navbar.classList.remove('bg-white/95', 'backdrop-blur-md', 'shadow-lg');
    navbar.classList.add('bg-transparent');
    document.getElementById('mobile-menu')?.classList.remove('bg-white');
    logoText?.classList.add('text-white');
    logoText?.classList.remove('text-primary-900');
    logoSubtext?.classList.add('text-white/70');
    logoSubtext?.classList.remove('text-charcoal-500');
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.add('text-white/80', 'hover:text-white');
      link.classList.remove('text-charcoal-600', 'hover:text-accent-600');
    });
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.classList.add('text-white/80');
      link.classList.remove('text-charcoal-700');
    });
  }
}

window.addEventListener('scroll', updateNavbar);
updateNavbar();

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = mobileMenuBtn?.querySelector('.menu-icon');
const closeIcon = mobileMenuBtn?.querySelector('.close-icon');

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
