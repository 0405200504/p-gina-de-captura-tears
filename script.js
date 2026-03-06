document.addEventListener('DOMContentLoaded', () => {

    // 1. Animações de Scroll (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-up');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Dispara quando 15% do elemento estiver visível
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Para acionar a animação apenas uma vez, descomente a linha abaixo:
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // Como é o hero, queremos que ele anime imediatamente ao carregar, sem depender apenas do scroll.
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero .fade-up');
        heroElements.forEach(el => el.classList.add('visible'));
    }, 100);

    // 2. Gerenciamento do Modal
    const modal = document.getElementById('form-modal');
    const openModalBtns = document.querySelectorAll('.open-modal');
    const closeModalBtn = document.querySelector('.close-modal');

    const openModal = () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Trava o scroll do fundo
    };

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    openModalBtns.forEach(btn => btn.addEventListener('click', openModal));
    closeModalBtn.addEventListener('click', closeModal);

    // Fecha ao clicar fora
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // 3. Manipulação do Formulário Integrado (Simulação e Redirecionamento)
    const forms = document.querySelectorAll('.interactive-form');
    const whatsappGroupLink = "https://chat.whatsapp.com/ExemploGrupoTears";

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = form.querySelector('button[type="submit"]');

            // Estado de "Carregando"
            btn.innerHTML = 'Garantindo Vaga... <span class="icon">⏳</span>';
            btn.style.opacity = '0.8';
            btn.style.pointerEvents = 'none';

            const formData = new FormData(form);
            const name = formData.get('name');

            setTimeout(() => {
                form.innerHTML = `
                    <div class="form-success fade-up visible">
                        <h3>✓ Inscrição Confirmada, ${name.split(' ')[0]}!</h3>
                        <p>Redirecionando para o Grupo...</p>
                    </div>
                `;

                setTimeout(() => {
                    window.location.href = whatsappGroupLink;
                }, 2000);

            }, 1000);
        });
    });
});
