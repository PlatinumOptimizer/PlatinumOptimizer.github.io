// Inizializzazione AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Inizializza AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Header scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Chiudi tutte le altre FAQ
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Apri/chiudi questa FAQ
            item.classList.toggle('active');
        });
    });

    // Smooth scroll per anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Chiudi mobile menu se aperto
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            }
        });
    });

    // Animazione barre performance
    const animateBars = () => {
        const cpuFill = document.querySelector('.cpu-fill');
        const gpuFill = document.querySelector('.gpu-fill');
        const ramFill = document.querySelector('.ram-fill');
        
        if (cpuFill) {
            // Le barre sono già animate via CSS, qui possiamo aggiungere logica aggiuntiva
            console.log('Performance bars animated');
        }
    };

    // Intersection Observer per animazioni avanzate
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Animazioni specifiche per elementi
                if (entry.target.classList.contains('stat')) {
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.opacity = '1';
                }
            }
        });
    }, observerOptions);

    // Osserva elementi per animazioni custom
    document.querySelectorAll('.stat, .feature-card, .pricing-card').forEach(el => {
        observer.observe(el);
    });

    // Contatore animato per statistiche
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-value');
        const speed = 200;
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace('%', '');
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment) + '%';
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target + '%';
            }
        });
    };

    // Avvia animazione contatori quando la sezione è visibile
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        });
        
        statsObserver.observe(statsSection);
    }

    // Effetto parallax per shapes fluttuanti
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.floating-shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
        });
    });

    // Preload animazioni
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        animateBars();
    });

    // Gestione errori immagini
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
        });
    });
});

// Performance monitoring
const perf = {
    startTime: performance.now(),
    endTime: null,
    
    measure: function() {
        this.endTime = performance.now();
        console.log(`Page loaded in ${(this.endTime - this.startTime).toFixed(2)}ms`);
    }
};

window.addEventListener('load', perf.measure);
