// --- Mobile Menu Functionality ---
// Get references to the mobile menu elements
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const closeMobileMenuButton = document.getElementById('close-mobile-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link'); // Get all mobile nav links

// Event listener to open the mobile menu when the hamburger icon is clicked
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.remove('hidden'); // Remove 'hidden' class to show the menu
});

// Event listener to close the mobile menu when the 'X' icon is clicked
closeMobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.add('hidden'); // Add 'hidden' class to hide the menu
});

// Function to close the mobile menu (used by event listeners on links)
function closeMobileMenu() {
    mobileMenu.classList.add('hidden'); // Add 'hidden' class to hide the menu
}

// Add event listeners to all mobile navigation links to close the menu on click
// This is still useful as it immediately closes the menu before the browser navigates to the new page.
mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// --- Loading Animation Functionality ---
// This script runs when the entire page (including images, etc.) has loaded.
window.addEventListener('load', () => {
    const loadingOverlay = document.getElementById('loading-overlay');
    // Add the 'hidden-loader' class to trigger the fade-out and hide it.
    // The CSS transition handles the smooth fade.
    loadingOverlay.classList.add('hidden-loader');
});

// --- Smooth Scrolling for Navigation Links (Removed for external pages) ---
// Since navigation links now point to separate HTML files, the smooth scrolling
// logic that adjusts for the header height is no longer directly applicable
// for the main navigation. The browser will handle the full page load.
// If you had internal anchors *within* a new page (e.g., services.html#design),
// you would re-implement a similar smooth scrolling logic *on that specific page*
// targeting those internal anchors.

// --- Back to Top Button Functionality ---
const backToTopButton = document.getElementById('back-to-top');

// Show/hide the button based on scroll position
window.addEventListener('scroll', () => {
    // If scrolled down more than 300px, show the button
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

// Scroll to top when the button is clicked
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scroll to the top
    });
});

// --- Scroll Reveal Animations ---
// Select all elements that should animate on scroll
const animatedElements = document.querySelectorAll('.animate-on-scroll');

// Options for the Intersection Observer
const observerOptions = {
    root: null, // Use the viewport as the root
    rootMargin: '0px', // No margin around the root
    threshold: 0.1 // Trigger when 10% of the element is visible
};

// Create a new Intersection Observer instance
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        // If the element is intersecting (visible)
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible'); // Add the class to trigger animation
            observer.unobserve(entry.target); // Stop observing once animated (optional, for one-time animation)
        }
    });
}, observerOptions);

// Observe each animated element
animatedElements.forEach(element => {
    observer.observe(element);
});

// --- Contact Form Validation ---
// This logic will only execute if the elements (form, inputs, errors) exist on the page.
// It is primarily relevant for contact.html.
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');
const formSuccessMessage = document.getElementById('form-success-message');

// Function to show an error message
function showError(element, message) {
    if (element) { // Check if element exists
        element.textContent = message;
        element.classList.remove('hidden');
    }
}

// Function to hide an error message
function hideError(element) {
    if (element) { // Check if element exists
        element.classList.add('hidden');
        element.textContent = '';
    }
}

// Validate a single input field
function validateInput(inputElement, errorElement, errorMessage) {
    if (!inputElement) return true; // If element doesn't exist, consider it valid for this page

    if (inputElement.value.trim() === '') {
        showError(errorElement, errorMessage);
        return false;
    } else {
        hideError(errorElement);
        return true;
    }
}

// Validate email format
function validateEmail(emailElement, errorElement) {
    if (!emailElement) return true; // If element doesn't exist, consider it valid for this page

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailElement.value.trim())) {
        showError(errorElement, 'Please enter a valid email address.');
        return false;
    } else {
        hideError(errorElement);
        return true;
    }
}

// Event listener for form submission
if (contactForm) { // Only add listener if the form exists on the page
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission

        let isValid = true; // Flag to track overall form validity

        // Validate each field
        isValid = validateInput(nameInput, nameError, 'Name is required.') && isValid;
        isValid = validateInput(messageInput, messageError, 'Message is required.') && isValid;
        isValid = validateEmail(emailInput, emailError) && isValid; // Email validation includes required check

        if (isValid) {
            // If all fields are valid, you would typically send the form data to a server here.
            // For this example, we'll just show a success message and clear the form.
            console.log('Form submitted successfully!');
            showError(formSuccessMessage, 'Your message has been sent!'); // Re-using showError for success message
            formSuccessMessage.classList.remove('text-red-500'); // Ensure it's not red
            formSuccessMessage.classList.add('text-green-600'); // Make it green
            contactForm.reset(); // Clear the form fields

            // Hide success message after a few seconds
            setTimeout(() => {
                hideError(formSuccessMessage);
            }, 5000);
        } else {
            hideError(formSuccessMessage); // Hide success message if there are errors
        }
    });
}


// --- Testimonial Carousel ---
// This logic will only execute if the elements (carousel container, buttons, slides) exist on the page.
// It is primarily relevant for testimonials.html.
const testimonialSlidesContainer = document.getElementById('testimonial-slides-container');
const prevTestimonialButton = document.getElementById('prev-testimonial');
const nextTestimonialButton = document.getElementById('next-testimonial');
const testimonialSlides = document.querySelectorAll('.testimonial-slide');

let currentSlideIndex = 0; // Keep track of the current slide

// Function to update the carousel display
function updateCarousel() {
    if (!testimonialSlidesContainer || testimonialSlides.length === 0) return; // Exit if elements not found

    // Calculate the offset needed to show the current slide
    const offset = -currentSlideIndex * 100; // Each slide is 100% width
    testimonialSlidesContainer.style.transform = `translateX(${offset}%)`;
}

// Event listener for the 'Previous' button
if (prevTestimonialButton) {
    prevTestimonialButton.addEventListener('click', () => {
        currentSlideIndex--; // Decrement the index
        // If at the beginning, loop to the last slide
        if (currentSlideIndex < 0) {
            currentSlideIndex = testimonialSlides.length - 1;
        }
        updateCarousel(); // Update the display
    });
}

// Event listener for the 'Next' button
if (nextTestimonialButton) {
    nextTestimonialButton.addEventListener('click', () => {
        currentSlideIndex++; // Increment the index
        // If at the end, loop back to the first slide
        if (currentSlideIndex >= testimonialSlides.length) {
            currentSlideIndex = 0;
        }
        updateCarousel(); // Update the display
    });
}

// Initialize carousel on page load
// This will run on any page, but updateCarousel will only do something if elements exist.
updateCarousel();
