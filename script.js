// Katz ACE Hardware - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize slideshow
    initSlider();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Update store open/closed status
    updateStoreStatus();
    
});

// Slideshow functionality
function initSlider() {
    const slides = document.querySelectorAll('#slider .slide');
    const captions = document.querySelectorAll('.nivo-html-caption');
    const prevBtn = document.querySelector('.nivo-prevNav');
    const nextBtn = document.querySelector('.nivo-nextNav');
    const sliderWrapper = document.querySelector('.slider-wrapper');
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    let slideInterval;
    
    // Create caption display container
    const captionDisplay = document.createElement('div');
    captionDisplay.className = 'caption-display';
    sliderWrapper.appendChild(captionDisplay);
    
    // Show first slide
    showSlide(0);
    
    // Start auto-advance
    startSlideshow();
    
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Show current slide
        slides[index].classList.add('active');
        
        // Update caption
        if (captions[index]) {
            captionDisplay.innerHTML = captions[index].innerHTML;
        }
        
        currentSlide = index;
    }
    
    function nextSlide() {
        let next = currentSlide + 1;
        if (next >= slides.length) next = 0;
        showSlide(next);
    }
    
    function prevSlide() {
        let prev = currentSlide - 1;
        if (prev < 0) prev = slides.length - 1;
        showSlide(prev);
    }
    
    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 6000);
    }
    
    function stopSlideshow() {
        clearInterval(slideInterval);
    }
    
    // Navigation buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            stopSlideshow();
            nextSlide();
            startSlideshow();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            stopSlideshow();
            prevSlide();
            startSlideshow();
        });
    }
}

// Mobile menu toggle
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const menuContainer = document.querySelector('.menu-navigation-container');
    const expandedItems = document.querySelectorAll('.menu > li.expanded');
    
    if (navToggle && menuContainer) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            menuContainer.classList.toggle('active');
        });
    }
    
    // Handle dropdown toggle on mobile
    expandedItems.forEach(function(item) {
        const link = item.querySelector(':scope > a');
        if (link && window.innerWidth <= 992) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 992) {
                    e.preventDefault();
                    item.classList.toggle('open');
                }
            });
        }
    });
}

// Store open/closed status
function updateStoreStatus() {
    const statusElement = document.getElementById('open_or_closed');
    if (!statusElement) return;
    
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1-6 = Mon-Sat
    const hour = now.getHours();
    const minute = now.getMinutes();
    const currentTime = hour + (minute / 60);
    
    let isOpen = false;
    
    if (day === 0) {
        // Sunday: 8am - 6pm
        isOpen = currentTime >= 8 && currentTime < 18;
    } else if (day >= 1 && day <= 6) {
        // Monday - Saturday: 7am - 6pm
        isOpen = currentTime >= 7 && currentTime < 18;
    }
    
    if (isOpen) {
        statusElement.textContent = 'open';
        statusElement.className = 'open';
    } else {
        statusElement.textContent = 'closed';
        statusElement.className = 'closed';
    }
}
