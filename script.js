// Custom cursor
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Scroll handling
const scrollIndicator = document.querySelector('.scroll-indicator');
const introContent = document.querySelector('.intro-content');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    
    // Handle scroll indicator
    if (st > 100) {
        scrollIndicator.classList.add('hidden');
    } else if (st < 50) {
        scrollIndicator.classList.remove('hidden');
    }
    
    // Fade out intro content based on scroll
    if (st > 0) {
        const opacity = Math.max(0, Math.min(1, (400 - st) / 400));
        introContent.style.opacity = opacity;
    } else {
        introContent.style.opacity = 1;
    }
    
    lastScrollTop = st <= 0 ? 0 : st;
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.section-content').forEach((section) => {
    observer.observe(section);
});

// Parallax effect for the intro section with reduced intensity
const introSection = document.querySelector('#intro');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (scrolled < window.innerHeight) {
        introSection.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Handle scroll indicator click
scrollIndicator.addEventListener('click', () => {
    const nextSection = document.querySelector('#context');
    nextSection.scrollIntoView({ behavior: 'smooth' });
});

// Add hover effect to visualization cards
const vizCards = document.querySelectorAll('.viz-card');
vizCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'progress-bar';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
});

// Add styles for progress bar
const style = document.createElement('style');
style.textContent = `
    .progress-bar {
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: var(--accent-color);
        z-index: 1001;
        transition: width 0.1s ease;
    }
`;
document.head.appendChild(style);

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        window.scrollBy({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    } else if (e.key === 'ArrowUp') {
        window.scrollBy({
            top: -window.innerHeight,
            behavior: 'smooth'
        });
    }
});

// Add touch swipe navigation for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeDistance = touchStartY - touchEndY;
    if (Math.abs(swipeDistance) > 100) {
        if (swipeDistance > 0) {
            // Swipe up
            window.scrollBy({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        } else {
            // Swipe down
            window.scrollBy({
                top: -window.innerHeight,
                behavior: 'smooth'
            });
        }
    }
} 