// ============================================
// ANIMATED WEBSITE WITH ALL 15 ANIMATIONS
// ============================================

// 1. LOADING ANIMATION WITH GLASSES
const loadingScreen = document.createElement('div');
loadingScreen.className = 'loading-screen';
loadingScreen.innerHTML = `
    <div class="glasses-container">
        <div class="glasses-frame"></div>
        <div class="glasses-bridge"></div>
        <div class="glasses-temples left"></div>
        <div class="glasses-temples right"></div>
    </div>
    <div class="loading-text">
        Suraj Chashma Ghar
        <div class="loading-dots">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
`;

// Add loading screen to body
document.body.appendChild(loadingScreen);

// Remove loading screen after page load
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('loaded');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 800);
    }, 1500);
});

// 2. TYPING EFFECT FOR HERO TEXT
function initTypingEffect() {
    const heroText = document.querySelector('.hero-text h2');
    if (!heroText) return;
    
    const originalText = heroText.textContent;
    const textArray = [
        "Vision Care with Style & Precision",
        "Premium Eyewear Since 2012",
        "Professional Eye Testing",
        "Trusted by Nikol Community"
    ];
    
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let isTyping = true;
    
    heroText.textContent = '';
    
    function type() {
        const currentText = textArray[currentTextIndex];
        
        if (isTyping) {
            if (currentCharIndex < currentText.length) {
                heroText.textContent = currentText.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                setTimeout(type, 100);
            } else {
                isTyping = false;
                setTimeout(() => {
                    isDeleting = true;
                    type();
                }, 2000);
            }
        } else if (isDeleting) {
            if (currentCharIndex > 0) {
                heroText.textContent = currentText.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                setTimeout(type, 50);
            } else {
                isDeleting = false;
                currentTextIndex = (currentTextIndex + 1) % textArray.length;
                isTyping = true;
                setTimeout(type, 500);
            }
        }
    }
    
    // Start typing effect after loading screen
    setTimeout(type, 1800);
}

// 3. GSAP SMOOTH SCROLL ANIMATIONS
function initGSAPAnimations() {
    // Only run if GSAP is available
    if (typeof gsap === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero section animation
    gsap.from('.hero-text', {
        duration: 1,
        y: 50,
        opacity: 0,
        delay: 0.5,
        ease: "power3.out"
    });
    
    gsap.from('.hero-image', {
        duration: 1,
        x: 50,
        opacity: 0,
        delay: 0.8,
        ease: "power3.out"
    });
    
    // Service cards animation
    gsap.from('.service-card', {
        scrollTrigger: {
            trigger: '.services',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: "power3.out"
    });
    
    // About section animation
    gsap.from('.about-text', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 70%',
            toggleActions: 'play none none none'
        },
        duration: 1,
        x: -50,
        opacity: 0,
        ease: "power3.out"
    });
    
    gsap.from('.about-image', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 70%',
            toggleActions: 'play none none none'
        },
        duration: 1,
        x: 50,
        opacity: 0,
        ease: "power3.out"
    });
    
    // Testimonial cards animation
    gsap.from('.testimonial-card', {
        scrollTrigger: {
            trigger: '.testimonials',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.3,
        ease: "power3.out"
    });
    
    // Frame cards animation
    gsap.from('.frame-card', {
        scrollTrigger: {
            trigger: '.frames',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        duration: 0.6,
        y: 30,
        opacity: 0,
        stagger: 0.1,
        ease: "power2.out"
    });
}

// 4. PULSE ANIMATIONS FOR BUTTONS
function initPulseAnimations() {
    const ctaButtons = document.querySelectorAll('.btn-primary');
    ctaButtons.forEach(button => {
        button.classList.add('pulse-animation');
        
        // Add hover effect
        button.addEventListener('mouseenter', () => {
            button.style.animationPlayState = 'paused';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.animationPlayState = 'running';
        });
    });
}

// 5. FLOATING ANIMATIONS FOR CARDS
function initFloatingAnimations() {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.classList.add('floating-animation');
    });
    
    const frameCards = document.querySelectorAll('.frame-card');
    frameCards.forEach((card, index) => {
        card.style.animationDelay = `${(index % 3) * 0.5}s`;
    });
}

