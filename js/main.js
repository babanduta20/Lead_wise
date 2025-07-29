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

// --- Carousel Logic ---
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('#carousel-slides img');
  const carouselSlides = document.getElementById('carousel-slides');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const indicators = document.getElementById('indicators');
  let currentSlide = 0;
  let carouselInterval;

  // Set the width of the slides container
  function updateSlideWidths() {
    carouselSlides.style.width = `${slides.length * 100}%`;
    slides.forEach(slide => {
      slide.style.width = `${100 / slides.length}%`;
    });
  }

  // Show the correct slide
  function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    carouselSlides.style.transform = `translateX(-${currentSlide * (100 / slides.length)}%)`;
    updateIndicators();
  }

  // Create indicator dots
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
    carouselInterval = setInterval(() => showSlide(currentSlide + 1), 4000);
  }

  if (slides.length) {
    updateSlideWidths();
    showSlide(0);
    carouselInterval = setInterval(() => showSlide(currentSlide + 1), 4000);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    window.addEventListener('resize', updateSlideWidths);
  }
});
// Dropdown click-to-open logic
document.querySelectorAll('.project-dropdown-btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    const menu = this.parentElement.querySelector('.project-dropdown-menu');
    // Close other open dropdowns if you have multiple
    document.querySelectorAll('.project-dropdown-menu').forEach(m => {
      if (m !== menu) m.classList.add('hidden');
    });
    menu.classList.toggle('hidden');
  });
});

// Optional: close dropdown when clicking outside
document.addEventListener('click', function (e) {
  document.querySelectorAll('.project-dropdown-menu').forEach(menu => {
    if (!menu.contains(e.target) && !menu.previousElementSibling.contains(e.target)) {
      menu.classList.add('hidden');
    }
  });
});


window.addEventListener('scroll', function () {
      const footer = document.getElementById('disappearing-footer');
      // Check if at (or very near) bottom
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2) {
        footer.classList.add('opacity-0', 'pointer-events-none');
      } else {
        footer.classList.remove('opacity-0', 'pointer-events-none');
      }
    });
