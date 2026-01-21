/* ========================================
   STATESIDE STUDIO - Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------
    // Mobile Navigation
    // ----------------------------------------
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');

    // Open mobile menu
    navToggle?.addEventListener('click', () => {
        navMenu?.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close mobile menu
    const closeMenu = () => {
        navMenu?.classList.remove('active');
        document.body.style.overflow = '';
    };

    navClose?.addEventListener('click', closeMenu);

    // Close menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu?.classList.contains('active') &&
            !navMenu.contains(e.target) &&
            !navToggle?.contains(e.target)) {
            closeMenu();
        }
    });

    // ----------------------------------------
    // Header Scroll Effect
    // ----------------------------------------
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add shadow when scrolled
        if (currentScroll > 50) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ----------------------------------------
    // Smooth Scroll for Anchor Links
    // ----------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ----------------------------------------
    // Scroll Reveal Animations
    // ----------------------------------------
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.about__content, .about__image-container, ' +
        '.gallery__item, .testimonial__card, ' +
        '.contact__info, .contact__form'
    );

    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // ----------------------------------------
    // Contact Form Handling
    // ----------------------------------------
    const contactForm = document.getElementById('contact-form');

    contactForm?.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        // Show sending state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Show success message
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.backgroundColor = '#8A9B82';
                contactForm.reset();

                // Reset button after delay
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                }, 3000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            // Show error state
            submitBtn.textContent = 'Error - Try Again';
            submitBtn.style.backgroundColor = '#c44';
            submitBtn.disabled = false;

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.backgroundColor = '';
            }, 3000);
        }
    });

    // ----------------------------------------
    // Active Navigation Link on Scroll
    // ----------------------------------------
    const sections = document.querySelectorAll('section[id]');

    const highlightNavLink = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink?.classList.add('active');
            } else {
                navLink?.classList.remove('active');
            }
        });
    };

    window.addEventListener('scroll', highlightNavLink);
});
