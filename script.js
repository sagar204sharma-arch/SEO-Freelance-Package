// Smooth scrolling for navigation links
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

// Clients slider functionality
function slideClients(direction) {
    const slider = document.getElementById('clientsSlider');
    const scrollAmount = 300;
    slider.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

// Auto-scroll clients slider
let autoScrollInterval;

function startAutoScroll() {
    const slider = document.getElementById('clientsSlider');
    autoScrollInterval = setInterval(() => {
        if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
            slider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            slider.scrollBy({ left: 300, behavior: 'smooth' });
        }
    }, 3000);
}

function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}

// Start auto-scroll on page load
window.addEventListener('load', () => {
    startAutoScroll();
    
    // Pause on hover
    const slider = document.getElementById('clientsSlider');
    slider.addEventListener('mouseenter', stopAutoScroll);
    slider.addEventListener('mouseleave', startAutoScroll);
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Add animation on scroll for portfolio cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all portfolio and service cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.portfolio-card, .service-card, .about-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});
