document.addEventListener('DOMContentLoaded', () => {

    // ─── Typing Animation ───
    const el = document.getElementById('typing-text');
    const phrases = [
        'Data Engineering Student.',
        'Building Data Foundations.',
        'Turning Raw Data Into Answers.'
    ];
    let pi = 0, ci = 0, deleting = false;

    function type() {
        const phrase = phrases[pi];

        if (deleting) {
            el.textContent = phrase.substring(0, ci - 1);
            ci--;
        } else {
            el.textContent = phrase.substring(0, ci + 1);
            ci++;
        }

        let delay = deleting ? 40 : 80;

        if (!deleting && ci === phrase.length) {
            delay = 2200;   // pause at full phrase
            deleting = true;
        } else if (deleting && ci === 0) {
            delay = 400;    // pause before next phrase
            deleting = false;
            pi = (pi + 1) % phrases.length;
        }

        setTimeout(type, delay);
    }

    setTimeout(type, 800);

    // ─── Navbar scroll effect ───
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    function onScroll() {
        // Blur on scroll
        navbar.classList.toggle('scrolled', window.scrollY > 50);

        // Active link
        let current = '';
        sections.forEach(s => {
            if (window.scrollY >= s.offsetTop - s.clientHeight / 3) {
                current = s.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // ─── Scroll reveal ───
    const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px'
    });

    document.querySelectorAll('.section-reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // ─── Mobile menu ───
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburger = document.querySelector('.hamburger');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    function toggleMenu() {
        const isOpen = mobileMenu.classList.toggle('open');
        hamburger.classList.toggle('open');
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    menuBtn.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

    // ─── Smooth scroll for all anchor links ───
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});