// 6. ENHANCED HOVER EFFECTS
function initHoverEffects() {
    // Add zoom hover to images
    const images = document.querySelectorAll('.hero-image, .about-image, .frame-image img');
    images.forEach(img => {
        img.parentElement.classList.add('zoom-hover');
    });
    
    // Add image frame animation
    const heroImage = document.querySelector('.hero-image');
    const aboutImage = document.querySelector('.about-image');
    if (heroImage) heroImage.classList.add('image-frame');
    if (aboutImage) aboutImage.classList.add('image-frame');
}

// 7. COUNTER ANIMATIONS FOR STATS
function initCounterAnimations() {
    const stats = document.querySelectorAll('.stat-number');
    if (stats.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                const duration = 2000;
                const increment = finalValue / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= finalValue) {
                        target.textContent = finalValue + '+';
                        clearInterval(timer);
                    } else {
                        target.textContent = Math.floor(current);
                    }
                }, 16);
                
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

// 8. TESTIMONIAL SLIDER WITH AUTO-ROTATION
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    if (testimonials.length === 0) return;
    
    let currentIndex = 0;
    
    // Initially show first testimonial
    testimonials.forEach((testimonial, index) => {
        testimonial.style.opacity = '0';
        testimonial.style.position = 'absolute';
        if (index === 0) {
            testimonial.style.opacity = '1';
            testimonial.style.position = 'relative';
        }
    });
    
    function showNextTestimonial() {
        // Hide current
        testimonials[currentIndex].style.opacity = '0';
        testimonials[currentIndex].style.position = 'absolute';
        
        // Update index
        currentIndex = (currentIndex + 1) % testimonials.length;
        
        // Show next
        testimonials[currentIndex].style.opacity = '1';
        testimonials[currentIndex].style.position = 'relative';
    }
    
    // Auto rotate every 5 seconds
    setInterval(showNextTestimonial, 5000);
}

// 9. PARALLAX SCROLLING EFFECTS
function initParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero, .about');
        
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.5;
            element.style.backgroundPosition = `center ${rate}px`;
        });
    });
}

// 10. BACK TO TOP BUTTON
function initBackToTopButton() {
    const backToTopBtn = document.createElement('div');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(backToTopBtn);
    
    // Show/hide button on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top on click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 11. WAVE ANIMATIONS
function initWaveAnimations() {
    // Wave is already implemented in CSS
    // This function is for potential JS control
}

// 12. SOCIAL MEDIA ICON ANIMATIONS
function initSocialAnimations() {
    const socialIcons = document.querySelectorAll('.social-links a, .float-btn');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'translateY(-5px) scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// 13. FILTER BUTTON ANIMATIONS
function initFilterAnimations() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// 14. FADE IN ON SCROLL
function initFadeInOnScroll() {
    const fadeElements = document.querySelectorAll('.service-card, .frame-card, .testimonial-card, .category-card, .contact-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// 15. MOBILE OPTIMIZED ANIMATIONS
function optimizeAnimationsForMobile() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Reduce animation intensity on mobile
        document.documentElement.style.setProperty('--animation-duration-multiplier', '1.5');
        
        // Disable some heavy animations on low-end devices
        if ('hardwareConcurrency' in navigator && navigator.hardwareConcurrency <= 4) {
            const heavyAnimations = document.querySelectorAll('.floating-animation, .pulse-animation');
            heavyAnimations.forEach(el => {
                el.style.animation = 'none';
            });
        }
    }
}
// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
const mobileLinks = document.querySelectorAll('.mobile-nav a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
    });
});

