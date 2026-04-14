/* =============================================
   ArtiNiki ✨ Dual-Brand Portfolio
   script.js
   ============================================= */

// ── Loader ─────────────────────────────────────
const loader    = document.getElementById('loader');
const loaderBar = document.getElementById('loaderBar');
let progress = 0;

const loadInterval = setInterval(() => {
  progress += Math.random() * 14 + 4;
  if (progress >= 100) {
    progress = 100;
    clearInterval(loadInterval);
    setTimeout(() => loader.classList.add('hidden'), 450);
  }
  loaderBar.style.width = progress + '%';
}, 90);

// ── Custom Star Cursor ──────────────────────────
const cursorStar = document.createElement('div');
cursorStar.className = 'cursor-star';
cursorStar.textContent = '✦';
document.body.appendChild(cursorStar);

document.addEventListener('mousemove', (e) => {
  cursorStar.style.left = e.clientX + 'px';
  cursorStar.style.top  = e.clientY + 'px';
});

// ── Sparkle Canvas Trail ────────────────────────
const canvas = document.getElementById('sparkleCanvas');
const ctx    = canvas.getContext('2d');
let sparkles = [];

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const sparkleSymbols = ['✦', '★', '✸', '✺', '⭐', '♥', '✿', '❀', '◆'];
const sparkleColors  = ['#FF1493', '#FF69B4', '#FFD700', '#DA70D6', '#FFFFFF', '#FFB6C1', '#C0C0C0'];

document.addEventListener('mousemove', (e) => {
  if (Math.random() > 0.45) return;
  sparkles.push({
    x:        e.clientX,
    y:        e.clientY,
    symbol:   sparkleSymbols[Math.floor(Math.random() * sparkleSymbols.length)],
    color:    sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
    size:     Math.random() * 15 + 9,
    alpha:    1,
    vx:       (Math.random() - 0.5) * 2.8,
    vy:       (Math.random() - 1.8) * 2.5,
    decay:    Math.random() * 0.022 + 0.018,
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.18,
  });
});

function animateSparkles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  sparkles = sparkles.filter(s => s.alpha > 0);
  for (const s of sparkles) {
    ctx.save();
    ctx.globalAlpha = s.alpha;
    ctx.font        = `${s.size}px serif`;
    ctx.fillStyle   = s.color;
    ctx.translate(s.x, s.y);
    ctx.rotate(s.rotation);
    ctx.fillText(s.symbol, -s.size / 2, s.size / 2);
    ctx.restore();
    s.x        += s.vx;
    s.y        += s.vy;
    s.alpha    -= s.decay;
    s.rotation += s.rotSpeed;
    s.vy       -= 0.04;
  }
  requestAnimationFrame(animateSparkles);
}
animateSparkles();

// ── Card Sparkle Burst on Click ─────────────────
document.querySelectorAll('.art-card').forEach(card => {
  card.addEventListener('click', () => {
    const rect = card.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    for (let i = 0; i < 14; i++) {
      const angle = (i / 14) * Math.PI * 2;
      const speed = Math.random() * 5 + 2.5;
      sparkles.push({
        x:        cx, y: cy,
        symbol:   sparkleSymbols[Math.floor(Math.random() * sparkleSymbols.length)],
        color:    sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
        size:     Math.random() * 22 + 12,
        alpha:    1,
        vx:       Math.cos(angle) * speed,
        vy:       Math.sin(angle) * speed,
        decay:    0.022,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.28,
      });
    }
  });
});

// ── ArtiNiki Gallery Filter ─────────────────────
const filterBtnsArt = document.querySelectorAll('.filter-btn-art');
const artCards      = document.querySelectorAll('#artiniki .art-card');

filterBtnsArt.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtnsArt.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filterArt;
    artCards.forEach(card => {
      card.style.display = (cat === 'all' || card.dataset.catArt === cat) ? '' : 'none';
    });
  });
});

// ── Retouching Gallery Filter ───────────────────
const filterBtnsRt = document.querySelectorAll('.filter-btn-rt');
const retouchCards = document.querySelectorAll('.retouch-card');

filterBtnsRt.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtnsRt.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filterRt;
    retouchCards.forEach(card => {
      card.style.display = (cat === 'all' || card.dataset.catRt === cat) ? '' : 'none';
    });
  });
});

