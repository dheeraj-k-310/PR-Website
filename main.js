/*******************************************
 * Mobile Navigation & Smooth Scrolling
 ******************************************/
// Toggle mobile navigation
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    const headerOffset = 80;
    const elementPosition = target.offsetTop;
    const offsetPosition = elementPosition - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    // Close mobile menu if open
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    }
  });
});

/*******************************************
 * Scroll Animation & Active Nav Link
 ******************************************/
// Intersection Observer for section animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);
document.querySelectorAll('section').forEach(section => observer.observe(section));

// Highlight active navigation link based on scroll position
function highlightActiveNavLink() {
  const sections = document.querySelectorAll('section');
  const navLinkElements = document.querySelectorAll('.nav-links a');
  const scrollPosition = window.scrollY + 150;
  let currentSection = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });
  navLinkElements.forEach(link => {
    const href = link.getAttribute('href').substring(1);
    if (href === currentSection) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
window.addEventListener('scroll', throttle(highlightActiveNavLink, 100));
document.addEventListener('DOMContentLoaded', highlightActiveNavLink);

/*******************************************
 * WhatsApp Button Visibility & Ripple Effect
 ******************************************/
document.addEventListener('DOMContentLoaded', function() {
    const whatsappButton = document.getElementById('whatsappButton');
    
    // Always show the WhatsApp button on all screens
    whatsappButton.style.display = 'flex';
    
    // Ensure the button stays visible on window resize
    window.addEventListener('resize', function(){
      whatsappButton.style.display = 'flex';
    });
    
    // Ripple effect on click remains unchanged
    whatsappButton.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      this.appendChild(ripple);
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      setTimeout(() => ripple.remove(), 600);
    });
  });
  
/*******************************************
 * Pricing Card & Button Animations
 ******************************************/
document.addEventListener('DOMContentLoaded', function() {
  // Staggered appearance for pricing features
  const featureItems = document.querySelectorAll('.feature-item');
  featureItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    setTimeout(() => {
      item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, 100 + (index * 100));
  });
  
  // Ripple effect for modern buttons
  const buttons = document.querySelectorAll('.btn-modern, .btn-outline-modern');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;
      const ripple = document.createElement('span');
      ripple.classList.add('ripple-effect');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Glow effect for pricing card on hover
  const pricingCardInner = document.querySelector('.pricing-card-inner');
  if (pricingCardInner) {
    pricingCardInner.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      this.style.setProperty('--mouse-x', `${x}px`);
      this.style.setProperty('--mouse-y', `${y}px`);
    });
  }
  
  // Pulse effect on pricing badge
  const badge = document.querySelector('.pricing-badge');
  if (badge) {
    setInterval(() => {
      badge.classList.add('pulse');
      setTimeout(() => badge.classList.remove('pulse'), 1000);
    }, 3000);
  }

  // Animate custom plan banner on scroll
  const customPlanBanner = document.querySelector('.custom-plan-banner-modern');
  if (customPlanBanner) {
    const bannerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          customPlanBanner.style.opacity = '0';
          customPlanBanner.style.transform = 'translateY(30px)';
          setTimeout(() => {
            customPlanBanner.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            customPlanBanner.style.opacity = '1';
            customPlanBanner.style.transform = 'translateY(0)';
          }, 500);
          bannerObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    bannerObserver.observe(customPlanBanner);
  }
});

/*******************************************
 * Contact Section Animations
 ******************************************/
document.addEventListener('DOMContentLoaded', function() {
  const contactCards = document.querySelectorAll('.contact-card');
  contactCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      const icon = this.querySelector('.contact-icon');
      icon.style.transform = 'scale(1.1) rotate(5deg)';
    });
    card.addEventListener('mouseleave', function() {
      const icon = this.querySelector('.contact-icon');
      icon.style.transform = 'scale(1) rotate(0)';
    });
    card.addEventListener('click', function(e) {
      const ripple = document.createElement('div');
      ripple.classList.add('ripple');
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
  // Animate contact cards on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  contactCards.forEach(card => {
    observer.observe(card);
    card.classList.add('contact-card-animation');
  });
});

/*******************************************
 * Particle Effect Background
 ******************************************/
document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("particleCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let particlesArray = [];
  const particleColor = "rgba(230, 92, 0, 0.3)";
  
  class Particle {
    constructor(x, y, size, speedX, speedY) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.speedX = speedX;
      this.speedY = speedY;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
      ctx.fillStyle = particleColor;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  function initParticles() {
    particlesArray = [];
    for (let i = 0; i < 250; i++) {
      let size = Math.random() * 2 + 0.5;
      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height;
      let speedX = (Math.random() - 0.5) * 1.5;
      let speedY = (Math.random() - 0.5) * 1.5;
      particlesArray.push(new Particle(x, y, size, speedX, speedY));
    }
  }
  
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(particle => {
      particle.update();
      particle.draw();
    });
    requestAnimationFrame(animateParticles);
  }
  
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  });
  
  initParticles();
  animateParticles();
});

/*******************************************
 * Photo Gallery Slider
 ******************************************/
document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".photo-track");
  const items = document.querySelectorAll(".photo-item");
  const dots = document.querySelectorAll(".dot");
  let currentIndex = 0;
  let startX = 0;
  const totalItems = items.length;
  const threshold = 50;
  
  function updateSliderPosition() {
    track.style.transform = `translateX(-${currentIndex * 100}vw)`;
    updateDots();
  }
  
  function updateDots() {
    dots.forEach((dot, idx) => dot.classList.toggle("active", idx === currentIndex));
  }
  
  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });
  
  track.addEventListener("touchmove", (e) => {
    const diffX = e.touches[0].clientX - startX;
    // Prevent vertical scroll if horizontal swipe is dominant
    if (Math.abs(diffX) > 30) e.preventDefault();
  });
  
  track.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const difference = startX - endX;
    if (difference > threshold && currentIndex < totalItems - 1) {
      currentIndex++;
    } else if (difference < -threshold && currentIndex > 0) {
      currentIndex--;
    }
    updateSliderPosition();
  });
  
  dots.forEach((dot, idx) => {
    dot.addEventListener("click", () => {
      currentIndex = idx;
      updateSliderPosition();
    });
  });
  
  window.addEventListener("resize", updateSliderPosition);
});
