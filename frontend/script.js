document.addEventListener("DOMContentLoaded", () => {
    // 1. Шапка при скролі
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });

    // 2. Мобільне меню
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    if (toggle && nav) {
        toggle.addEventListener('click', () => nav.classList.toggle('active'));
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => nav.classList.remove('active'));
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

    // 4. GSAP Анімації
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Головний банер
        if(document.querySelector('.hero-title')) {
            gsap.from('.hero-subtitle', { opacity: 0, y: 20, duration: 1, ease: 'power3.out', delay: 0.2 });
            gsap.from('.hero-title', { opacity: 0, y: 30, duration: 1, ease: 'power3.out', delay: 0.4 });
        }

        // Заголовки внутрішніх сторінок
        if(document.querySelector('.page-hero h1')) {
            gsap.from('.page-hero h1', { opacity: 0, y: 30, duration: 1, ease: 'power3.out' });
            gsap.from('.page-hero p', { opacity: 0, y: 20, duration: 1, ease: 'power3.out', delay: 0.3 });
        }

        // Головна: Категорії
        gsap.from('.home-cat-card', {
            scrollTrigger: { trigger: '.home-categories-grid', start: 'top 80%' },
            opacity: 0, y: 40, duration: 0.8, stagger: 0.2
        });

        // ПОСЛУГИ (Виправлено сходинки)
        // stagger встановлено на 0, щоб картки у сітці з'являлися одночасно
        document.querySelectorAll('.services-card-grid').forEach(grid => {
            gsap.from(grid.querySelectorAll('.srv-card'), {
                scrollTrigger: { trigger: grid, start: 'top 85%' },
                opacity: 0, 
                y: 50, 
                duration: 0.6, 
                stagger: 0 
            });
        });

        // Майстри
        gsap.from('.master-card', {
            scrollTrigger: { trigger: '.masters-grid', start: 'top 80%' },
            opacity: 0, y: 50, duration: 0.8, stagger: 0.2
        });

        // Галерея
        gsap.from('.gallery-item', {
            scrollTrigger: { trigger: '.gallery-grid', start: 'top 85%' },
            opacity: 0, scale: 0.9, duration: 0.6, stagger: 0.1
        });
        
        // Як ми працюємо
        gsap.from('.process-step', {
            scrollTrigger: { trigger: '.process-grid', start: 'top 85%' },
            opacity: 0, y: 30, duration: 0.6, stagger: 0.2
        });
        
        // FAQ
        gsap.from('.faq-item', {
            scrollTrigger: { trigger: '.faq-wrapper', start: 'top 85%' },
            opacity: 0, y: 20, duration: 0.5, stagger: 0.1
        });

        // Блог
        const blogCards = document.querySelectorAll('.blog-card');
        if (blogCards.length > 0) {
            gsap.from('.blog-card', {
                scrollTrigger: { trigger: '.blog-grid', start: 'top 85%' },
                opacity: 0, y: 50, duration: 0.8, stagger: 0.2
            });

            blogCards.forEach(card => {
                gsap.from(card.querySelectorAll('.blog-date, .blog-title, .blog-excerpt'), {
                    scrollTrigger: { trigger: card, start: 'top 90%' },
                    opacity: 0, y: 20, duration: 0.6, stagger: 0.1, delay: 0.2
                });
                gsap.from(card.querySelector('.blog-img'), {
                    scrollTrigger: { trigger: card, start: 'top 90%' },
                    scale: 1.2, duration: 1.5, ease: 'power2.out'
                });
            });
        }
    }
});