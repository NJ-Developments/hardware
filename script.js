// ===================================
// Katz Ace Hardware - JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // ===================================
    // Store Status (Header)
    // ===================================
    function updateHeaderStoreStatus() {
        const storeStatus = document.getElementById('store-status');
        if (!storeStatus) return;

        const now = new Date();
        const day = now.getDay();
        const hour = now.getHours();

        let isOpen = false;

        // Sunday: 8am - 6pm
        if (day === 0) {
            isOpen = hour >= 8 && hour < 18;
        }
        // Monday - Saturday: 7am - 6pm
        else if (day >= 1 && day <= 6) {
            isOpen = hour >= 7 && hour < 18;
        }

        if (isOpen) {
            storeStatus.innerHTML = 'WE ARE <span class="status-open">OPEN</span>.';
        } else {
            storeStatus.innerHTML = 'WE ARE <span class="status-closed">CLOSED</span>.';
        }
    }

    updateHeaderStoreStatus();
    setInterval(updateHeaderStoreStatus, 60000);

    // ===================================
    // Hero Slider
    // ===================================
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    if (slides.length > 0) {
        // Auto-advance slides every 5 seconds
        slideInterval = setInterval(nextSlide, 5000);

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                clearInterval(slideInterval);
                prevSlide();
                slideInterval = setInterval(nextSlide, 5000);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                clearInterval(slideInterval);
                nextSlide();
                slideInterval = setInterval(nextSlide, 5000);
            });
        }
    }

    // ===================================
    // Mobile Menu Toggle
    // ===================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    const navMenu = mainNav ? mainNav.querySelector('.nav-menu') : document.querySelector('.nav-menu');
    const header = document.querySelector('.header');
    const topHeader = document.querySelector('.top-header');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            if (mainNav) mainNav.classList.toggle('menu-open');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                if (mainNav) mainNav.classList.remove('menu-open');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                if (mainNav) mainNav.classList.remove('menu-open');
                document.body.style.overflow = '';
            }
        });
    }

    // Sticky Header Shadow
    let lastScrollY = 0;

    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;

        if (scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScrollY = scrollY;
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 90;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Update Store Status Based on Time
    function updateStoreStatus() {
        const statusBadges = document.querySelectorAll('.status-badge');
        const now = new Date();
        const day = now.getDay();
        const hour = now.getHours();

        let isOpen = false;

        // Sunday: 8am - 6pm
        if (day === 0) {
            isOpen = hour >= 8 && hour < 18;
        }
        // Monday - Saturday: 7am - 6pm
        else if (day >= 1 && day <= 6) {
            isOpen = hour >= 7 && hour < 18;
        }

        statusBadges.forEach(badge => {
            if (isOpen) {
                badge.innerHTML = '<i class="fas fa-circle"></i> We Are Open';
                badge.classList.add('open');
                badge.classList.remove('closed');
            } else {
                badge.innerHTML = '<i class="fas fa-circle"></i> Currently Closed';
                badge.classList.add('closed');
                badge.classList.remove('open');
            }
        });
    }

    updateStoreStatus();
    setInterval(updateStoreStatus, 60000);

    // Intersection Observer for Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for grid items
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, delay);
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add animation to elements
    const animateElements = document.querySelectorAll(
        '.info-card, .service-card, .brand-card, .feature-card, .testimonial-card, ' +
        '.about-content, .about-image, .contact-info, .contact-form-wrapper, ' +
        '.stat, .section-header'
    );

    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        // Add staggered delay for grid items
        const parent = el.parentElement;
        if (parent && parent.classList.contains('info-cards') ||
            parent && parent.classList.contains('services-grid') ||
            parent && parent.classList.contains('brands-grid') ||
            parent && parent.classList.contains('features-grid') ||
            parent && parent.classList.contains('testimonials-grid')) {
            const siblings = Array.from(parent.children);
            const siblingIndex = siblings.indexOf(el);
            el.dataset.delay = siblingIndex * 100;
        }

        animateOnScroll.observe(el);
    });

    // CSS for animation
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Counter Animation for Stats
    function animateCounter(element, target, suffix = '') {
        const duration = 2000;
        const startTime = performance.now();
        const startValue = 0;

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(startValue + (target - startValue) * easeOutQuart);

            element.textContent = current.toLocaleString() + suffix;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString() + suffix;
            }
        }

        requestAnimationFrame(updateCounter);
    }

    // Observe stats for counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent;
                const number = parseInt(text.replace(/[^0-9]/g, ''));
                const suffix = text.includes('%') ? '%' : '+';

                if (!isNaN(number)) {
                    entry.target.textContent = '0';
                    animateCounter(entry.target, number, suffix);
                }
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Parallax Effect for Hero
    const hero = document.querySelector('.hero');

    if (hero && window.innerWidth > 768) {
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                hero.style.backgroundPositionY = scrolled * 0.4 + 'px';
            }
        });
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual submission logic)
            setTimeout(() => {
                // Reset form
                this.reset();

                // Show success message
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.backgroundColor = '#28a745';

                // Reset button after delay
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });

        // Form input animations
        const formInputs = contactForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
        });
    }

    // Newsletter Form Handling
    const newsletterForms = document.querySelectorAll('.newsletter-form');

    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const input = this.querySelector('input');
            const submitBtn = this.querySelector('button');
            const originalText = submitBtn.innerHTML;

            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            // Simulate subscription (replace with actual logic)
            setTimeout(() => {
                input.value = '';
                submitBtn.innerHTML = '<i class="fas fa-check"></i>';

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }, 1000);
        });
    });

    // Add hover effect to cards
    const cards = document.querySelectorAll('.service-card:not(.highlight), .feature-card, .info-card:not(.highlight)');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon, .feature-icon, .info-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });

        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon, .feature-icon, .info-icon');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });

    // Smooth reveal for brand cards
    const brandCards = document.querySelectorAll('.brand-card');

    brandCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.1)';
            }
        });

        card.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = '';
            }
        });
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // Typing effect for hero text (optional enhancement)
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle && window.innerWidth > 768) {
        const text = heroTitle.textContent;
        heroTitle.style.opacity = '1';
    }

    console.log('Katz Ace Hardware website loaded successfully!');
});

// Preload critical images
window.addEventListener('load', function() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        if (img.dataset.src) {
            img.src = img.dataset.src;
        }
    });
});
