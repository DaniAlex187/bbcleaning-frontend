// Testimonials data
const testimonials = [

];

// Global variables
let currentTestimonial = 0;

// DOM Elements
const header = document.getElementById('header');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');
const submitBtn = document.getElementById('submitBtn');
const submitText = document.getElementById('submitText');
const submitLoader = document.getElementById('submitLoader');

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-link-mobile').forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
    });
});

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // Close mobile menu if open
        mobileNav.classList.remove('active');
    }
}

// Add click events to all navigation links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// Testimonials functionality
function renderStars(rating) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            starsHtml += '<span class="star">★</span>';
        } else {
            starsHtml += '<span class="star empty">★</span>';
        }
    }
    return starsHtml;
}

function renderTestimonial(index) {
    const testimonial = testimonials[index];
    
    document.getElementById('testimonialStars').innerHTML = renderStars(testimonial.rating);
    document.getElementById('testimonialContent').textContent = `"${testimonial.content}"`;
    document.getElementById('authorImage').src = testimonial.imageUrl;
    document.getElementById('authorImage').alt = testimonial.name;
    document.getElementById('authorName').textContent = testimonial.name;
    document.getElementById('authorRole').textContent = testimonial.role;
}

function renderDots() {
    const dotsContainer = document.getElementById('testimonialDots');
    let dotsHtml = '';
    
    testimonials.forEach((_, index) => {
        dotsHtml += `<span class="dot ${index === currentTestimonial ? 'active' : ''}" onclick="goToTestimonial(${index})"></span>`;
    });
    
    dotsContainer.innerHTML = dotsHtml;
}

function goToTestimonial(index) {
    currentTestimonial = index;
    renderTestimonial(currentTestimonial);
    renderDots();
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    renderTestimonial(currentTestimonial);
    renderDots();
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    renderTestimonial(currentTestimonial);
    renderDots();
}

// Initialize testimonials
document.addEventListener('DOMContentLoaded', () => {
    renderTestimonial(0);
    renderDots();
    
    // Add event listeners for testimonial controls
    document.getElementById('nextBtn').addEventListener('click', nextTestimonial);
    document.getElementById('prevBtn').addEventListener('click', prevTestimonial);
});

// Contact form handling
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Show loading state
    submitBtn.disabled = true;
    submitText.style.display = 'none';
    submitLoader.style.display = 'inline-block';
    
    
    // Collect form data
    const formData = new FormData(contactForm);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Send data to backend
    fetch('https://bbcleaning-backend.vercel.app/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        // Hide loading state
        submitBtn.disabled = false;
        submitText.style.display = 'inline';
        submitLoader.style.display = 'none';

        if (response.ok) {
            // Hide form and show success message
            contactForm.style.display = 'none';
            successMessage.style.display = 'flex';

            // Reset form and show it again after 3 seconds
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'flex';
                successMessage.style.display = 'none';
            }, 3000);
        } else {
            alert('There was an error submitting the form. Please try again.');
        }
    })
    .catch(error => {
        submitBtn.disabled = false;
        submitText.style.display = 'inline';
        submitLoader.style.display = 'none';
        alert('There was an error submitting the form. Please try again.');
    });
});