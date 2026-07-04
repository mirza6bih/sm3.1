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
    logoText?.classList.remove('text-white');
    logoText?.classList.add('text-primary-900');
    logoSubtext?.classList.remove('text-white/70');
    logoSubtext?.classList.add('text-charcoal-500');
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('text-white/80', 'hover:text-white');
      link.classList.add('text-charcoal-600', 'hover:text-accent-600');
    });
  } else {
    navbar.classList.remove('bg-white/95', 'backdrop-blur-md', 'shadow-lg');
    navbar.classList.add('bg-transparent');
    logoText?.classList.add('text-white');
    logoText?.classList.remove('text-primary-900');
    logoSubtext?.classList.add('text-white/70');
    logoSubtext?.classList.remove('text-charcoal-500');
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.add('text-white/80', 'hover:text-white');
      link.classList.remove('text-charcoal-600', 'hover:text-accent-600');
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

// Check all animated elements immediately for those already in view
function checkAnimatedElements() {
  document.querySelectorAll('.animate-on-scroll, .animate-on-scroll-left').forEach(el => {
    const rect = el.getBoundingClientRect();
    const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
    if (isInViewport) {
      el.classList.add('is-visible');
    }
    observer.observe(el);
  });
}

// Run on load
checkAnimatedElements();

// Scroll to top button
const scrollTopBtn = document.getElementById('scroll-top-btn');
scrollTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Contact form handling with EmailJS
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');
const errorMessage = document.getElementById('error-message');
const submitBtn = document.getElementById('submit-btn');
const btnText = document.getElementById('btn-text');
const btnIcon = document.getElementById('btn-icon');
const btnSpinner = document.getElementById('btn-spinner');

contactForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Show loading state
  submitBtn.disabled = true;
  btnText.textContent = 'Šalje se...';
  btnIcon?.classList.add('hidden');
  btnSpinner?.classList.remove('hidden');

  const formData = new FormData(contactForm);
  const data = {
    title: formData.get('title'),
    name: formData.get('name'),
    email: formData.get('email'),
    project_type: formData.get('project_type'),
    message: formData.get('message')
  };

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      contactForm.classList.add('hidden');
      successMessage?.classList.remove('hidden');
    } else {
      throw new Error('Failed to send');
    }
  } catch (error) {
    errorMessage?.classList.remove('hidden');
    setTimeout(() => {
      errorMessage?.classList.add('hidden');
    }, 5000);
  } finally {
    submitBtn.disabled = false;
    btnText.textContent = 'Pošaljite Poruku';
    btnIcon?.classList.remove('hidden');
    btnSpinner?.classList.add('hidden');
  }
});
