/* ==========================================================================
   CB SOFTWORKS — script.js
   Organizado por função. Sem dependências externas.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initCursor();
  initThemeToggle();
  initMusicPlayer();
  initSectionIndicators();
  initTypedEffect();
  initRevealOnScroll();
  initCounters();
  initParticles();
  initHeroTilt();
  renderStack();
  renderProjects();
  initProjectFilters();
  initProjectModal();
  initCardTilt();
  initContactForm();
  document.getElementById('year').textContent = new Date().getFullYear();
});

/* ---------------------------------------------------------------------- */
/* Preloader                                                               */
/* ---------------------------------------------------------------------- */
function initPreloader(){
  const pre = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => pre.classList.add('done'), 500);
  });
  // fallback caso 'load' demore
  setTimeout(() => pre.classList.add('done'), 2500);
}

/* ---------------------------------------------------------------------- */
/* Cursor personalizado                                                    */
/* ---------------------------------------------------------------------- */
function initCursor(){
  if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });

  function loop(){
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(loop);
  }
  loop();

  const hoverables = 'a, button, .stack-item, .project-card, .float-btn, .util-btn, input, textarea';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverables)) ring.classList.add('hover');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverables)) ring.classList.remove('hover');
  });
}

/* ---------------------------------------------------------------------- */
/* Indicadores passivos: contador de seção + barra de progresso do scroll  */
/* (sem menu, sem links de navegação — apenas feedback visual)             */
/* ---------------------------------------------------------------------- */
function initSectionIndicators(){
  const container = document.getElementById('scrollContainer');
  const panels = Array.from(document.querySelectorAll('.panel'));
  const progressFill = document.getElementById('progressFill');
  const counterCurrent = document.getElementById('counterCurrent');
  const counterTotal = document.getElementById('counterTotal');

  counterTotal.textContent = String(panels.length).padStart(2, '0');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
        const index = parseInt(entry.target.dataset.index, 10);
        progressFill.style.width = `${((index + 1) / panels.length) * 100}%`;
        counterCurrent.textContent = String(index + 1).padStart(2, '0');
      }
    });
  }, { root: container, threshold: [0.5] });

  panels.forEach(p => observer.observe(p));

  // os únicos links internos são os CTAs do herói (Ver projetos / Falar comigo)
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ---------------------------------------------------------------------- */
/* Efeito de digitação — alterna entre frases sobre o trabalho dela        */
/* ---------------------------------------------------------------------- */
function initTypedEffect(){
  const el = document.getElementById('typedWord');
  if (!el) return;
  const sentences = [
    'Criando soluções que fazem a diferença.',
    'Aprender. Criar. Evoluir.',
    'Criando o futuro.'
  ];
  let sentenceIndex = 0, charIndex = 0, deleting = false;

  function tick(){
    const current = sentences[sentenceIndex];
    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        sentenceIndex = (sentenceIndex + 1) % sentences.length;
      }
    }
    setTimeout(tick, deleting ? 30 : 45);
  }
  setTimeout(tick, 700);
}

/* ---------------------------------------------------------------------- */
/* Modo claro / escuro — alternado pelo usuário, salvo no navegador        */
/* ---------------------------------------------------------------------- */
function initThemeToggle(){
  const btn = document.getElementById('themeToggle');
  const root = document.documentElement;
  if (!btn) return;

  function currentTheme(){
    return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }
  function updateLabel(){
    const isLight = currentTheme() === 'light';
    btn.setAttribute('aria-label', isLight ? 'Alternar para modo escuro' : 'Alternar para modo claro');
  }
  updateLabel();

  btn.addEventListener('click', () => {
    const next = currentTheme() === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('mc-theme', next); } catch (e) { /* navegador sem storage disponível */ }
    updateLabel();
  });
}

/* ---------------------------------------------------------------------- */
/* Música de fundo — o visitante decide se toca ou não, nunca autoplay     */
/* ---------------------------------------------------------------------- */
function initMusicPlayer(){
  const btn = document.getElementById('musicToggle');
  const audio = document.getElementById('bgMusic');
  if (!btn || !audio) return;

  audio.volume = 0.4;
  let playing = false;

  btn.addEventListener('click', () => {
    if (playing) {
      audio.pause();
      btn.classList.remove('playing');
      btn.setAttribute('aria-label', 'Tocar música de fundo');
      playing = false;
      return;
    }
    const p = audio.play();
    if (p && typeof p.catch === 'function') {
      p.then(() => {
        btn.classList.add('playing');
        btn.setAttribute('aria-label', 'Pausar música de fundo');
        playing = true;
      }).catch(() => {
        // arquivo de áudio ausente ou navegador bloqueou a reprodução
        btn.classList.add('no-audio');
        console.warn('Não foi possível tocar a música: verifique se assets/audio/trilha.mp3 existe.');
      });
    }
  });
}