// ── Visitor Counter ─────────────────────────────
const counterEl = document.getElementById('visitorCount');
if (counterEl) {
  let count = parseInt(localStorage.getItem('artinikiVisits') || '842');
  count++;
  localStorage.setItem('artinikiVisits', count);
  counterEl.textContent = String(count).padStart(6, '0');
}

// ── Nav Active Brand Highlight on Scroll ────────
const artSection     = document.getElementById('artiniki');
const retouchSection = document.getElementById('retouching');
const brandArt       = document.querySelector('.brand-art');
const brandRt        = document.querySelector('.brand-retouch');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + window.innerHeight / 2;

  if (artSection && retouchSection) {
    const artTop    = artSection.offsetTop;
    const artBottom = artTop + artSection.offsetHeight;
    const rtTop     = retouchSection.offsetTop;
    const rtBottom  = rtTop + retouchSection.offsetHeight;

    if (scrollY >= artTop && scrollY < artBottom) {
      brandArt.style.opacity = '1';
      brandRt.style.opacity  = '0.4';
    } else if (scrollY >= rtTop && scrollY < rtBottom) {
      brandArt.style.opacity = '0.4';
      brandRt.style.opacity  = '1';
    } else {
      brandArt.style.opacity = '1';
      brandRt.style.opacity  = '1';
    }
  }
});

// ── Scroll Reveal ───────────────────────────────
const revealEls = document.querySelectorAll(
  '.art-card, .retouch-card, .service-card, .project-card, .about-card, .contact-box, .skill-tag'
);
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.08 });

revealEls.forEach((el, i) => {
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(26px)';
  el.style.transition = `opacity 0.5s ease ${i * 0.04}s, transform 0.5s ease ${i * 0.04}s`;
  observer.observe(el);
});

// ── Back to Top ─────────────────────────────────
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Smooth Nav Links ────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href   = link.getAttribute('href');
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ── Contact Form ────────────────────────────────
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', () => {
    const btn = form.querySelector('.btn-send');
    btn.textContent = 'Sent! ✦';
    btn.style.background = 'linear-gradient(135deg, #4CAF50, #2E7D32)';
    btn.style.boxShadow  = '4px 4px 0 #1B5E20';
    setTimeout(() => {
      btn.textContent = 'Send ♥';
      btn.style.background = '';
      btn.style.boxShadow  = '';
    }, 3000);
  });
}

// ══════════════════════════════════════════════
// AI CHAT WIDGET
// ══════════════════════════════════════════════

const SYSTEM_PROMPT = `You are an AI assistant for Nikki Lou's creative portfolio website. You are warm, enthusiastic, and concise. Keep every reply to 2–4 sentences and use the occasional ✦ or ✨ emoji to match the y2k aesthetic.

ABOUT NIKKI:
Nikki Lou is a creative designer and aspiring game developer passionate about building immersive digital experiences. She combines visual design, storytelling, and UX to create engaging, memorable projects.

SKILLS & INTERESTS:
- Game concept development, character design, indie horror games, narrative-driven experiences
- UI/UX design, digital illustration, stylized visual content
- Photo retouching (portrait, lifestyle, real estate, restoration, manipulation)
- Web design and digital content creation

PROJECTS:
1. ArtiNiki – Personal art gallery: colored pencil, Ibis Paint digital art, Xixi Art
2. Retouching by Nikki – Professional photo retouching portfolio
3. The Dark Gallery – 3D walkable virtual gallery built with Three.js (avatar selection, day/night mode, tarot readings)
4. Brew Haven – Manila specialty coffee blog with café reviews and brewing guides
5. MP2 Bloom Calculator – Financial savings tracker with 6-year compounded growth + sunflower progress

CONTACT:
Email: nbaguhin@gmail.com | Instagram: @artiniki_lou

If asked about hiring, commissions, or collaboration — encourage them to email nbaguhin@gmail.com. Be friendly and helpful!`;

