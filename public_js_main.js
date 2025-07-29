// Mobile Hamburger Menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// Dropdowns (desktop)
document.querySelectorAll('nav ul.md\\:flex > li.relative').forEach(drop => {
  drop.addEventListener('mouseenter', function () {
    this.querySelector('ul').classList.remove('hidden');
  });
  drop.addEventListener('mouseleave', function () {
    this.querySelector('ul').classList.add('hidden');
  });
});

// Carousel Logic
const slides = document.querySelectorAll('#carousel-slides img');
const carousel = document.getElementById('carousel-slides');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const indicators = document.getElementById('indicators');
let currentSlide = 0;
let carouselInterval;

function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
  updateIndicators();
}

function updateIndicators() {
  if (!indicators) return;
  indicators.innerHTML = '';
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('button');
    dot.className = `w-3 h-3 rounded-full mx-1 focus:outline-none ${i === currentSlide ? 'bg-green-700' : 'bg-green-200'}`;
    dot.addEventListener('click', () => {
      showSlide(i);
      resetInterval();
    });
    indicators.appendChild(dot);
  }
}

function nextSlide() {
  showSlide(currentSlide + 1);
  resetInterval();
}

function prevSlide() {
  showSlide(currentSlide - 1);
  resetInterval();
}

function resetInterval() {
  clearInterval(carouselInterval);
  carouselInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
}

if (slides.length) {
  showSlide(0);
  carouselInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
}