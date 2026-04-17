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
        // Checa preferência salva
        const actionDockState = localStorage.getItem('actionDockState');
        if (actionDockState === 'retracted') {
            actionDock.classList.add('retracted');
        } else if (actionDockState === 'expanded') {
            actionDock.classList.remove('retracted');
        }

        dockToggle.addEventListener('click', () => {
            actionDock.classList.toggle('retracted');
            if (actionDock.classList.contains('retracted')) {
                localStorage.setItem('actionDockState', 'retracted');
            } else {
                localStorage.setItem('actionDockState', 'expanded');
            }
        });
    }

    const themeDockToggle = document.getElementById('themeDockToggle');
    const themeDock = document.getElementById('themeDock');

    if (themeDockToggle && themeDock) {
        // Checa preferência salva
        const themeDockState = localStorage.getItem('themeDockState');
        if (themeDockState === 'retracted') {
            themeDock.classList.add('retracted');
        } else if (themeDockState === 'expanded') {
            themeDock.classList.remove('retracted');
        }

        themeDockToggle.addEventListener('click', () => {
            themeDock.classList.toggle('retracted');
            if (themeDock.classList.contains('retracted')) {
                localStorage.setItem('themeDockState', 'retracted');
            } else {
                localStorage.setItem('themeDockState', 'expanded');
            }
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

    // ==== Network Canvas Background ====
    const canvas = document.getElementById('networkBg');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        
        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        // Função para pegar a cor baseado no tema
        const getLineColor = () => document.body.getAttribute('data-theme') === 'dark' ? 'rgba(255, 255, 255, ' : 'rgba(15, 23, 42, ';

        for (let i = 0; i < 60; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5
            });
        }

        let mouse = { x: -1000, y: -1000 };
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, width, height);
            
            const colorBase = getLineColor();

            for(let i = 0; i < particles.length; i++) {
                let p = particles[i];
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
                ctx.fillStyle = colorBase + '0.3)';
                ctx.fill();

                for(let j = i + 1; j < particles.length; j++) {
                    let p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = colorBase + (1 - dist/120) * 0.15 + ')';
                        ctx.stroke();
                    }
                }

                // Connect to mouse
                const dxMouse = p.x - mouse.x;
                const dyMouse = p.y - mouse.y;
                const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
                if (distMouse < 150) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = 'rgba(56, 189, 248, ' + (1 - distMouse/150) * 0.4 + ')';
                    ctx.stroke();
                }
            }
        }
        animate();
    }

    // ==== Lógica de Modais de Projetos ====
    const projectModules = document.querySelectorAll('.project-module[data-modal]');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalBody = document.getElementById('modalBody');
    const modalCloseBtn = document.getElementById('modalCloseBtn');

    if (projectModules.length > 0 && modalOverlay) {
        projectModules.forEach(module => {
            module.addEventListener('click', () => {
                const templateId = module.getAttribute('data-modal');
                const template = document.getElementById(templateId);
                if (template) {
                    modalBody.innerHTML = template.innerHTML;
                    modalOverlay.classList.add('active');
                }
            });
        });

        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', () => {
                modalOverlay.classList.remove('active');
            });
        }

        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
            }
        });
    }
});