// Store Status Update
function updateStoreStatus() {
    const statusElement = document.getElementById('storeStatus');
    if (!statusElement) return;
    
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hour + minutes / 60;
    
    let isOpen = false;
    let message = '';
    let statusClass = '';
    
    // Check if it's lunch break (1 PM to 2 PM daily)
    const isLunchBreak = currentTime >= 13 && currentTime < 14;
    
    if (isLunchBreak) {
        message = '⏸️ Lunch Break (1:00 PM - 2:00 PM)';
        statusClass = 'lunch';
    } else {
        // Regular hours check
        if (day >= 1 && day <= 6) { // Monday to Saturday
            if (currentTime >= 9 && currentTime < 21) {
                isOpen = true;
                const closingTime = 21; // 9 PM
                const timeLeft = closingTime - currentTime;
                const hoursLeft = Math.floor(timeLeft);
                const minutesLeft = Math.round((timeLeft - hoursLeft) * 60);
                
                message = '✅ Open Now';
                if (hoursLeft < 2) {
                    message += ` (Closes in ${hoursLeft} hour${hoursLeft > 1 ? 's' : ''}`;
                    if (minutesLeft > 0) {
                        message += ` ${minutesLeft} min`;
                    }
                    message += ')';
                } else {
                    message += ' - Closes 9:00 PM';
                }
                statusClass = 'open';
            } else {
                message = '❌ Closed Now';
                if (currentTime < 9) {
                    message += ' - Opens at 9:00 AM';
                } else {
                    message += ' - Opens Tomorrow at 9:00 AM';
                }
                statusClass = 'closed';
            }
        } else { // Sunday
            if (currentTime >= 9 && currentTime < 19) {
                isOpen = true;
                const closingTime = 19; // 7 PM
                const timeLeft = closingTime - currentTime;
                const hoursLeft = Math.floor(timeLeft);
                const minutesLeft = Math.round((timeLeft - hoursLeft) * 60);
                
                message = '✅ Open Now';
                if (hoursLeft < 2) {
                    message += ` (Closes in ${hoursLeft} hour${hoursLeft > 1 ? 's' : ''}`;
                    if (minutesLeft > 0) {
                        message += ` ${minutesLeft} min`;
                    }
                    message += ')';
                } else {
                    message += ' - Closes 7:00 PM';
                }
                statusClass = 'open';
            } else {
                message = '❌ Closed Now';
                if (currentTime < 9) {
                    message += ' - Opens at 9:00 AM';
                } else {
                    message += ' - Opens Tomorrow at 9:00 AM';
                }
                statusClass = 'closed';
            }
        }
    }
    
    statusElement.textContent = message;
    statusElement.className = `status ${statusClass}`;
}

// Initialize store status
updateStoreStatus();
// Update every minute
setInterval(updateStoreStatus, 60000);

// Frame Data
const frames = [
    // Men's Frames
    { 
        id: 1, 
        name: "Classic Rectangle Frame", 
        category: "men", 
        type: ["Plastic"], 
        price: "₹1,499", 
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 

    },
   
    { 
        id: 2, 
        name: "Modern Square Frame", 
        category: "men", 
        type: ["Metal"], 
        price: "₹1,899", 
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
    },
    { 
        id: 3, 
        name: "Executive Rimless", 
        category: "men", 
        type: ["Rimless"], 
        price: "₹2,299", 
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
    },
    
    // Women's Frames
    { 
        id: 4, 
        name: "Cat-Eye Designer Frame", 
        category: "women", 
        type: ["Plastic", "Designer"], 
        price: "₹1,799", 
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
    },
    { 
        id: 5, 
        name: "Elegant Round Frame", 
        category: "women", 
        type: ["Metal"], 
        price: "₹2,199", 
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
    },
    { 
        id: 6, 
        name: "Fashion Oval Frame", 
        category: "women", 
        type: ["Plastic"], 
        price: "₹1,699", 
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
    },
    
    // Kids Frames
    { 
        id: 7, 
        name: "Colorful Kids Frame", 
        category: "kids", 
        type: ["Plastic", "Flexible"], 
        price: "₹999", 
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
    },
    { 
        id: 8, 
        name: "Disney Character Frame", 
        category: "kids", 
        type: ["Plastic"], 
        price: "₹1,299", 
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
    },
    
    // Sunglasses
    { 
        id: 9, 
        name: "UV Protection Aviator", 
        category: "sunglasses", 
        type: ["Metal", "UV Protection"], 
        price: "₹1,999", 
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
    },
    { 
        id: 10, 
        name: "Wayfarer Sunglasses", 
        category: "sunglasses", 
        type: ["Plastic", "UV Protection"], 
        price: "₹1,599", 
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
    },
    { 
        id: 11, 
        name: "Polarized Sports Goggles", 
        category: "sunglasses", 
        type: ["Plastic", "Sports"], 
        price: "₹2,499", 
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
    },
    { 
        id: 12, 
        name: "Designer Sunglasses", 
        category: "sunglasses", 
        type: ["Metal", "Designer"], 
        price: "₹2,999", 
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
    }
];

