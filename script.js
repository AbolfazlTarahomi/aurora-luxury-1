document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const header = document.querySelector('.main-header');
    const navLinks = document.querySelectorAll('.nav-link');
    const headerBtn = document.querySelector('.header-btn');

    // Toggle Mobile Menu
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Sticky Header & Active Link Highlighting
    const sections = document.querySelectorAll('section[id]');
    const headerHeight = header ? header.offsetHeight : 70;

    const scrollActive = () => {
        let currentScrollPos = window.scrollY;

        // Add/remove 'scrolled' class to header for style changes
        if (header) {
            if (currentScrollPos > headerHeight) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Highlight active nav link based on scroll position
        let currentSection = null;
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - headerHeight - 50; // Adjust offset based on header height and desired buffer
            const sectionId = section.getAttribute('id');

            if (currentScrollPos >= sectionTop && currentScrollPos < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', scrollActive);
    scrollActive(); // Initial call to set active state on load

    // 3D Tilt Effect for Product Cards and Hero Card
    const tiltElements = document.querySelectorAll('.tilt-card');
    if (tiltElements.length > 0 && typeof VanillaTilt !== 'undefined') {
        tiltElements.forEach(element => {
            VanillaTilt.init(element, {
                max: 15, // Maximum rotation
                speed: 500, // Speed of the transition
                glare: true, // Enable glare effect
                'max-glare': 0.3, // Max glare opacity
                scale: 1.05 // Scale effect on hover
            });
        });
    } else if (tiltElements.length > 0) {
        console.warn("VanillaTilt library not found. 3D tilt effects will not work. Make sure it's included.");
    }

    // Smooth scroll for anchor links (optional, as CSS scroll-behavior does this)
    // document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    //     anchor.addEventListener('click', function (e) {
    //         e.preventDefault();
    //         const targetId = this.getAttribute('href');
    //         const targetElement = document.querySelector(targetId);
    //         if (targetElement) {
    //             const offsetTop = targetElement.offsetTop - headerHeight - 50; // Adjust for header
    //             window.scrollTo({
    //                 top: offsetTop,
    //                 behavior: 'smooth'
    //             });
    //         }
    //     });
    // });

    // Form Validation & Submission (Placeholder)
    const inquiryForm = document.getElementById('inquiry-form');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Here you would typically handle form submission via AJAX or redirect
            alert('فرم شما با موفقیت ارسال شد! کارشناسان آرورا به زودی با شما تماس خواهند گرفت.');
            inquiryForm.reset(); // Reset form fields
        });
    }
});

// ---- Script for 3D Tilt Effect ----
// IMPORTANT: You need to include the VanillaTilt library in your HTML <head> for this to work:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.7.0/vanilla-tilt.min.js"></script>

// Example of how it's used in HTML:
// <div class="product-card tilt-card" data-tilt> ... </div>
// <div class="hero-3d-card tilt-card" data-tilt> ... </div>
