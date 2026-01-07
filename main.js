// Mobile Menu
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');

mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
});

// Close menu when clicking links
document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
    });
});

// Scroll progress
window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Animate on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.feature, .btn-primary, .btn-secondary');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate-fade-in');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    
    // Add hover effect to logo
    const logo = document.querySelector('.logo');
    logo.addEventListener('mouseenter', () => {
        logo.querySelector('.logo-icon').style.animationPlayState = 'running';
    });
    
    logo.addEventListener('mouseleave', () => {
        logo.querySelector('.logo-icon').style.animationPlayState = 'paused';
    });
    
    // Remove loading screen after 1 second
    setTimeout(() => {
        document.querySelector('.loading').style.animation = 'fadeOut 0.5s forwards';
        setTimeout(() => {
            document.querySelector('.loading').style.display = 'none';
        }, 500);
    }, 1000);
});

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; visibility: hidden; }
    }
`;
document.head.appendChild(style);
