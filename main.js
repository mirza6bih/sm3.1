import { createClient } from '@supabase/supabase-js';
import emailjs from '@emailjs/browser';
import './index.css';

// Initialize Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// DOM Elements
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
const closeIcon = mobileMenuBtn.querySelector('.close-icon');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');
const errorMessage = document.getElementById('error-message');
const submitBtn = document.getElementById('submit-btn');
const btnText = document.getElementById('btn-text');
const btnIcon = document.getElementById('btn-icon');
const btnSpinner = document.getElementById('btn-spinner');
const scrollTopBtn = document.getElementById('scroll-top-btn');
const currentYearEl = document.getElementById('current-year');

// Set current year
currentYearEl.textContent = new Date().getFullYear();

// Navbar scroll effect
function updateNavbar() {
  if (window.scrollY > 50) {
    navbar.classList.add('bg-white/95', 'backdrop-blur-md', 'shadow-lg', 'shadow-charcoal-200/20');
    navbar.classList.remove('bg-transparent');
    document.getElementById('logo-text').classList.remove('text-white');
    document.getElementById('logo-text').classList.add('text-primary-900');
    document.getElementById('logo-subtext').classList.remove('text-white/70');
    document.getElementById('logo-subtext').classList.add('text-charcoal-400');
    navLinks.forEach(link => {
      link.classList.remove('text-white/80', 'hover:text-white');
      link.classList.add('text-charcoal-600', 'hover:text-accent-600');
    });
    mobileMenuBtn.classList.remove('text-white');
    mobileMenuBtn.classList.add('text-primary-900');
  } else {
    navbar.classList.remove('bg-white/95', 'backdrop-blur-md', 'shadow-lg', 'shadow-charcoal-200/20');
    navbar.classList.add('bg-transparent');
    document.getElementById('logo-text').classList.add('text-white');
    document.getElementById('logo-text').classList.remove('text-primary-900');
    document.getElementById('logo-subtext').classList.add('text-white/70');
    document.getElementById('logo-subtext').classList.remove('text-charcoal-400');
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

// Close mobile menu on link click
mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
  });
});

// Scroll animations
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right, .animate-on-scroll-scale');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => observer.observe(el));
};

animateOnScroll();

// Scroll to top
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Contact form submission
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get form data
  const formData = {
    title: document.getElementById('title').value,
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    project_type: document.getElementById('project_type').value,
    message: document.getElementById('message').value,
  };

  // Show loading state
  submitBtn.disabled = true;
  btnText.textContent = 'Slanje...';
  btnIcon.classList.add('hidden');
  btnSpinner.classList.remove('hidden');
  errorMessage.classList.add('hidden');

  try {
    // Save to Supabase
    const { error: insertError } = await supabase
      .from('contact_submissions')
      .insert([formData]);

    if (insertError) throw insertError;

    // Send email via EmailJS
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      formData,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );

    // Show success
    contactForm.classList.add('hidden');
    successMessage.classList.remove('hidden');

    // Reset after 4 seconds
    setTimeout(() => {
      contactForm.reset();
      contactForm.classList.remove('hidden');
      successMessage.classList.add('hidden');
    }, 4000);

  } catch (err) {
    console.error('Submit error:', err);
    errorMessage.classList.remove('hidden');
  } finally {
    submitBtn.disabled = false;
    btnText.textContent = 'Pošaljite Poruku';
    btnIcon.classList.remove('hidden');
    btnSpinner.classList.add('hidden');
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