// Display Frames
function displayFrames(filter = 'all') {
    const framesGrid = document.querySelector('.frames-grid');
    if (!framesGrid) return;
    
    framesGrid.innerHTML = '';
    
    const filteredFrames = filter === 'all' 
        ? frames 
        : frames.filter(frame => frame.category === filter);
    
    if (filteredFrames.length === 0) {
        framesGrid.innerHTML = `
            <div class="no-frames">
                <i class="fas fa-glasses"></i>
                <p>No frames found in this category. Visit our store to see complete collection.</p>
                <a href="#contact" class="btn-primary">Visit Store</a>
            </div>
        `;
        return;
    }
    
    filteredFrames.forEach(frame => {
        const frameCard = document.createElement('div');
        frameCard.className = 'frame-card';
        frameCard.setAttribute('data-category', frame.category);
        
        // Get category display name
        let categoryDisplay = '';
        switch(frame.category) {
            case 'men': categoryDisplay = 'Men'; break;
            case 'women': categoryDisplay = 'Women'; break;
            case 'kids': categoryDisplay = 'Kids'; break;
            case 'sunglasses': categoryDisplay = 'Sunglasses'; break;
        }
        
        frameCard.innerHTML = `
            <div class="frame-image">
                <img src="${frame.image}" alt="${frame.name}" loading="lazy">
            </div>
            <div class="frame-info">
                <div class="frame-category">${categoryDisplay}</div>
                <h3>${frame.name}</h3>
                <div class="frame-type">
                    ${frame.type.map(t => `<span class="type-tag">${t}</span>`).join('')}
                </div>
                <div class="frame-price">${frame.price}</div>
            </div>
        `;
        
        framesGrid.appendChild(frameCard);
    });
}

// Filter Buttons for Frames
const filterButtons = document.querySelectorAll('.filter-btn');
if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value
            const filterValue = button.getAttribute('data-filter');
            
            // Display filtered frames
            displayFrames(filterValue);
        });
    });
}

// Initialize frames display
displayFrames();

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
            }
        }
    });
});

// Add active class to nav links based on scroll position
function highlightNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-nav a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${currentSection}` || (href === '#home' && currentSection === '')) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavOnScroll);

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .frame-card, .testimonial-card, .category-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial state for animation
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.service-card, .frame-card, .testimonial-card, .category-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Initial animation call
    animateOnScroll();
});

window.addEventListener('scroll', animateOnScroll);

// Phone touch optimization
document.addEventListener('touchstart', function() {}, {passive: true});

// Make all buttons and links have proper cursor on touch devices
document.querySelectorAll('button, a').forEach(el => {
    el.style.cursor = 'pointer';
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateStoreStatus();
    displayFrames();
    highlightNavOnScroll();
    animateOnScroll();
});

// Book Eye Test Button Action
document.querySelectorAll('.btn-primary[href="#contact"]').forEach(button => {
    button.addEventListener('click', (e) => {
        if (button.getAttribute('href') === '#contact') {
            e.preventDefault();
            
            // Scroll to contact section
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                window.scrollTo({
                    top: contactSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Show a booking message after delay
                setTimeout(() => {
                    const bookingMessage = `To book an eye test:\n\n📞 Call: 70693 43403\n📱 WhatsApp: +91 70693 43403\n\n📍 Visit: Suraj Chashma Ghar, Nikol\n\n⏰ Timing:\nMon-Sat: 9 AM - 9 PM\nSun: 9 AM - 7 PM\nLunch Break: 1 PM - 2 PM`;
                    alert(bookingMessage);
                }, 800);
            }
        }
    });
});


