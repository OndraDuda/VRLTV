// Global JavaScript functionality for VRL website

document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeSwitch = document.getElementById('themeSwitch');
    if (themeSwitch) {
        const themeIcon = themeSwitch.querySelector('i');

        themeSwitch.addEventListener('click', () => {
            document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
            themeIcon.className = document.body.dataset.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

            // Save theme preference to localStorage
            localStorage.setItem('theme', document.body.dataset.theme);
        });

        // Load saved theme or set default dark
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.body.dataset.theme = savedTheme;
            themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        } else {
            document.body.dataset.theme = 'dark'; // default dark
            themeIcon.className = 'fas fa-sun';
        }

    }

    // Mobile menu toggle functionality
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNav = document.getElementById('mobileNav');

    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            mobileNav.classList.toggle('mobile-menu-open');
        });

        // Close mobile menu when clicking on a link
        const navLinks = mobileNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                mobileNav.classList.remove('mobile-menu-open');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuToggle.contains(e.target) && !mobileNav.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                mobileNav.classList.remove('mobile-menu-open');
            }
        });
    }

    // Auto-hiding header on scroll for mobile
    let lastScrollTop = 0;
    const header = document.querySelector('header');

    if (header) {
        window.addEventListener('scroll', () => {
            const st = window.pageYOffset || document.documentElement.scrollTop;

            if (window.innerWidth <= 768) { // Only on mobile
                if (st > lastScrollTop && st > 100) {
                    // Scrolling down - hide header
                    header.style.transform = "translateY(-100%)";
                } else {
                    // Scrolling up - show header
                    header.style.transform = "translateY(0)";
                }
            } else {
                // Desktop - always show header
                header.style.transform = "translateY(0)";
            }

            lastScrollTop = st <= 0 ? 0 : st;
        });
    }

    // === HERO SLIDESHOW ===
    const hero = document.querySelector('.hero');
    const fadeLayer = document.querySelector('.hero-fade');

    if (hero && fadeLayer) {
        const images = [
            'F1_25_photo_20250901_181850.png',
            'F1_25_photo_20250916_180838.png',
            'F1_25_photo_20250916_181712.png',
            'F1_25_photo_20250917_141309.png',
            'F1_25_photo_20250917_141612.png',
            'F1_25_photo_20250917_141732.png'
        ];

        // 1) načteme uložený index, nebo začneme od 0
        let current = parseInt(localStorage.getItem("heroIndex"), 10) || 0;

        hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${images[current]})`;

        setInterval(() => {
            // nastavíme nový obrázek do fade vrstvy
            const nextIndex = (current + 1) % images.length;
            fadeLayer.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${images[nextIndex]})`;
            fadeLayer.style.opacity = 1;

            // po 2s (délka fade) přepíšeme hlavní background a resetujeme fade
            setTimeout(() => {
                hero.style.backgroundImage = fadeLayer.style.backgroundImage;
                fadeLayer.style.opacity = 0;
                current = nextIndex;

                // 2) uložíme index, aby se pokračovalo po reloadu
                localStorage.setItem("heroIndex", current);
            }, 2000);
        }, 10000);
    }

});