function initParticles(){
  const container = document.getElementById('particles');
  if (!container) return;
  const count = window.innerWidth < 700 ? 14 : 26;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    const size = Math.random() * 3 + 1.5;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}%`;
    p.style.setProperty('--drift', `${(Math.random() - 0.5) * 80}px`);
    p.style.animationDuration = `${Math.random() * 10 + 10}s`;
    p.style.animationDelay = `${Math.random() * 14}s`;
    container.appendChild(p);
  }
}

/* ---------------------------------------------------------------------- */
/* Parallax 3D na foto do herói, seguindo o mouse                          */
/* ---------------------------------------------------------------------- */
function initHeroTilt(){
  const wrap = document.getElementById('heroPhoto');
  if (!wrap || window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
  const frame = wrap.querySelector('.hero-photo-frame');
  const hero = document.getElementById('hero');

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    frame.style.transform = `rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`;
  });
  hero.addEventListener('mouseleave', () => {
    frame.style.transform = 'rotateY(0deg) rotateX(0deg)';
  });
}

/* ---------------------------------------------------------------------- */
/* Leve tilt 3D nos cards de projeto ao passar o mouse                     */
/* ---------------------------------------------------------------------- */
function initCardTilt(){
  if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
  const track = document.getElementById('projectsTrack');
  if (!track) return;

  track.addEventListener('mousemove', (e) => {
    const card = e.target.closest('.project-card');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
  });
  track.addEventListener('mouseleave', () => {
    track.querySelectorAll('.project-card').forEach(c => { c.style.transform = ''; });
  }, true);
  track.addEventListener('mouseout', (e) => {
    const card = e.target.closest('.project-card');
    if (card && !card.contains(e.relatedTarget)) card.style.transform = '';
  });
}


function initRevealOnScroll(){
  const container = document.getElementById('scrollContainer');
  const items = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.style.getPropertyValue('--d') || 0;
        entry.target.style.transitionDelay = `${delay * 90}ms`;
        entry.target.classList.add('in');
      }
    });
  }, { root: container, threshold: 0.2 });

  items.forEach(item => observer.observe(item));
}

/* ---------------------------------------------------------------------- */
/* Contadores animados                                                     */
/* ---------------------------------------------------------------------- */
function initCounters(){
  const container = document.getElementById('scrollContainer');
  const nums = document.querySelectorAll('.stat-num');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { root: container, threshold: 0.4 });

  nums.forEach(n => observer.observe(n));
}

function animateCount(el){
  const target = parseInt(el.dataset.count, 10);
  const duration = 1200;
  const start = performance.now();

  function step(now){
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ---------------------------------------------------------------------- */
/* Stack — dados + render                                                  */
/* ---------------------------------------------------------------------- */
const STACK_DATA = [
  { name: 'HTML5',        tag: '<html>',  pct: 98 },
  { name: 'CSS3',         tag: '{css}',   pct: 95 },
  { name: 'JavaScript',   tag: 'js()',    pct: 92 },
  { name: 'React',        tag: '<jsx/>',  pct: 88 },
  { name: 'Node.js',      tag: 'node',    pct: 85 },
  { name: 'Git',          tag: 'git',     pct: 93 },
  { name: 'GitHub',       tag: 'gh',      pct: 90 },
  { name: 'Firebase',     tag: 'fire()',  pct: 84 },
  { name: 'Kotlin',       tag: '.kt',     pct: 78 },
  { name: 'Android Studio', tag: 'apk',   pct: 80 },
  { name: 'Figma',        tag: 'ui',      pct: 87 },
  { name: 'UI Design',    tag: 'design',  pct: 90 },
];

function renderStack(){
  const grid = document.getElementById('stackGrid');
  if (!grid) return;
  grid.innerHTML = STACK_DATA.map(item => `
    <div class="stack-item">
      <span class="stack-icon">${item.tag}</span>
      <span class="stack-name">${item.name}</span>
      <div class="stack-bar"><div class="stack-bar-fill" data-pct="${item.pct}"></div></div>
      <span class="stack-pct">${item.pct}%</span>
    </div>
  `).join('');

  // anima as barras quando entram em tela
  const container = document.getElementById('scrollContainer');
  const bars = grid.querySelectorAll('.stack-bar-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.pct + '%';
      }
    });
  }, { root: container, threshold: 0.3 });
  bars.forEach(b => observer.observe(b));
}

/* ---------------------------------------------------------------------- */
/* Projetos — dados + render + filtro                                      */
/* ---------------------------------------------------------------------- */
const PROJECTS_DATA = [
  {
    name: 'CB_Fitness',
    cat: 'sites',
    img: 'assets/images/projects/cbfitness.jpg',
    desc: 'Landing page para academia, com hero de impacto, contadores de estatísticas (alunos, professores, anos de história) e chamadas diretas para matrícula e horários de aula.',
    tech: ['HTML', 'CSS', 'JavaScript']
  },
  {
    name: 'CBflix',
    cat: 'sistemas',
    img: 'assets/images/projects/cbflix.jpg',
    desc: 'Plataforma de streaming inspirada em serviços como Netflix, com catálogo de filmes e séries organizado por categorias, avaliações e cards interativos.',
    tech: ['React', 'CSS', 'JavaScript']
  },
  {
    name: 'CB Softworks',
    cat: 'sites',
    img: 'assets/images/projects/cbsoftworks.jpg',
    desc: 'Site institucional para software house, com apresentação animada dos serviços, mini-game interativo no código de exemplo e captação de orçamentos.',
    tech: ['HTML', 'CSS', 'JavaScript']
  },
  {
    name: 'CBOdonto',
    cat: 'sites',
    img: 'assets/images/projects/cbodonto.jpg',
    desc: 'Site para clínica odontológica com apresentação de especialidades, estatísticas de atendimento e botão direto de agendamento de consulta.',
    tech: ['HTML', 'CSS', 'JavaScript']
  },
  {
    name: 'Estoque+',
    cat: 'sistemas',
    img: 'assets/images/projects/estoqueplus.jpg',
    desc: 'Sistema de gestão de estoque com autenticação via Google, painel de métricas, controle de produtos e relatórios de movimentação.',
    tech: ['React', 'Firebase']
  },
  {
    name: 'Wemilly Rocha Beauty',
    cat: 'sites',
    img: 'assets/images/projects/wemillybeauty.jpg',
    desc: 'Site para especialista em alongamento de cílios, com identidade visual delicada, agendamento direto pelo WhatsApp e integração com Instagram.',
    tech: ['HTML', 'CSS', 'JavaScript']
  },
];

function renderProjects(){
  const track = document.getElementById('projectsTrack');
  if (!track) return;
  track.innerHTML = PROJECTS_DATA.map((p, i) => `
    <article class="project-card" data-cat="${p.cat}">
      <div class="project-media">
        <span class="project-cat">${p.cat}</span>
        <img src="${p.img}" alt="Captura de tela do projeto ${p.name}" loading="lazy">
      </div>
      <div class="project-body">
        <h3 class="project-name">${p.name}</h3>
        <p class="project-desc">${p.desc}</p>
        <div class="project-tech">${p.tech.map(t => `<span>${t}</span>`).join('')}</div>
        <div class="project-links">
          <button type="button" class="project-view-btn" data-project-index="${i}">
            Ver projeto
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H8M17 7V16"/></svg>
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