const SMART_REPLIES = [
  {
    keys: /project|work|portfolio|built|made|creat/i,
    reply: "Nikki has 5 projects: ArtiNiki (personal art), The Dark Gallery (3D Three.js gallery!), Brew Haven (Manila coffee blog), the MP2 Bloom Calculator, and her Retouching by Nikki portfolio ✦ Each one showcases a different side of her creativity!"
  },
  {
    keys: /retouch|photo|edit|portrait|skin|blemish|real.?estate/i,
    reply: "Nikki does professional photo retouching through 'Retouching by Nikki' ✦ She handles portrait retouching, lifestyle photography, real estate editing, photo restoration, and creative manipulations!"
  },
  {
    keys: /art|draw|illustrat|paint|colored.?pencil|ibis|xixi/i,
    reply: "ArtiNiki is Nikki's personal art space ✨ She creates colored pencil work, digital art using Ibis Paint, and Xixi Art pieces. Her work is emotion-driven and experimental — made to feel, not just to look perfect!"
  },
  {
    keys: /game|horror|indie|game.?dev|character|narrative|develop/i,
    reply: "Nikki is an aspiring game developer with a passion for indie horror and narrative-driven experiences ✦ She has a background in game concept development and character design, and loves blending aesthetics with immersive storytelling!"
  },
  {
    keys: /dark.?gallery|3d|three.?js|walk|virtual|avatar|tarot/i,
    reply: "The Dark Gallery is Nikki's most immersive project ✦ It's a fully 3D walkable art gallery built with Three.js — pick an avatar, explore rooms, click artworks to inspect them, get a tarot reading, and toggle day/night mode!"
  },
  {
    keys: /brew|coffee|café|manila|blog|specialty/i,
    reply: "Brew Haven is Nikki's Manila coffee blog ✨ It covers specialty coffee shops, pour-over guides, café reviews, and everything for coffee lovers in Metro Manila — with beautiful dark web design!"
  },
  {
    keys: /mp2|savings|calculat|finance|money|bloom/i,
    reply: "The MP2 Bloom Calculator helps you track PAG-IBIG MP2 savings over 6 years ✦ You can input monthly amounts, and watch a sunflower grow as your money compounds — it's finance made cute!"
  },
  {
    keys: /contact|hire|collab|commission|email|reach|work.?with/i,
    reply: "Nikki is always open to new opportunities and creative challenges! ✦ You can reach her at nbaguhin@gmail.com or on Instagram @artiniki_lou. Don't hesitate — she'd love to hear from you!"
  },
  {
    keys: /skill|good.?at|speciali|know.?how|expert|tool/i,
    reply: "Nikki's skills span game concept development, character design, UI/UX, photo retouching, digital illustration, and web design ✦ She blends aesthetics with functionality in every project she touches!"
  },
  {
    keys: /hi|hello|hey|yo|sup|hiya|howdy/i,
    reply: "Hi there! ✦ I'm Nikki's AI assistant — I know everything about her projects, skills, and how to work with her. What would you like to know? ✨"
  },
  {
    keys: /who.?is|about.?nikki|tell.?me.?about|introduce/i,
    reply: "Nikki Lou is a creative designer and aspiring game developer ✦ She builds immersive digital experiences — from 3D art galleries to photo retouching to coffee blogs. She's passionate, detail-oriented, and always open to new collaborations!"
  },
  {
    keys: /api.?key|claude|anthropic|key|powered/i,
    reply: "You can plug in a Claude API key via the ⚙ settings button above ✦ That unlocks real AI responses powered by Anthropic's Claude! Get your key at console.anthropic.com."
  }
];

const DEFAULT_REPLIES = [
  "Great question! ✦ Nikki is a creative designer and aspiring game developer. Want to know about her specific projects, skills, or how to get in touch?",
  "I'd love to help! ✨ You can ask me about Nikki's art, retouching work, game dev interests, the 3D gallery, or how to hire her!",
  "Nikki works on everything from immersive 3D galleries to professional photo retouching ✦ What aspect of her work are you curious about?",
];

// ── DOM refs ──
const chatFab        = document.getElementById('chatFab');
const chatPanel      = document.getElementById('chatPanel');
const chatCloseBtn   = document.getElementById('chatCloseBtn');
const chatSettingsBtn= document.getElementById('chatSettingsBtn');
const apiKeyPanel    = document.getElementById('apiKeyPanel');
const apiKeyInput    = document.getElementById('apiKeyInput');
const apiKeySaveBtn  = document.getElementById('apiKeySaveBtn');
const chatMessages   = document.getElementById('chatMessages');
const chatChips      = document.getElementById('chatChips');
const chatInput      = document.getElementById('chatInput');
const chatSendBtn    = document.getElementById('chatSendBtn');

// ── State ──
let chatOpen        = false;
let isSending       = false;
let conversationHistory = [];

