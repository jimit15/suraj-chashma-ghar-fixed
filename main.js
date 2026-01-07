// Remove loading screen
window.addEventListener('load', function() {
    setTimeout(() => {
        document.querySelector('.loading').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.loading').style.display = 'none';
        }, 500);
    }, 1000);
});

// Active nav link on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Animate service cards on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 1s';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card').forEach(card => {
    observer.observe(card);
});

// Store hours status
function updateStoreStatus() {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    const minute = now.getMinutes();
    
    let isOpen = false;
    let message = '';
    
    // Lunch break 1PM-2PM
    if (hour === 13) {
        message = '⏸️ Lunch Break (1:00-2:00 PM)';
    } else if (day === 0) { // Sunday
        isOpen = hour >= 9 && hour < 19;
        message = isOpen ? '✅ Open - Closes 7:00 PM' : '❌ Closed';
    } else { // Monday-Saturday
        isOpen = hour >= 9 && hour < 21;
        message = isOpen ? '✅ Open - Closes 9:00 PM' : '❌ Closed';
    }
    
    console.log('Store Status:', message);
}

updateStoreStatus();
setInterval(updateStoreStatus, 60000);

// Add click animations
document.querySelectorAll('.btn, .service-card, .info-card').forEach(element => {
    element.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});

// Smooth scroll for nav links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// WhatsApp message template
const whatsappNumber = '917069343403';
const defaultMessage = encodeURIComponent('Hello Suraj Chashma Ghar! I would like to know more about your services.');

document.querySelector('.whatsapp-float').href = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