/* ---------------------------------------------------------------------- */
/* Modal de detalhes do projeto — abre ao clicar em "Ver projeto"          */
/* ---------------------------------------------------------------------- */
function initProjectModal(){
  const overlay = document.getElementById('projectModal');
  const closeBtn = document.getElementById('modalClose');
  const track = document.getElementById('projectsTrack');
  if (!overlay || !track) return;

  const imgEl = document.getElementById('modalImg');
  const catEl = document.getElementById('modalCat');
  const titleEl = document.getElementById('modalTitle');
  const descEl = document.getElementById('modalDesc');
  const techEl = document.getElementById('modalTech');

  function openModal(index){
    const p = PROJECTS_DATA[index];
    if (!p) return;
    imgEl.src = p.img;
    imgEl.alt = `Captura de tela do projeto ${p.name}`;
    catEl.textContent = p.cat;
    titleEl.textContent = p.name;
    descEl.textContent = p.desc;
    techEl.innerHTML = p.tech.map(t => `<span>${t}</span>`).join('');
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(){
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  track.addEventListener('click', (e) => {
    const btn = e.target.closest('.project-view-btn');
    if (!btn) return;
    openModal(parseInt(btn.dataset.projectIndex, 10));
  });

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
  });
}

function initProjectFilters(){
  const buttons = document.querySelectorAll('.filter-btn');
  const track = document.getElementById('projectsTrack');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      track.querySelectorAll('.project-card').forEach(card => {
        const show = filter === 'todos' || card.dataset.cat === filter;
        card.classList.toggle('hidden', !show);
      });
    });
  });
}

/* ---------------------------------------------------------------------- */
/* Formulário de contato — vinculado ao WhatsApp                           */
/* Ao enviar, monta a mensagem com os dados preenchidos e abre o WhatsApp   */
/* já com o texto pronto para envio.                                       */
/* ---------------------------------------------------------------------- */
const WHATSAPP_NUMBER = '5588994086279'; // 55 + DDD 88 + número

function initContactForm(){
  const form = document.getElementById('contactForm');
  if (!form) return;
  const note = document.getElementById('formNote');
  const label = document.getElementById('submitLabel');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      note.textContent = 'Preencha os campos obrigatórios antes de enviar.';
      note.classList.remove('ok');
      return;
    }

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const message = form.message.value.trim();

    const parts = [
      `Olá, meu nome é ${name}.`,
      `E-mail: ${email}`,
    ];
    if (phone) parts.push(`Telefone: ${phone}`);
    parts.push('', message);

    const text = encodeURIComponent(parts.join('\n'));
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;

    label.textContent = 'Abrindo WhatsApp...';
    note.textContent = '';
    note.classList.remove('ok');

    setTimeout(() => {
      window.open(url, '_blank', 'noopener');
      label.textContent = 'Enviar mensagem';
      note.textContent = 'Mensagem pronta! Se o WhatsApp não abrir, verifique se seu navegador bloqueou pop-ups.';
      note.classList.add('ok');
      form.reset();
    }, 500);
  });
}
