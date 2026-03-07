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

    // URL do seu Google Apps Script (Substitua após criar o script no Google Sheets)
    const googleSheetUrl = "https://script.google.com/macros/s/AKfycbyjbE4TZBUG2mMjfjv3nm7P7PcZcBkDnam2PieNUKU6ATRkULB1DBrem2MgIPO1Qt2U4w/exec";

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
            const email = formData.get('email');

            // Envio para o Google Sheets (se a URL estiver configurada)
            if (googleSheetUrl) {
                fetch(googleSheetUrl, {
                    method: 'POST',
                    mode: 'no-cors',
                    body: formData
                })
                    .then(() => {
                        console.log("Lead salvo com sucesso!");
                        // Dispara evento do Meta Pixel
                        if (typeof fbq === 'function') {
                            fbq('track', 'Lead');
                        }
                    })
                    .catch(err => console.error("Erro ao salvar lead:", err));
            }

            setTimeout(() => {
                form.innerHTML = `
                    <div class="success-screen">
                        <h3>SUA INSCRIÇÃO ESTÁ QUASE CONCLUÍDA!</h3>
                        <div class="progress-container">
                            <div class="progress-bar" id="p-bar"></div>
                        </div>
                        <p>Para finalizar entre no nosso grupo do WhatsApp</p>
                        <a href="https://chat.whatsapp.com/IivqNxRT28xKtfymFHuDuM" class="cta-button primary pulse" style="width: 100%; margin-top: 1.5rem;">
                            ENTRAR NO GRUPO AGORA <span class="icon">→</span>
                        </a>
                    </div>
                `;

                // Inicia animação da barra
                setTimeout(() => {
                    const pBar = document.getElementById('p-bar');
                    if (pBar) pBar.style.width = '78%';
                }, 100);

            }, 1000);
        });
    });
});
