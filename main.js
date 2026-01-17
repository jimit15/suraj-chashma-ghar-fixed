// Navigation Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Animated Counter for Hero Stats
function animateCounter(id, start, end, duration) {
    const element = document.getElementById(id);
    let startTimestamp = null;
    
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString();
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    
    window.requestAnimationFrame(step);
}

// Start counter animation when page loads
window.addEventListener('load', function() {
    animateCounter('customerCount', 0, 5000, 2000);
    animateCounter('loanCount', 0, 3500, 2000);
    animateCounter('processingTime', 0, 24, 2000);
});

// EMI Calculator
const loanAmountInput = document.getElementById('loanAmount');
const loanAmountRange = document.getElementById('loanAmountRange');
const loanAmountDisplay = document.getElementById('loanAmountDisplay');

const interestRateInput = document.getElementById('interestRate');
const interestRateRange = document.getElementById('interestRateRange');
const interestRateDisplay = document.getElementById('interestRateDisplay');

const loanTenureInput = document.getElementById('loanTenure');
const loanTenureRange = document.getElementById('loanTenureRange');
const loanTenureDisplay = document.getElementById('loanTenureDisplay');

// Sync range sliders with input fields
loanAmountRange.addEventListener('input', function() {
    const value = parseInt(this.value);
    loanAmountInput.value = value;
    loanAmountDisplay.textContent = '₹' + value.toLocaleString();
});

loanAmountInput.addEventListener('input', function() {
    const value = parseInt(this.value) || 0;
    if (value >= 10000 && value <= 10000000) {
        loanAmountRange.value = value;
        loanAmountDisplay.textContent = '₹' + value.toLocaleString();
    }
});

interestRateRange.addEventListener('input', function() {
    const value = parseFloat(this.value);
    interestRateInput.value = value;
    interestRateDisplay.textContent = value + '%';
});

interestRateInput.addEventListener('input', function() {
    const value = parseFloat(this.value) || 0;
    if (value >= 5 && value <= 20) {
        interestRateRange.value = value;
        interestRateDisplay.textContent = value + '%';
    }
});

loanTenureRange.addEventListener('input', function() {
    const value = parseInt(this.value);
    loanTenureInput.value = value;
    const years = Math.floor(value / 12);
    const months = value % 12;
    let displayText = value + ' months';
    if (years > 0) {
        displayText += ' (' + years + ' year' + (years > 1 ? 's' : '');
        if (months > 0) {
            displayText += ' ' + months + ' month' + (months > 1 ? 's' : '');
        }
        displayText += ')';
    }
    loanTenureDisplay.textContent = displayText;
});

loanTenureInput.addEventListener('input', function() {
    const value = parseInt(this.value) || 0;
    if (value >= 6 && value <= 360) {
        loanTenureRange.value = value;
        const years = Math.floor(value / 12);
        const months = value % 12;
        let displayText = value + ' months';
        if (years > 0) {
            displayText += ' (' + years + ' year' + (years > 1 ? 's' : '');
            if (months > 0) {
                displayText += ' ' + months + ' month' + (months > 1 ? 's' : '');
            }
            displayText += ')';
        }
        loanTenureDisplay.textContent = displayText;
    }
});

// EMI Calculation Form
const emiForm = document.getElementById('emiForm');
const emiResult = document.getElementById('emiResult');

emiForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const principal = parseFloat(loanAmountInput.value);
    const annualRate = parseFloat(interestRateInput.value);
    const tenure = parseInt(loanTenureInput.value);
    
    if (principal && annualRate && tenure) {
        // EMI Formula: P × r × (1 + r)^n / ((1 + r)^n - 1)
        const monthlyRate = annualRate / 12 / 100;
        const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, tenure) / (Math.pow(1 + monthlyRate, tenure) - 1);
        
        const totalAmount = emi * tenure;
        const totalInterest = totalAmount - principal;
        
        // Display results
        document.getElementById('emiAmount').textContent = Math.round(emi).toLocaleString();
        document.getElementById('totalInterest').textContent = Math.round(totalInterest).toLocaleString();
        document.getElementById('totalAmount').textContent = Math.round(totalAmount).toLocaleString();
        
        emiResult.style.display = 'block';
        
        // Smooth scroll to result
        emiResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
        alert('Please fill in all fields correctly');
    }
});

// Loan Application Form
const loanApplicationForm = document.getElementById('loanApplicationForm');
const applicationSuccess = document.getElementById('applicationSuccess');

loanApplicationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate phone number
    const phone = document.getElementById('phone').value;
    if (!/^[0-9]{10}$/.test(phone)) {
        alert('Please enter a valid 10-digit phone number');
        return;
    }
    
    // Validate age (must be 18+)
    const dob = new Date(document.getElementById('dob').value);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    
    if (age < 18) {
        alert('You must be at least 18 years old to apply for a loan');
        return;
    }
    
    // Generate random application ID
    const appId = 'LN' + Date.now().toString().slice(-8);
    document.getElementById('appId').textContent = appId;
    
    // Hide form and show success message
    loanApplicationForm.style.display = 'none';
    applicationSuccess.style.display = 'block';
    
    // Smooth scroll to success message
    applicationSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Reset form after 5 seconds
    setTimeout(function() {
        loanApplicationForm.reset();
        loanApplicationForm.style.display = 'block';
        applicationSuccess.style.display = 'none';
    }, 10000);
});

// Contact Form
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Login Modal
const loginModal = document.getElementById('loginModal');
const loginBtn = document.querySelector('a[href="#login"]');
const closeBtn = document.querySelector('.close');
const loginForm = document.getElementById('loginForm');

loginBtn.addEventListener('click', function(e) {
    e.preventDefault();
    loginModal.style.display = 'block';
});

closeBtn.addEventListener('click', function() {
    loginModal.style.display = 'none';
});

window.addEventListener('click', function(e) {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
});

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (email && password) {
        alert('Login functionality will be implemented with backend integration.');
        loginModal.style.display = 'none';
        loginForm.reset();
    }
});

// Scroll Animation for Elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.feature-card, .objective-card, .advantage-item, .enhancement-card');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#login' && href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(function() {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Form validation helpers
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[0-9]{10}$/;
    return re.test(phone);
}

// Real-time form validation
document.getElementById('email')?.addEventListener('blur', function() {
    if (!validateEmail(this.value)) {
        this.style.borderColor = '#dc3545';
    } else {
        this.style.borderColor = '#28a745';
    }
});

document.getElementById('phone')?.addEventListener('blur', function() {
    if (!validatePhone(this.value)) {
        this.style.borderColor = '#dc3545';
    } else {
        this.style.borderColor = '#28a745';
    }
});

// Auto-format currency inputs
function formatCurrency(input) {
    let value = input.value.replace(/,/g, '');
    if (!isNaN(value) && value !== '') {
        input.value = parseInt(value).toLocaleString();
    }
}

document.getElementById('loanAmountApply')?.addEventListener('blur', function() {
    formatCurrency(this);
});

document.getElementById('monthlyIncome')?.addEventListener('blur', function() {
    formatCurrency(this);
});

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

console.log('Finance/Loan Management System - Developed by Gandhi Aagam, Shah Astha, and Khatri Jimit');
console.log('BCA Semester 6 - JG University');



