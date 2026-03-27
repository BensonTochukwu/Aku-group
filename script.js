// NAV SCROLL
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// MOBILE MENU
function toggleMenu() {
    const h = document.getElementById('hamburger');
    const m = document.getElementById('mobile-menu');
    h.classList.toggle('open');
    m.classList.toggle('open');
    m.style.display = m.classList.contains('open') ? 'flex' : 'none';
}
function closeMenu() {
    document.getElementById('hamburger').classList.remove('open');
    const m = document.getElementById('mobile-menu');
    m.classList.remove('open');
    m.style.display = 'none';
}

// SLIDER
let currentSlide = 0;
const track = document.getElementById('testimonials-track');
const cards = track.querySelectorAll('.testimonial-card');
const dotsContainer = document.getElementById('slider-dots');
let slidesPerView = window.innerWidth < 640 ? 1 : window.innerWidth < 900 ? 1 : 3;
let totalSlides = Math.ceil(cards.length / slidesPerView);

function initSlider() {
    slidesPerView = window.innerWidth < 640 ? 1 : window.innerWidth < 900 ? 1 : 3;
    totalSlides = Math.max(1, cards.length - slidesPerView + 1);
    dotsContainer.innerHTML = '';
    for (let i = 0; i < Math.min(totalSlides, cards.length); i++) {
        const d = document.createElement('button');
        d.className = 'slider-dot' + (i === 0 ? ' active' : '');
        d.onclick = () => goTo(i);
        dotsContainer.appendChild(d);
    }
    goTo(0);
}

function goTo(n) {
    currentSlide = Math.max(0, Math.min(n, totalSlides - 1));
    const cardWidth = cards[0].offsetWidth + 24;
    track.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
    document.querySelectorAll('.slider-dot').forEach((d, i) => d.classList.toggle('active', i === currentSlide));
}
function slideNext() { goTo(currentSlide < totalSlides - 1 ? currentSlide + 1 : 0); }
function slidePrev() { goTo(currentSlide > 0 ? currentSlide - 1 : totalSlides - 1); }

window.addEventListener('resize', initSlider);
initSlider();
setInterval(slideNext, 5000);

// FAQ
function toggleFaq(el) {
    const item = el.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
}

// FADE IN
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// FORM
function submitForm() {
    const name = document.getElementById('f-name').value.trim();
    const phone = document.getElementById('f-phone').value.trim();
    const location = document.getElementById('f-location').value.trim();
    if (!name || !phone || !location) {
        alert('Please complete the required fields: Name, Phone, and Location.');
        return;
    }
    const service = document.getElementById('f-service').value || 'Not specified';
    const msg = document.getElementById('f-msg').value || '';
    const waMsg = encodeURIComponent(
        `Hello! I need a quote.\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n📍 Location: ${location}\n🔧 Service: ${service}\n📝 Description: ${msg}`
    );
    window.open(`https://wa.me/2349032675331?text=${waMsg}`, '_blank');
    document.getElementById('form-success').style.display = 'block';
    ['f-name', 'f-phone', 'f-location', 'f-msg'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('f-service').value = '';
    setTimeout(() => { document.getElementById('form-success').style.display = 'none'; }, 6000);
}

// SMOOTH ANCHOR SCROLL (offset for nav)
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const dotContainer = document.querySelector(".dots");

let index = 0;
let interval;

// Create dots dynamically
slides.forEach((_, i) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");

  dot.addEventListener("click", () => goToSlide(i));
  dotContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

function updateSlides() {
  slides.forEach((s, i) => {
    s.classList.toggle("active", i === index);
    dots[i].classList.toggle("active", i === index);
  });
}

function nextSlide() {
  index = (index + 1) % slides.length;
  updateSlides();
}

function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  updateSlides();
}

function goToSlide(i) {
  index = i;
  updateSlides();
}

// Auto play
function startAutoPlay() {
  interval = setInterval(nextSlide, 4000);
}

function stopAutoPlay() {
  clearInterval(interval);
}

// Events
nextBtn.addEventListener("click", () => {
  nextSlide();
  stopAutoPlay();
  startAutoPlay();
});

prevBtn.addEventListener("click", () => {
  prevSlide();
  stopAutoPlay();
  startAutoPlay();
});

// Pause on hover (nice UX)
document.querySelector(".carousel").addEventListener("mouseenter", stopAutoPlay);
document.querySelector(".carousel").addEventListener("mouseleave", startAutoPlay);

// Init
updateSlides();
startAutoPlay();