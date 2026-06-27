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

// =========================================================
// ОПТИМІЗОВАНА АНІМАЦІЯ FLUID BLOSSOM (12 ФОТО)
// =========================================================
if (typeof gsap !== 'undefined' && document.querySelector('.collage-item')) {

    // Налаштування погойдування для всіх 12 елементів
    const floaters = [
        { id: '.item-main', y: 12, x: -6, r: 0.5, dur: 4.5, del: 0 },
        { id: '.item-1', y: -15, x: 8, r: -0.8, dur: 5.2, del: 0.3 },
        { id: '.item-2', y: -12, x: -7, r: -0.4, dur: 4.8, del: 0.1 },
        { id: '.item-3', y: 14, x: -10, r: 0.6, dur: 5.5, del: 0.6 },
        { id: '.item-4', y: 16, x: 9, r: 0.8, dur: 4.9, del: 0.8 },
        { id: '.item-5', y: -10, x: 5, r: -0.5, dur: 4.2, del: 0.2 },
        { id: '.item-6', y: 11, x: -5, r: 0.4, dur: 5.1, del: 0.5 },
        { id: '.item-7', y: -8, x: 4, r: -0.3, dur: 3.8, del: 0.4 },
        { id: '.item-8', y: 9, x: -3, r: 0.2, dur: 4.1, del: 0.7 },
        { id: '.item-9', y: 10, x: 6, r: 0.7, dur: 4.6, del: 0.2 },
        { id: '.item-10', y: -11, x: -4, r: -0.6, dur: 5.3, del: 0.9 },
        { id: '.item-11', y: 7, x: 5, r: 0.3, dur: 3.9, del: 0.1 }
    ];

    // Запуск нескінченного дихання
    floaters.forEach(f => {
        if (document.querySelector(f.id)) {
            gsap.to(f.id, {
                y: `+=${f.y}`, x: `+=${f.x}`, rotation: f.r,
                duration: f.dur, delay: f.del,
                ease: 'sine.inOut', yoyo: true, repeat: -1
            });
        }
    });

    // Інтерактивний ховер (тільки на ПК)
    if (window.innerWidth > 992) {
        const items = document.querySelectorAll('.collage-item');

        items.forEach(item => {
            item.addEventListener('mouseenter', () => {
                gsap.to(item, { scale: 1.08, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });

                items.forEach(other => {
                    if (other !== item) {
                        gsap.to(other, { opacity: 0.3, scale: 0.96, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
                    }
                });
            });

            item.addEventListener('mouseleave', () => {
                gsap.to(item, { scale: 1, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });

                items.forEach(other => {
                    gsap.to(other, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
                });
            });
        });
    }
}

window.addEventListener('load', () => {
    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
});