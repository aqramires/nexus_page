document.addEventListener('DOMContentLoaded', () => {

    // ==== Lógica de Expansão da Timeline ====
    const expandBtns = document.querySelectorAll('.expand-btn');
    expandBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Previne que o click suba
            e.stopPropagation();
            const timelineItem = btn.closest('.timeline-item');
            if (timelineItem) {
                timelineItem.classList.toggle('expanded');
            }
        });
    });

    const btnExpandResumo = document.getElementById('btnExpandResumo');
    if (btnExpandResumo) {
        btnExpandResumo.addEventListener('click', () => {
            const aboutCard = btnExpandResumo.closest('.about-card');
            if (aboutCard) {
                aboutCard.classList.toggle('expanded');
                // Alternar o ícone e texto
                if (aboutCard.classList.contains('expanded')) {
                    btnExpandResumo.innerHTML = 'Colapsar Resumo <i class="fa-solid fa-chevron-up"></i>';
                } else {
                    btnExpandResumo.innerHTML = 'Expandir Resumo <i class="fa-solid fa-chevron-down"></i>';
                }
            }
        });
    }

    // Expandir Todos / Colapsar Todos
    const expandAllBtn = document.getElementById('expandAllExp');
    if (expandAllBtn) {
        expandAllBtn.addEventListener('click', () => {
            const allItems = document.querySelectorAll('.timeline-item');
            const anyCollapsed = Array.from(allItems).some(item => !item.classList.contains('expanded'));
            
            if (anyCollapsed) {
                // Expand all
                allItems.forEach(item => item.classList.add('expanded'));
                expandAllBtn.innerHTML = '<i class="fa-solid fa-compress"></i> Colapsar Tudo';
            } else {
                // Collapse all
                allItems.forEach(item => item.classList.remove('expanded'));
                expandAllBtn.innerHTML = '<i class="fa-solid fa-expand"></i> Expandir Tudo';
            }
        });
    }

    // ==== Efeito de entrada dos cards ====
    const cards = document.querySelectorAll('.bento-card');
    cards.forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * i);
    });

    // ==== Lógica do Dock Retrátil ====
    const dockToggle = document.getElementById('dockToggle');
    const actionDock = document.getElementById('actionDock');

    if (dockToggle && actionDock) {
        dockToggle.addEventListener('click', () => {
            actionDock.classList.toggle('retracted');
        });
    }

    const themeDockToggle = document.getElementById('themeDockToggle');
    const themeDock = document.getElementById('themeDock');

    if (themeDockToggle && themeDock) {
        themeDockToggle.addEventListener('click', () => {
            themeDock.classList.toggle('retracted');
        });
    }

    // ==== Lógica do Tema (Dark/Light Mode) ====
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    
    // Checa preferência salva
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isDark = document.body.getAttribute('data-theme') === 'dark';
            if (isDark) {
                document.body.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
            } else {
                document.body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
            }
        });
    }
});