// Load saved key
const savedApiKey = localStorage.getItem('nikkiAIKey');
if (savedApiKey) apiKeyInput.value = savedApiKey;

// ── Open / Close ──
function openChat() {
  chatOpen = true;
  chatPanel.classList.add('chat-open');
  chatPanel.removeAttribute('aria-hidden');
  chatFab.setAttribute('aria-expanded', 'true');
  setTimeout(() => chatInput.focus(), 200);
}
function closeChat() {
  chatOpen = false;
  chatPanel.classList.remove('chat-open');
  chatPanel.setAttribute('aria-hidden', 'true');
  chatFab.setAttribute('aria-expanded', 'false');
}

chatFab.addEventListener('click', () => chatOpen ? closeChat() : openChat());
chatCloseBtn.addEventListener('click', closeChat);

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && chatOpen) closeChat();
});

// ── Settings ──
chatSettingsBtn.addEventListener('click', () => {
  const hidden = apiKeyPanel.hidden;
  apiKeyPanel.hidden = !hidden;
  if (!hidden) return;
  apiKeyInput.focus();
});

apiKeySaveBtn.addEventListener('click', () => {
  const key = apiKeyInput.value.trim();
  if (!key) return;
  localStorage.setItem('nikkiAIKey', key);
  apiKeyPanel.hidden = true;
  addMessage('ai', "API key saved! ✦ I'm now powered by Claude AI — ask me anything about Nikki!");
});

// ── Quick chips ──
chatChips.addEventListener('click', (e) => {
  const chip = e.target.closest('.chat-chip');
  if (!chip) return;
  chatInput.value = chip.dataset.msg;
  chatChips.style.display = 'none';
  sendMessage();
});

// ── Send ──
chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
});
chatSendBtn.addEventListener('click', sendMessage);

function addMessage(role, text) {
  const wrap = document.createElement('div');
  wrap.className = `chat-msg ${role === 'ai' ? 'ai-msg' : 'user-msg'}`;

  if (role === 'ai') {
    wrap.innerHTML = `
      <div class="msg-avatar-sm">✦</div>
      <div class="msg-bubble">${text.replace(/\n/g, '<br>')}</div>`;
  } else {
    wrap.innerHTML = `<div class="msg-bubble">${text}</div>`;
  }

  chatMessages.appendChild(wrap);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTyping() {
  const el = document.createElement('div');
  el.className = 'chat-msg ai-msg typing-bubble';
  el.id = 'typingBubble';
  el.innerHTML = `
    <div class="msg-avatar-sm">✦</div>
    <div class="msg-bubble">
      <div class="typing-dots"><span></span><span></span><span></span></div>
    </div>`;
  chatMessages.appendChild(el);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTyping() {
  document.getElementById('typingBubble')?.remove();
}

function getSmartReply(text) {
  for (const { keys, reply } of SMART_REPLIES) {
    if (keys.test(text)) return reply;
  }
  return DEFAULT_REPLIES[Math.floor(Math.random() * DEFAULT_REPLIES.length)];
}

async function sendMessage() {
  const text = chatInput.value.trim();
  if (!text || isSending) return;

  chatInput.value = '';
  isSending = true;
  chatSendBtn.disabled = true;

  addMessage('user', text);
  conversationHistory.push({ role: 'user', content: text });

  showTyping();

  const apiKey = localStorage.getItem('nikkiAIKey');

  if (apiKey) {
    // ── Real Claude AI ──
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 350,
          system: SYSTEM_PROMPT,
          messages: conversationHistory.slice(-12)
        })
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const reply = data.content[0].text;

      removeTyping();
      addMessage('ai', reply);
      conversationHistory.push({ role: 'assistant', content: reply });

    } catch (err) {
      removeTyping();
      const errMsg = err.message.includes('401')
        ? "Invalid API key ✦ Please check the key in settings and try again."
        : "Connection hiccup! ✦ Please try again in a moment.";
      addMessage('ai', errMsg);
    }

  } else {
    // ── Smart fallback (no API key needed) ──
    await new Promise(r => setTimeout(r, 700 + Math.random() * 500));
    removeTyping();
    const reply = getSmartReply(text);
    addMessage('ai', reply);
    conversationHistory.push({ role: 'assistant', content: reply });
  }

  isSending = false;
  chatSendBtn.disabled = false;
  chatInput.focus();
}
