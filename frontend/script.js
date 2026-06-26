document.addEventListener("DOMContentLoaded", () => {
    // 1. Шапка при скролі
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });

    // 2. Мобільне меню та бургер-іконка 
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            toggle.classList.toggle('active');
        });
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                toggle.classList.remove('active');
            });
        });
    }

    // 3. Акордеон FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // 4. Валідація дати в формі бронювання
    const dateInput = document.querySelector('input[type="date"]');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    // 5. GSAP Анімації (Видалено 3D обертання)
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        if (document.querySelector('.hero-title')) {
            gsap.from('.hero-subtitle', { opacity: 0, y: 30, duration: 1.2, ease: 'power2.out', delay: 0.2 });
            gsap.from('.hero-title', { opacity: 0, y: 40, duration: 1.2, ease: 'power2.out', delay: 0.5 });
        }

        if (document.querySelector('.page-hero h1')) {
            gsap.from('.page-hero h1', { opacity: 0, y: 30, duration: 1, ease: 'power3.out' });
            gsap.from('.page-hero p', { opacity: 0, y: 20, duration: 1, ease: 'power3.out', delay: 0.3 });
        }

        if (document.querySelector('.home-categories-grid')) {
            gsap.from('.home-cat-card', {
                scrollTrigger: {
                    trigger: '.home-categories-grid',
                    start: 'top bottom'
                },
                opacity: 0, 
                duration: 0.8,
                ease: 'power2.out',
                stagger: 0.2
            });
        }

        document.querySelectorAll('.services-card-grid').forEach(grid => {
            gsap.from(grid.querySelectorAll('.srv-card'), {
                scrollTrigger: { trigger: grid, start: 'top bottom' },
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out',
                stagger: 0.15
            });
        });

        if (document.querySelector('.masters-grid')) {
            gsap.from('.master-card', {
                scrollTrigger: { trigger: '.masters-grid', start: 'top bottom' },
                opacity: 1,
                duration: 0.8,
                ease: 'power2.out',
                stagger: 0.15
            });
        }

        if (document.querySelector('.process-step')) {
            gsap.from('.process-step', {
                scrollTrigger: { trigger: '.process-grid', start: 'top bottom' },
                opacity: 0, duration: 0.8, ease: 'power2.out', stagger: 0.2
            });
        }

        if (document.querySelector('.faq-item')) {
            gsap.from('.faq-item', {
                scrollTrigger: { trigger: '.faq-wrapper', start: 'top bottom' },
                opacity: 0, duration: 0.6, ease: 'power2.out', stagger: 0.15
            });
        }

        document.querySelectorAll('.blog-content').forEach(content => {
            gsap.from(content, {
                scrollTrigger: { trigger: content, start: 'top bottom' },
                opacity: 0, y: 30, duration: 0.8, ease: 'power2.out'
            });
        });

        document.querySelectorAll('.blog-card').forEach(card => {
            gsap.from(card.querySelectorAll('.blog-date, .blog-title, .blog-excerpt'), {
                scrollTrigger: { trigger: card, start: 'top bottom' },
                opacity: 0, y: 20, duration: 0.6, ease: 'power2.out', stagger: 0.1, delay: 0.2
            });

            gsap.from(card.querySelector('.blog-img'), {
                scrollTrigger: { trigger: card, start: 'top bottom' },
                scale: 1.15, duration: 1.4, ease: 'power1.out'
            });
        });
    }
});

window.addEventListener('load', () => {
    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
});