/* ==========================================================================
   MARIA CLARA — PORTFOLIO — SCRIPT
   Índice:
   1. Init / Loader
   2. Lucide Icons
   3. Cursor Glow
   4. Navbar dinâmica
   5. Menu Mobile
   6. Scroll Suave (links internos)
   7. Scroll Reveal (IntersectionObserver)
   8. Contadores animados
   9. Barras de progresso (habilidades)
   10. Filtro de projetos
   10.1 Modal "Sobre o projeto"
   11. (removido — antigo carrossel de depoimentos)
   12. FAQ (accordion)
   13. Botão voltar ao topo
   14. Dark / Light mode (localStorage)
   15. Typing effect no Hero
   16. Partículas de fundo (canvas)
   17. Formulário de contato
   18. Rodapé — ano atual
   ========================================================================== */

/* Dados completos de cada projeto, usados no modal "Sobre o projeto".
   Para editar: troque texto, tecnologias, link e imagem de cada item.
   A ordem do array corresponde ao atributo data-project="0", "1", "2"... de cada card. */
const projectsData = [
  {
    title: 'Sistema de Estoque',
    tag: 'Sistema',
    year: '2026',
    image: 'img/projetos/sistema-estoque.png',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Firebase'],
    link: '#',
    github: '#',
    fullDescription: 'Sistema web para controle de estoque desenvolvido para pequenos negócios que precisam acompanhar entradas, saídas e níveis mínimos de produtos. O painel exibe relatórios em tempo real, alertas automáticos de reposição e histórico de movimentações, tudo sincronizado com o Firebase para acesso em múltiplos dispositivos.'
  },
  {
    title: 'Lista de Compras',
    tag: 'Aplicativo',
    year: '2026',
    image: 'img/projetos/lista-compras.jpg',
    tech: ['Kotlin', 'Android Studio', 'Firestore'],
    link: '#',
    github: '#',
    fullDescription: 'Aplicativo Android nativo para organizar listas de compras por categoria, com marcação de itens comprados e sincronização em nuvem via Firestore. Foi meu primeiro contato com desenvolvimento mobile, unindo lógica em Kotlin a uma interface simples e objetiva pensada para o uso rápido no dia a dia.'
  },
  {
    title: 'Site Beauty',
    tag: 'Site',
    year: '2026',
    image: 'img/projetos/site-beauty.png',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    link: '#',
    github: '#',
    fullDescription: 'Landing page desenvolvida para um salão de beleza, com apresentação dos serviços, catálogo com valores e um formulário de agendamento direto pelo site. O design prioriza uma estética elegante, com boa legibilidade em dispositivos móveis, já que a maioria das clientes acessa pelo celular.'
  },
  {
    title: 'Clínica Odontológica',
    tag: 'Site',
    year: '2026',
    image: 'img/projetos/clinica-odontologica.jpeg',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    link: '#',
    github: '#',
    fullDescription: 'Site institucional para uma clínica odontológica, apresentando a equipe, especialidades e uma seção de agendamento de consultas. O projeto teve foco em transmitir confiança e profissionalismo através de um layout limpo, com boa hierarquia visual das informações mais importantes para o paciente.'
  },
  {
    title: 'CB Softworks',
    tag: 'Sistema',
    year: '2026',
    image: 'img/projetos/cbsoftworks.png',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    link: '#',
    github: '#',
    fullDescription: 'Site institucional desenvolvido para o estúdio CB Softworks, com identidade visual própria em tons de azul e roxo. O projeto envolveu apresentação dos serviços (sites, apps e sistemas), seção sobre a marca e canais de contato, com foco em transmitir um visual moderno e tecnológico.'
  }
];

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. INIT / LOADER ---------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 300);
  });

  /* ---------- 2. LUCIDE ICONS ---------- */
  function initIcons() {
    if (window.lucide) window.lucide.createIcons();
  }
  initIcons();
  // Garante que os ícones apareçam mesmo se o script do CDN carregar depois
  window.addEventListener('load', initIcons);

  /* ---------- 3. CURSOR GLOW ---------- */
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow && matchMedia('(hover: hover)').matches) {
    window.addEventListener('mousemove', (e) => {
      cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    });
  }

  /* ---------- 4. NAVBAR DINÂMICA ---------- */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section[id]');

  function handleNavbarScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }
  handleNavbarScroll();
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });

  function handleActiveLink() {
    let current = '';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 160;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }
  window.addEventListener('scroll', handleActiveLink, { passive: true });

  /* ---------- 5. MENU MOBILE ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  function closeMobileMenu() {
    menuToggle.classList.remove('active');
    mobileMenu.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  menuToggle.addEventListener('click', () => {
    const isActive = menuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active', isActive);
    menuToggle.setAttribute('aria-expanded', String(isActive));
    document.body.style.overflow = isActive ? 'hidden' : '';
  });

  document.querySelectorAll('.mobile-link, .mobile-cta').forEach((el) => {
    el.addEventListener('click', closeMobileMenu);
  });

  /* ---------- 6. SCROLL SUAVE ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });

  /* ---------- 7. SCROLL REVEAL ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.revealDelay || 0;
        setTimeout(() => entry.target.classList.add('in-view'), delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------- 8. CONTADORES ANIMADOS ---------- */
  const counters = document.querySelectorAll('[data-count]');
  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach((c) => counterObserver.observe(c));

  /* ---------- 9. BARRAS DE PROGRESSO ---------- */
  const progressBars = document.querySelectorAll('.progress-fill');
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.width = `${entry.target.dataset.progress}%`;
        progressObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  progressBars.forEach((bar) => progressObserver.observe(bar));

  /* ---------- 10. FILTRO DE PROJETOS ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      projectCards.forEach((card) => {
        const match = filter === 'todos' || card.dataset.category === filter;
        card.classList.toggle('hidden', !match);
      });
    });
  });

  /* ---------- 10.1 MODAL "SOBRE O PROJETO" ---------- */
  const projectModal = document.getElementById('projectModal');
  const modalImage = document.getElementById('modalImage');
  const modalTag = document.getElementById('modalTag');
  const modalYear = document.getElementById('modalYear');
  const modalTitle = document.getElementById('modalTitle');
  const modalFullDesc = document.getElementById('modalFullDesc');
  const modalTech = document.getElementById('modalTech');

  function openProjectModal(index) {
    const data = projectsData[index];
    if (!data) return;

    modalImage.src = data.image;
    modalImage.alt = `Print do projeto ${data.title}`;
    modalTag.textContent = data.tag;
    modalYear.textContent = data.year;
    modalTitle.textContent = data.title;
    modalFullDesc.textContent = data.fullDescription;
    modalTech.innerHTML = data.tech.map((t) => `<span>${t}</span>`).join('');

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-open-modal]').forEach((btn) => {
    btn.addEventListener('click', () => {
      openProjectModal(parseInt(btn.dataset.openModal, 10));
    });
  });

  document.querySelectorAll('[data-close-modal]').forEach((el) => {
    el.addEventListener('click', closeProjectModal);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) closeProjectModal();
  });

  /* ---------- 12. FAQ (ACCORDION) ---------- */
  document.querySelectorAll('.faq-item').forEach((item) => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item.open').forEach((openItem) => {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        openItem.querySelector('.faq-answer').style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
    });
  });

  /* ---------- 13. VOLTAR AO TOPO ---------- */
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- 13.1 MÚSICA DE FUNDO ---------- */
  const bgMusic = document.getElementById('bgMusic');
  const musicToggle = document.getElementById('musicToggle');

  if (bgMusic && musicToggle) {
    bgMusic.volume = 0.35;

    musicToggle.addEventListener('click', () => {
      if (bgMusic.paused) {
        bgMusic.play().catch(() => {
          // Se o arquivo de áudio ainda não foi adicionado em /audio, o play falha silenciosamente.
        });
      } else {
        bgMusic.pause();
      }
    });

    bgMusic.addEventListener('play', () => {
      musicToggle.classList.add('playing');
      musicToggle.setAttribute('aria-pressed', 'true');
      musicToggle.setAttribute('aria-label', 'Pausar música de fundo');
    });

    bgMusic.addEventListener('pause', () => {
      musicToggle.classList.remove('playing');
      musicToggle.setAttribute('aria-pressed', 'false');
      musicToggle.setAttribute('aria-label', 'Ativar música de fundo');
    });
  }

  /* ---------- 14. DARK / LIGHT MODE ---------- */
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('mc-theme') || 'dark';

  if (savedTheme === 'light') root.setAttribute('data-theme', 'light');

  themeToggle.addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    if (isLight) {
      root.removeAttribute('data-theme');
      localStorage.setItem('mc-theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
      localStorage.setItem('mc-theme', 'light');
    }
  });

  /* ---------- 15. TYPING EFFECT NO HERO ---------- */
  const typingEl = document.getElementById('typingText');
  const typingWords = [
    'Front-end Developer',
    'HTML5 · CSS3 · JavaScript',
    'Estudante de ADS',
    'UI/UX Enthusiast'
  ];
  let wordIndex = 0, charIndex = 0, deleting = false;

  function typeLoop() {
    const word = typingWords[wordIndex];

    if (!deleting) {
      charIndex++;
      typingEl.textContent = word.slice(0, charIndex);
      if (charIndex === word.length) {
        deleting = true;
        setTimeout(typeLoop, 1800);
        return;
      }
    } else {
      charIndex--;
      typingEl.textContent = word.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % typingWords.length;
      }
    }
    setTimeout(typeLoop, deleting ? 40 : 80);
  }
  if (typingEl) setTimeout(typeLoop, 900);

  /* ---------- 16. PARTÍCULAS DE FUNDO ---------- */
  const canvas = document.getElementById('particles');
  if (canvas && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const colors = ['59,130,246', '124,58,237', '6,182,212'];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = document.body.scrollHeight;
    }

    function createParticles() {
      const count = Math.min(70, Math.floor(window.innerWidth / 20));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.8 + 0.6,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.15
      }));
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.fill();
      });
      requestAnimationFrame(animateParticles);
    }

    resizeCanvas();
    createParticles();
    animateParticles();

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { resizeCanvas(); createParticles(); }, 250);
    });
  }

  /* ---------- 17. FORMULÁRIO DE CONTATO ---------- */
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  const WHATSAPP_NUMBER = '5588994086279'; // (88) 99408-6279

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Envia a mensagem diretamente pelo WhatsApp (sem passar por email/backend).
    const texto =
      `Olá, Maria Clara! Vim pelo seu portfólio.%0A%0A` +
      `*Nome:* ${encodeURIComponent(name)}%0A` +
      `*Email:* ${encodeURIComponent(email)}%0A` +
      `*Mensagem:* ${encodeURIComponent(message)}`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${texto}`;

    formFeedback.textContent = `Obrigada, ${name}! Abrindo o WhatsApp para enviar sua mensagem...`;

    window.open(whatsappUrl, '_blank', 'noopener');
    contactForm.reset();

    setTimeout(() => { formFeedback.textContent = ''; }, 5000);
  });

  /* ---------- 18. RODAPÉ — ANO ATUAL ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
