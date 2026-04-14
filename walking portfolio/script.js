import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

/* ═══════════════════════════════════════════════════════
   🎨 ARTWORKS — personal gallery
   ═══════════════════════════════════════════════════════ */
const ARTWORKS = [
  // ── Colored Pencil (Left Wall, idx 0-3) ──
  { title: 'Punk',          desc: 'Colored pencil',    url: 'artwork/colored pencil/punk.webp' },
  { title: 'Back Study',    desc: 'Colored pencil',    url: 'artwork/colored pencil/backwoman.webp' },
  { title: 'Black & Pink',  desc: 'Colored pencil',    url: 'artwork/colored pencil/blackpink.webp' },
  { title: 'Coffee Girl',   desc: 'Colored pencil',    url: 'artwork/colored pencil/coffegirl.webp' },

  // ── Digital Arts (Right Wall, idx 4-13) ──
  { title: 'Portrait I',    desc: 'Digital art',       url: 'artwork/digital arts/me1.webp' },
  { title: 'Portrait II',   desc: 'Digital art',       url: 'artwork/digital arts/me2.webp' },
  { title: 'Mao Mao',       desc: 'Digital art',       url: 'artwork/digital arts/maomao.webp' },
  { title: 'White Hair',    desc: 'Digital art',       url: 'artwork/digital arts/whitehair.webp' },
  { title: 'Mother & Child',desc: 'Digital art',       url: 'artwork/digital arts/motherandchild.webp' },
  { title: 'Punkie',        desc: 'Digital art',       url: 'artwork/digital arts/punkie.webp' },
  { title: 'Heart',         desc: 'Digital art',       url: 'artwork/digital arts/heart.png' },
  { title: 'Logo Tops',     desc: 'Digital art',       url: 'artwork/digital arts/logotops.webp' },
  { title: 'Cabbi',         desc: 'Digital art',       url: 'artwork/digital arts/cabbi.png' },
  { title: 'Study',         desc: 'Digital art',       url: 'artwork/digital arts/1000000412.png' },

  // ── Xixi Character (Back Wall, idx 14-23) ──
  { title: 'Xixi',          desc: 'Xixi character',    url: 'artwork/Xixi/xixi.png' },
  { title: 'Xixi I',        desc: 'Xixi character',    url: 'artwork/Xixi/xixi1.png' },
  { title: 'Xixi II',       desc: 'Xixi character',    url: 'artwork/Xixi/xixi2.png' },
  { title: 'Xixi III',      desc: 'Xixi character',    url: 'artwork/Xixi/xixi3.png' },
  { title: 'Xixi IV',       desc: 'Xixi character',    url: 'artwork/Xixi/xixi4.png' },
  { title: 'Xixi V',        desc: 'Xixi character',    url: 'artwork/Xixi/xixi5.png' },
  { title: 'Sunflower',     desc: 'Xixi character',    url: 'artwork/Xixi/sunflower.png' },
  { title: 'Punkie',        desc: 'Xixi character',    url: 'artwork/Xixi/punkie.png' },
  { title: 'Wednesday',     desc: 'Xixi character',    url: 'artwork/Xixi/wednesday.png' },
  { title: 'Pour Over',     desc: 'Xixi character',    url: 'artwork/Xixi/pour over.png' },

  // ── Archetype Wing (back-right alcove, idx 24-30) ──
  { title: 'The Maiden',    desc: 'Archetype series',  url: 'archetype/cards/maiden.png' },
  { title: 'The Mother',    desc: 'Archetype series',  url: 'archetype/cards/mother.png' },
  { title: 'The Queen',     desc: 'Archetype series',  url: 'archetype/cards/queen.png' },
  { title: 'The Huntress',  desc: 'Archetype series',  url: 'archetype/cards/huntress.png' },
  { title: 'The Mystic',    desc: 'Archetype series',  url: 'archetype/cards/mystic.png' },
  { title: 'The Lover',     desc: 'Archetype series',  url: 'archetype/cards/lover.png' },
  { title: 'The Sage',      desc: 'Archetype series',  url: 'archetype/cards/sage.png' },
];

/* ═══════════════════════════════════════════════════════
   🔮 ARCHETYPE READINGS — tarot mini-game data
   ═══════════════════════════════════════════════════════ */
const ARCHETYPE_READINGS = {
  'The Maiden': {
    tagline: 'She who stands at the threshold of becoming',
    reading: 'The Maiden appears to remind you that innocence is not weakness — it is the courage to begin again. You are being called to embrace your untouched potential and see the world with wonder. A new chapter awakens for those willing to release what they think they know.',
    aspects: [
      { word: 'DAWN',    meaning: 'New beginnings stir within you' },
      { word: 'WONDER',  meaning: 'Let curiosity be your compass' },
      { word: 'PROMISE', meaning: 'Your path ahead is unwritten' },
    ],
  },
  'The Mother': {
    tagline: 'She who creates, nurtures, and sustains all life',
    reading: 'The Mother arrives with an invitation to tend to yourself and others with fierce compassion. You carry the power to create — whether of art, love, or possibility. Remember: the well must be filled before it can overflow for others.',
    aspects: [
      { word: 'ABUNDANCE',  meaning: 'You already have enough' },
      { word: 'TENDERNESS', meaning: 'Allow yourself to soften' },
      { word: 'CREATION',   meaning: 'Something new is ready to be born' },
    ],
  },
  'The Queen': {
    tagline: 'She who rules herself before she rules the world',
    reading: 'The Queen does not ask for her throne — she claims it. This reading arrives when you are ready to step into your full authority. Stop shrinking to fit spaces not built for you. Your sovereignty is not arrogance — it is your birthright.',
    aspects: [
      { word: 'COMMAND',     meaning: 'You were born to own this space' },
      { word: 'SOVEREIGNTY', meaning: 'You need no one\'s permission' },
      { word: 'GRACE',       meaning: 'True power moves with elegance' },
    ],
  },
  'The Huntress': {
    tagline: 'She who pursues what calls her with singular devotion',
    reading: 'The Huntress moves through the world with focus and wild grace. She does not wait for perfect conditions — she moves. You are being called to pursue what lights you up with everything you have, leaving hesitation in the brush behind you.',
    aspects: [
      { word: 'FOCUS',   meaning: 'One arrow. One true aim.' },
      { word: 'FREEDOM', meaning: 'Untame what has been caged' },
      { word: 'PURSUIT', meaning: 'The chase itself is sacred' },
    ],
  },
  'The Mystic': {
    tagline: 'She who sees beyond the veil of the ordinary',
    reading: 'The Mystic speaks in symbols and silence. She arrives when your intuition is louder than your logic — and it is time to trust it fully. The answers you seek are not found outside, but in the deep, still waters of your own knowing.',
    aspects: [
      { word: 'VISIONS',    meaning: 'Trust what you already see' },
      { word: 'MYSTERY',    meaning: 'Not everything must be understood' },
      { word: 'INNER SIGHT', meaning: 'The oracle lives within you' },
    ],
  },
  'The Lover': {
    tagline: 'She who opens her heart to the beauty of all things',
    reading: 'The Lover is not only about romance — she is about the fullness of feeling. She calls you to be present, to be moved, to stop numbing yourself to beauty. Let yourself want. Let yourself be affected. Risk being seen in your full longing.',
    aspects: [
      { word: 'DESIRE',     meaning: 'Name what your heart truly wants' },
      { word: 'BEAUTY',     meaning: 'The world is asking you to notice it' },
      { word: 'CONNECTION', meaning: 'Risk the vulnerability of being known' },
    ],
  },
  'The Sage': {
    tagline: 'She who has walked through fire and kept her knowing',
    reading: 'The Sage carries the weight of experience with lightness. She has learned that not all battles are worth fighting, and not all truths need speaking — only those that liberate. You are wiser than you give yourself credit for. Trust your earned discernment.',
    aspects: [
      { word: 'CLARITY', meaning: 'See through illusion without effort' },
      { word: 'TRUTH',   meaning: 'Speak only what sets someone free' },
      { word: 'WISDOM',  meaning: 'Yours is earned, not borrowed' },
    ],
  },
};

/* ═══════════════════════════════════════════════════════
   RENDERER
   ═══════════════════════════════════════════════════════ */
const canvas = document.getElementById('c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.85;

/* ═══════════════════════════════════════════════════════
   SCENE & CAMERA
   ═══════════════════════════════════════════════════════ */
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf8f5f0);
scene.fog = new THREE.FogExp2(0xf8f5f0, 0.015);

const camera = new THREE.PerspectiveCamera(72, window.innerWidth / window.innerHeight, 0.05, 100);
camera.position.set(0, 1.7, 10);

/* ═══════════════════════════════════════════════════════
   CONTROLS
   ═══════════════════════════════════════════════════════ */
const controls = new PointerLockControls(camera, document.body);
scene.add(controls.getObject());


/* ═══════════════════════════════════════════════════════
   ROOM GEOMETRY
   Main hall + archetype wing
   ═══════════════════════════════════════════════════════ */
const ROOM_W = 36, ROOM_H = 6.5, ROOM_D = 22;
// Archetype wing off the right side of the back wall
const WING_W = 14, WING_D = 10;
const WING_X = ROOM_W / 2 + WING_W / 2; // center of wing
const WING_Z = -ROOM_D / 2 + WING_D / 2; // aligns to back-right corner

// MP3 Room — symmetric wing on the left side
const MP3_W = 14, MP3_D = 10;
const MP3_X = -ROOM_W / 2 - MP3_W / 2; // = -25 (center of mp3 room)
const MP3_Z = -ROOM_D / 2 + MP3_D / 2;  // = -6  (same depth as archetype wing)

// Marble floor texture — light cream with subtle gray veins
const _fc = document.createElement('canvas');
_fc.width = _fc.height = 512;
const _fx = _fc.getContext('2d');
_fx.fillStyle = '#f0ece5';
_fx.fillRect(0, 0, 512, 512);
// Subtle tile grid
_fx.strokeStyle = 'rgba(180,170,160,0.35)';
_fx.lineWidth = 1.2;
for (let _i = 0; _i <= 8; _i++) {
  const _p = _i * 64;
  _fx.beginPath(); _fx.moveTo(_p,0); _fx.lineTo(_p,512); _fx.stroke();
  _fx.beginPath(); _fx.moveTo(0,_p); _fx.lineTo(512,_p); _fx.stroke();
}
// Faint marble vein lines
_fx.strokeStyle = 'rgba(160,150,140,0.18)';
_fx.lineWidth = 0.8;
[[30,0,200,512],[0,80,512,320],[100,0,440,512],[0,200,512,100]].forEach(([x1,y1,x2,y2]) => {
  _fx.beginPath(); _fx.moveTo(x1,y1); _fx.lineTo(x2,y2); _fx.stroke();
});
const _gridTex = new THREE.CanvasTexture(_fc);
_gridTex.wrapS = _gridTex.wrapT = THREE.RepeatWrapping;
_gridTex.repeat.set(8, 5);

const matWall  = new THREE.MeshStandardMaterial({ color: 0xf7f5f2, roughness: 0.92, metalness: 0.0 });
const matFloor = new THREE.MeshStandardMaterial({ map: _gridTex, color: 0xede9e3, roughness: 0.18, metalness: 0.02 });
const matCeil  = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.95 });
const matSkirt = new THREE.MeshStandardMaterial({ color: 0xe0dbd5, roughness: 0.80, metalness: 0.0 });
const matArch  = new THREE.MeshStandardMaterial({ color: 0xf5f3f0, roughness: 0.92, metalness: 0.0 });

function addBox(w, h, d, mat, x, y, z, ry = 0) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  m.rotation.y = ry;
  m.receiveShadow = true;
  m.castShadow = true;
  scene.add(m);
  return m;
}

// ── Main Hall ──────────────────────────────────────────
addBox(ROOM_W, 0.12, ROOM_D, matFloor, 0, 0, 0);
addBox(ROOM_W, 0.12, ROOM_D, matCeil,  0, ROOM_H, 0);
// Right wall — gap for archetype wing doorway at the back
const DOOR_W = 4, DOOR_H = 3.5;
const doorZ  = -ROOM_D / 2 + WING_D / 2; // z center of doorway in main hall
const segFront = (ROOM_D / 2 + doorZ - DOOR_W / 2);
const segBack  = (ROOM_D / 2 - doorZ - DOOR_W / 2);
// Left wall — gap for MP3 room doorway (same z position as archetype wing doorway)
addBox(0.12, ROOM_H, segFront, matWall, -ROOM_W/2, ROOM_H/2, -ROOM_D/2 + segFront/2);
addBox(0.12, ROOM_H, segBack,  matWall, -ROOM_W/2, ROOM_H/2,  ROOM_D/2 - segBack/2);
addBox(0.12, ROOM_H - DOOR_H, DOOR_W, matWall, -ROOM_W/2, DOOR_H + (ROOM_H - DOOR_H)/2, doorZ);
// front segment of right wall
addBox(0.12, ROOM_H, segFront, matWall,
       ROOM_W / 2,   ROOM_H / 2,
       -ROOM_D / 2 + segFront / 2);
// back segment of right wall
addBox(0.12, ROOM_H, segBack, matWall,
       ROOM_W / 2,   ROOM_H / 2,
       ROOM_D / 2 - segBack / 2);
// lintel above doorway
addBox(0.12, ROOM_H - DOOR_H, DOOR_W, matWall,
       ROOM_W / 2, DOOR_H + (ROOM_H - DOOR_H) / 2, doorZ);
// Back wall (full)
addBox(ROOM_W, ROOM_H, 0.12, matWall, 0, ROOM_H / 2, -ROOM_D / 2);
// Front wall
addBox(ROOM_W, ROOM_H, 0.12, matWall, 0, ROOM_H / 2,  ROOM_D / 2);

// ── Archetype Wing ─────────────────────────────────────
addBox(WING_W, 0.12, WING_D, matFloor, WING_X, 0, WING_Z);
addBox(WING_W, 0.12, WING_D, matCeil,  WING_X, ROOM_H, WING_Z);
// Far right wall of wing
addBox(0.12, ROOM_H, WING_D, matArch, WING_X + WING_W / 2, ROOM_H / 2, WING_Z);
// Back wall of wing (shared with main room back wall — already exists)
// Front wall of wing (connects to main room right wall gap)
const wingFrontZ = WING_Z + WING_D / 2;
// Wing entrance walls (sides of doorway into wing)
addBox(WING_W - DOOR_W, ROOM_H, 0.12, matArch,
       WING_X + DOOR_W / 2, ROOM_H / 2, wingFrontZ);

// ── MP3 Room ───────────────────────────────────────────

addBox(MP3_W, 0.12, MP3_D, matFloor,  MP3_X, 0,        MP3_Z); // floor
addBox(MP3_W, 0.12, MP3_D, matCeil,   MP3_X, ROOM_H,   MP3_Z); // ceiling
// Far left wall
addBox(0.12, ROOM_H, MP3_D, matArch, MP3_X - MP3_W / 2, ROOM_H / 2, MP3_Z);
// Back wall extension (left of main hall back wall)
addBox(MP3_W, ROOM_H, 0.12, matArch, MP3_X, ROOM_H / 2, -ROOM_D / 2);

// ── Skirting boards ────────────────────────────────────
addBox(ROOM_W, 0.2, 0.06, matSkirt, 0, 0.1, -ROOM_D / 2 + 0.06);
addBox(ROOM_W, 0.2, 0.06, matSkirt, 0, 0.1,  ROOM_D / 2 - 0.06);
addBox(0.06, 0.2, ROOM_D, matSkirt, -ROOM_W / 2 + 0.06, 0.1, 0);
addBox(0.06, 0.2, WING_D, matSkirt,  WING_X + WING_W / 2 - 0.06, 0.1, WING_Z);
// MP3 room skirting
addBox(0.06, 0.2, MP3_D, matSkirt, MP3_X - MP3_W / 2 + 0.06, 0.1, MP3_Z);

// ── Doorway gold trim (right-side archetype wing) ────────
const matGoldTrim = new THREE.MeshStandardMaterial({
  color: 0xc8a050, roughness: 0.3, metalness: 0.8,
});
addBox(0.04, DOOR_H, 0.04, matGoldTrim, ROOM_W/2, DOOR_H/2, doorZ - DOOR_W/2);
addBox(0.04, DOOR_H, 0.04, matGoldTrim, ROOM_W/2, DOOR_H/2, doorZ + DOOR_W/2);
addBox(0.04, 0.04, DOOR_W + 0.05, matGoldTrim, ROOM_W/2, DOOR_H, doorZ);

// ── Doorway gold trim (left-side MP3 room) ───────────────
addBox(0.04, DOOR_H, 0.04, matGoldTrim, -ROOM_W/2, DOOR_H/2, doorZ - DOOR_W/2);
addBox(0.04, DOOR_H, 0.04, matGoldTrim, -ROOM_W/2, DOOR_H/2, doorZ + DOOR_W/2);
addBox(0.04, 0.04, DOOR_W + 0.05, matGoldTrim, -ROOM_W/2, DOOR_H, doorZ);

// ── Archetype wing portal — frosted glass pane ───────────
const _portalMat = new THREE.MeshStandardMaterial({
  color: 0xeef4ff, transparent: true, opacity: 0.12,
  roughness: 0.05, metalness: 0.0,
  side: THREE.DoubleSide, depthWrite: false,
});
const portalMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(DOOR_W - 0.15, DOOR_H - 0.08),
  _portalMat
);
portalMesh.position.set(ROOM_W / 2, DOOR_H / 2, doorZ);
portalMesh.rotation.y = Math.PI / 2;
scene.add(portalMesh);

// MP3 room portal — purple-tinted glass
const _mp3PortalMat = new THREE.MeshStandardMaterial({
  color: 0xcc88ff, transparent: true, opacity: 0.10,
  roughness: 0.05, metalness: 0.0,
  side: THREE.DoubleSide, depthWrite: false,
});
const mp3PortalMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(DOOR_W - 0.15, DOOR_H - 0.08),
  _mp3PortalMat
);
mp3PortalMesh.position.set(-ROOM_W / 2, DOOR_H / 2, doorZ);
mp3PortalMesh.rotation.y = Math.PI / 2;
scene.add(mp3PortalMesh);

// ── Ornamental archway columns ─────────────────────────
const matCol = new THREE.MeshStandardMaterial({ color: 0xd8d3c8, roughness: 0.38, metalness: 0.12 });
function addColumn(x, z) {
  addBox(0.3, ROOM_H, 0.3, matCol, x, ROOM_H / 2, z);
}
// Right (archetype) doorway columns
addColumn(ROOM_W / 2, doorZ - DOOR_W / 2 - 0.15);
addColumn(ROOM_W / 2, doorZ + DOOR_W / 2 + 0.15);
// Left (MP3) doorway columns
addColumn(-ROOM_W / 2, doorZ - DOOR_W / 2 - 0.15);
addColumn(-ROOM_W / 2, doorZ + DOOR_W / 2 + 0.15);

// ── MP3 room large screen (interactive) ─────────────────
const _sc = document.createElement('canvas');
_sc.width = 1024; _sc.height = 640;
const _sx = _sc.getContext('2d');
// Screen background
const _sg = _sx.createLinearGradient(0, 0, 0, 640);
_sg.addColorStop(0, '#0d0520'); _sg.addColorStop(1, '#160830');
_sx.fillStyle = _sg; _sx.fillRect(0, 0, 1024, 640);
// Waveform bars
_sx.fillStyle = 'rgba(180,100,255,0.7)';
for (let _bi = 0; _bi < 48; _bi++) {
  const _bh = 40 + Math.abs(Math.sin(_bi * 0.7)) * 120;
  _sx.fillRect(80 + _bi * 18, 320 - _bh / 2, 12, _bh);
}
// Title
_sx.font = 'bold 64px "Cormorant Garamond", Georgia, serif';
_sx.fillStyle = '#e0b0ff';
_sx.textAlign = 'center';
_sx.fillText('♫  MUSIC PLAYER', 512, 120);
// Divider
_sx.strokeStyle = 'rgba(180,100,255,0.4)'; _sx.lineWidth = 1.5;
_sx.beginPath(); _sx.moveTo(80, 155); _sx.lineTo(944, 155); _sx.stroke();
// Prompt
_sx.font = '300 30px Montserrat, sans-serif';
_sx.fillStyle = 'rgba(200,150,255,0.6)';
_sx.fillText('CLICK TO OPEN APP', 512, 580);
const _screenTex = new THREE.CanvasTexture(_sc);
const screenW = 5.5, screenH = 3.4;
const screenMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(screenW, screenH),
  new THREE.MeshBasicMaterial({ map: _screenTex })
);
// Mount on the far-left wall, facing into the room (+X direction)
screenMesh.position.set(MP3_X - MP3_W / 2 + 0.20, 2.6, MP3_Z);
screenMesh.rotation.y = Math.PI / 2;
scene.add(screenMesh);
// Screen frame — rotated to lie flat against the far-left wall
const matScreenFrame = new THREE.MeshStandardMaterial({ color: 0x100820, roughness: 0.3, metalness: 0.6 });
addBox(0.08, screenH + 0.22, screenW + 0.22, matScreenFrame,
       MP3_X - MP3_W / 2 + 0.08, 2.6, MP3_Z);
// (screen registered into artObjects after it is declared — see below)

// Screen glow light
const screenGlow = new THREE.PointLight(0xaa44ff, 2.5, 8);
screenGlow.position.set(MP3_X - MP3_W / 2 + 1.5, 2.6, MP3_Z);
scene.add(screenGlow);

// ── Ceiling recessed LED light strips ─────────────────
const stripMat = new THREE.MeshStandardMaterial({
  color: 0xfff8e8, emissive: 0xfff5d0, emissiveIntensity: 3.5,
});
[-12, -6, 0, 6, 12].forEach(x => {
  addBox(0.08, 0.04, 1.2, stripMat, x, ROOM_H - 0.08, 0);
});
// Wing ceiling strips
[WING_X - 3, WING_X + 3].forEach(x => {
  addBox(0.08, 0.04, 1.2, stripMat, x, ROOM_H - 0.08, WING_Z);
});
// MP3 room ceiling strips (purple tint)
const mp3StripMat = new THREE.MeshStandardMaterial({
  color: 0xf0e0ff, emissive: 0xcc88ff, emissiveIntensity: 2.8,
});
[MP3_X - 3, MP3_X + 3].forEach(x => {
  addBox(0.08, 0.04, 1.2, mp3StripMat, x, ROOM_H - 0.08, MP3_Z);
});

/* ═══════════════════════════════════════════════════════
   LIGHTING — white gallery default (bright day)
   ═══════════════════════════════════════════════════════ */
const ambientLight = new THREE.AmbientLight(0xfff8f0, 2.8);
scene.add(ambientLight);

const spotLights = [];
[-12, -6, 0, 6, 12].forEach(x => {
  const spot = new THREE.SpotLight(0xfff5e8, 5.5, 18, Math.PI / 7, 0.45, 1.6);
  spot.position.set(x, ROOM_H - 0.15, 0);
  spot.target.position.set(x, 0, 0);
  spot.castShadow = true;
  spot.shadow.mapSize.set(512, 512);
  scene.add(spot);
  scene.add(spot.target);
  spotLights.push(spot);
});

// Wing ambiance — warm accent
const wingLight = new THREE.PointLight(0xffe8c0, 1.8, 20);
wingLight.position.set(WING_X, 3.5, WING_Z);
scene.add(wingLight);

const pictureLights = [];

const fillLight = new THREE.PointLight(0xfff0e0, 1.2, 40);
fillLight.position.set(0, 3.5, 0);
scene.add(fillLight);

/* ═══════════════════════════════════════════════════════
   SECTION HEADERS (3D text labels on wall)
   ═══════════════════════════════════════════════════════ */
function makeSectionHeader(text, x, y, z, rotY) {
  const c = document.createElement('canvas');
  c.width = 1024; c.height = 160;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 1024, 160);

  // Background pill for legibility
  ctx.fillStyle = 'rgba(10,6,20,0.55)';
  ctx.fillRect(40, 10, 944, 140);

  // Rule line above text
  ctx.strokeStyle = 'rgba(200,160,80,0.7)';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(80, 46); ctx.lineTo(944, 46); ctx.stroke();

  // Main title
  ctx.font = 'bold 68px "Cormorant Garamond", Georgia, serif';
  ctx.fillStyle = '#f5d98a';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '6px';
  ctx.fillText(text.toUpperCase(), 512, 118);

  // Rule line below text
  ctx.beginPath(); ctx.moveTo(80, 134); ctx.lineTo(944, 134); ctx.stroke();

  const tex = new THREE.CanvasTexture(c);
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(6.0, 0.94),
    new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false })
  );
  mesh.position.set(x, y, z);
  mesh.rotation.y = rotY;
  scene.add(mesh);
}

// Label above back wall paintings (centered)
makeSectionHeader('Xixi Character', 0, 4.4, -ROOM_D / 2 + 0.18, 0);
// Label on left wall (centered)
makeSectionHeader('Colored Pencil', -ROOM_W / 2 + 0.18, 4.4, 0, Math.PI / 2);
// Label on right wall (centered)
makeSectionHeader('Digital Arts', ROOM_W / 2 - 0.18, 4.4, 0, -Math.PI / 2);
// Archetype wing entrance label
makeSectionHeader('The Archetypes', WING_X + WING_W / 2 - 0.18, 4.4, WING_Z, Math.PI / 2);
// MP3 room entrance label
makeSectionHeader('Music Room', MP3_X, 4.4, MP3_Z - MP3_D / 2 + 0.18, 0);

/* ═══════════════════════════════════════════════════════
   CONTACT PANEL — front wall
   ═══════════════════════════════════════════════════════ */
let contactPanelMesh;
(function () {
  const W = 1024, H = 768;
  const cv = document.createElement('canvas');
  cv.width = W; cv.height = H;
  const cx = cv.getContext('2d');

  // Soft background
  cx.fillStyle = 'rgba(18,10,30,0.82)';
  cx.fillRect(0, 0, W, H);

  // Top pink rule
  cx.strokeStyle = 'rgba(255,120,200,0.55)';
  cx.lineWidth = 1.5;
  cx.beginPath(); cx.moveTo(60, 56); cx.lineTo(W - 60, 56); cx.stroke();

  // HELLO heading — pink glow layers
  cx.textAlign = 'center';
  cx.font = 'bold 110px "Cormorant Garamond", Georgia, serif';
  // Outer glow
  cx.shadowColor = '#ff4db8';
  cx.shadowBlur  = 40;
  cx.fillStyle   = 'rgba(255,100,200,0.35)';
  cx.fillText('HELLO', W / 2, 48);
  // Mid glow
  cx.shadowBlur  = 18;
  cx.fillStyle   = 'rgba(255,160,230,0.7)';
  cx.fillText('HELLO', W / 2, 48);
  // Sharp fill
  cx.shadowBlur  = 0;
  cx.fillStyle   = '#ffcef0';
  cx.fillText('HELLO', W / 2, 48);
  cx.shadowColor = 'transparent';

  // GET IN TOUCH subtitle — sparkly pink
  cx.font = '400 20px Montserrat, sans-serif';
  cx.shadowColor = '#ff80cc';
  cx.shadowBlur  = 12;
  cx.fillStyle   = '#ffb3e6';
  cx.fillText('✦  G E T  I N  T O U C H  ✦', W / 2, 90);
  cx.shadowBlur  = 0;
  cx.shadowColor = 'transparent';

  // Second rule
  cx.strokeStyle = 'rgba(255,120,200,0.55)';
  cx.lineWidth = 1.5;
  cx.beginPath(); cx.moveTo(60, 110); cx.lineTo(W - 60, 110); cx.stroke();

  // Helper: draw a labelled field line
  function field(label, y) {
    cx.font = '400 18px Montserrat, sans-serif';
    cx.fillStyle = 'rgba(200,160,80,0.75)';
    cx.textAlign = 'left';
    cx.fillText(label, 70, y - 6);
    cx.strokeStyle = 'rgba(200,160,80,0.35)';
    cx.lineWidth = 1;
    cx.beginPath(); cx.moveTo(70, y + 4); cx.lineTo(W - 70, y + 4); cx.stroke();
  }

  field('NAME', 172);
  field('EMAIL', 252);
  field('MESSAGE', 332);

  // Message box outline
  cx.strokeStyle = 'rgba(200,160,80,0.25)';
  cx.lineWidth = 1;
  cx.strokeRect(70, 342, W - 140, 130);

  // Divider before contact info
  cx.strokeStyle = 'rgba(200,160,80,0.7)';
  cx.lineWidth = 2;
  cx.beginPath(); cx.moveTo(60, 510); cx.lineTo(W - 60, 510); cx.stroke();

  // CONTACT label
  cx.font = '300 16px Montserrat, sans-serif';
  cx.fillStyle = 'rgba(200,160,80,0.6)';
  cx.textAlign = 'center';
  cx.fillText('C O N T A C T', W / 2, 502);

  // Instagram
  cx.font = 'bold 32px "Cormorant Garamond", Georgia, serif';
  cx.fillStyle = '#e0b8ff';
  cx.fillText('Instagram', W / 2, 568);
  cx.font = '300 26px Montserrat, sans-serif';
  cx.fillStyle = '#ffffff';
  cx.fillText('@artiniki', W / 2, 606);

  // Email
  cx.font = 'bold 32px "Cormorant Garamond", Georgia, serif';
  cx.fillStyle = '#e0b8ff';
  cx.fillText('Email', W / 2, 658);
  cx.font = '300 26px Montserrat, sans-serif';
  cx.fillStyle = '#ffffff';
  cx.fillText('nbaguhin@gmail.com', W / 2, 696);

  // Bottom rule
  cx.strokeStyle = 'rgba(200,160,80,0.7)';
  cx.lineWidth = 2;
  cx.beginPath(); cx.moveTo(60, H - 30); cx.lineTo(W - 60, H - 30); cx.stroke();

  const tex = new THREE.CanvasTexture(cv);
  const panel = new THREE.Mesh(
    new THREE.PlaneGeometry(9.0, 6.75),
    new THREE.MeshBasicMaterial({ map: tex, transparent: true })
  );
  // Front wall faces +Z; panel faces back into the room (-Z)
  panel.position.set(0, 3.38, ROOM_D / 2 - 0.08);
  panel.rotation.y = Math.PI;
  scene.add(panel);
  contactPanelMesh = panel;
})();

/* ═══════════════════════════════════════════════════════
   ART FRAMES
   ═══════════════════════════════════════════════════════ */
const loader    = new THREE.TextureLoader();
const artObjects = [];
// Register contact panel
artObjects.push({ mesh: contactPanelMesh, art: { title: 'Contact', desc: '', url: '', isContact: true } });
// Register MP3 room screen (declared earlier, pushed here after artObjects exists)
artObjects.push({ mesh: screenMesh, art: { title: 'Music Player', desc: 'Open the MP3 app', url: '', isApp: true } });

const matFrame = new THREE.MeshStandardMaterial({
  color: 0x1c1410, roughness: 0.35, metalness: 0.35,
});

const FW = 2.5, FH = 2.0, FD = 0.07;
const ART_Y = 2.3;

// Art positions — left wall (Colored Pencil), right wall (Digital Arts),
//                 back wall (Xixi Character), archetype wing
const artConfig = [
  // ── Colored Pencil — Left wall (ry = +PI/2, face +X), idx 0-3 ──
  { wx: -ROOM_W / 2 + 0.14, wz: -7.5, ry:  Math.PI / 2, idx:  0 },
  { wx: -ROOM_W / 2 + 0.14, wz: -2.5, ry:  Math.PI / 2, idx:  1 },
  { wx: -ROOM_W / 2 + 0.14, wz:  2.5, ry:  Math.PI / 2, idx:  2 },
  { wx: -ROOM_W / 2 + 0.14, wz:  7.5, ry:  Math.PI / 2, idx:  3 },

  // ── Digital Arts — Right wall (ry = -PI/2, face -X), idx 4-13 ──
  { wx:  ROOM_W / 2 - 0.14, wz: -10.0, ry: -Math.PI / 2, idx:  4 },
  { wx:  ROOM_W / 2 - 0.14, wz:  -7.8, ry: -Math.PI / 2, idx:  5 },
  { wx:  ROOM_W / 2 - 0.14, wz:  -5.6, ry: -Math.PI / 2, idx:  6 },
  { wx:  ROOM_W / 2 - 0.14, wz:  -3.4, ry: -Math.PI / 2, idx:  7 },
  { wx:  ROOM_W / 2 - 0.14, wz:  -1.2, ry: -Math.PI / 2, idx:  8 },
  { wx:  ROOM_W / 2 - 0.14, wz:   1.0, ry: -Math.PI / 2, idx:  9 },
  { wx:  ROOM_W / 2 - 0.14, wz:   3.2, ry: -Math.PI / 2, idx: 10 },
  { wx:  ROOM_W / 2 - 0.14, wz:   5.4, ry: -Math.PI / 2, idx: 11 },
  { wx:  ROOM_W / 2 - 0.14, wz:   7.6, ry: -Math.PI / 2, idx: 12 },
  { wx:  ROOM_W / 2 - 0.14, wz:   9.8, ry: -Math.PI / 2, idx: 13 },

  // ── Xixi Character — Back wall (ry = 0, face +Z), idx 14-23 ──
  { wx: -14.4, wz: -ROOM_D / 2 + 0.14, ry: 0, idx: 14 },
  { wx: -11.2, wz: -ROOM_D / 2 + 0.14, ry: 0, idx: 15 },
  { wx:  -8.0, wz: -ROOM_D / 2 + 0.14, ry: 0, idx: 16 },
  { wx:  -4.8, wz: -ROOM_D / 2 + 0.14, ry: 0, idx: 17 },
  { wx:  -1.6, wz: -ROOM_D / 2 + 0.14, ry: 0, idx: 18 },
  { wx:   1.6, wz: -ROOM_D / 2 + 0.14, ry: 0, idx: 19 },
  { wx:   4.8, wz: -ROOM_D / 2 + 0.14, ry: 0, idx: 20 },
  { wx:   8.0, wz: -ROOM_D / 2 + 0.14, ry: 0, idx: 21 },
  { wx:  11.2, wz: -ROOM_D / 2 + 0.14, ry: 0, idx: 22 },
  { wx:  14.4, wz: -ROOM_D / 2 + 0.14, ry: 0, idx: 23 },

  // ── Archetype wing — right wall of wing (ry = -PI/2) ─
  { wx: WING_X + WING_W / 2 - 0.14, wz: WING_Z - 3,   ry: -Math.PI / 2, idx: 24 },
  { wx: WING_X + WING_W / 2 - 0.14, wz: WING_Z,       ry: -Math.PI / 2, idx: 25 },
  { wx: WING_X + WING_W / 2 - 0.14, wz: WING_Z + 3,   ry: -Math.PI / 2, idx: 26 },

  // ── Archetype wing — back wall of wing (ry = 0) ──────
  { wx: WING_X - 4, wz: -ROOM_D / 2 + 0.14, ry: 0, idx: 27 },
  { wx: WING_X,     wz: -ROOM_D / 2 + 0.14, ry: 0, idx: 28 },
  { wx: WING_X + 4, wz: -ROOM_D / 2 + 0.14, ry: 0, idx: 29 },

  // ── Archetype wing — left inner wall (ry = +PI/2) ────
  { wx: ROOM_W / 2 + 0.14, wz: WING_Z - 2, ry: Math.PI / 2, idx: 30 },
];

artConfig.forEach(({ wx, wz, ry, idx }) => {
  const art = ARTWORKS[idx];
  if (!art) return;

  // Archetypes: exact pixel ratio 1094 × 2214 → 1 : 2.024
  const isArchetype = art.url.startsWith('archetype/cards/');
  const fw  = isArchetype ? 1.7  : FW;
  const fh  = isArchetype ? 3.44 : FH;   // 1.7 × (2214/1094) = 3.44
  const cy  = isArchetype ? 2.72 : ART_Y; // raise center so label clears floor

  // Outer frame
  const frame = new THREE.Mesh(new THREE.BoxGeometry(fw + 0.22, fh + 0.22, FD), matFrame);
  frame.position.set(wx, cy, wz);
  frame.rotation.y = ry;
  frame.castShadow = true;
  scene.add(frame);

  // Inner mat liner
  const liner = new THREE.Mesh(
    new THREE.BoxGeometry(fw + 0.06, fh + 0.06, FD + 0.005),
    new THREE.MeshStandardMaterial({ color: 0x080506, roughness: 0.9 })
  );
  liner.position.set(wx, cy, wz);
  liner.rotation.y = ry;
  scene.add(liner);

  // Artwork surface — PlaneGeometry shows the full image with correct UV mapping
  const tex = loader.load(art.url);
  tex.colorSpace = THREE.SRGBColorSpace;
  const nX = Math.sin(ry);
  const nZ = Math.cos(ry);
  const artMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(fw, fh),
    new THREE.MeshStandardMaterial({ map: tex, roughness: 0.82, metalness: 0.0 })
  );
  artMesh.position.set(wx + nX * 0.08, cy, wz + nZ * 0.08);
  artMesh.rotation.y = ry;
  scene.add(artMesh);

  // Picture light — offset toward room interior based on wall normal
  const plOffX = Math.sin(ry) * 0.6;
  const plOffZ = Math.cos(ry) * 0.6;
  const pl = new THREE.SpotLight(0xffcc88, 7.0, 6.5, Math.PI / 9, 0.4, 2.2);
  pl.position.set(wx + plOffX, cy + 1.8, wz + plOffZ);
  pl.target.position.set(wx, cy - 0.2, wz);
  pl.castShadow = false;
  scene.add(pl);
  scene.add(pl.target);
  pictureLights.push(pl);

  // Title label plate
  makeLabel(art.title, wx, cy - fh / 2 - 0.32, wz, ry);

  artObjects.push({ mesh: artMesh, art });
});

/* ═══════════════════════════════════════════════════════
   CANVAS TEXT LABELS
   ═══════════════════════════════════════════════════════ */
function makeLabel(text, x, y, z, rotY) {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 72;
  const ctx = c.getContext('2d');
  ctx.fillStyle = 'rgba(20,14,10,0.0)';
  ctx.fillRect(0, 0, 512, 72);
  ctx.font = '300 26px "Cormorant Garamond", Georgia, serif';
  ctx.fillStyle = '#c8a050';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '3px';
  ctx.fillText(text, 256, 46);

  const tex = new THREE.CanvasTexture(c);
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1.7, 0.24),
    new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false })
  );
  mesh.position.set(x, y, z);
  mesh.rotation.y = rotY;
  scene.add(mesh);
}

/* ═══════════════════════════════════════════════════════
   HOLOGRAM — cute.png at music room entrance
   ═══════════════════════════════════════════════════════ */
const holoGroup = new THREE.Group();
scene.add(holoGroup);

// Main hologram image
const holoLoader = new THREE.TextureLoader();
const holoTex = holoLoader.load('artwork/cute.png');
const holoMat = new THREE.MeshBasicMaterial({
  map: holoTex,
  transparent: true,
  opacity: 0.82,
  color: new THREE.Color(0x99eeff),
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  side: THREE.DoubleSide,
});
const holoMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 2.2), holoMat);
holoGroup.add(holoMesh);

// Scanline overlay
(function () {
  const sc = document.createElement('canvas');
  sc.width = 8; sc.height = 8;
  const sx = sc.getContext('2d');
  sx.fillStyle = 'rgba(0,200,255,0.18)';
  sx.fillRect(0, 0, 8, 4);
  sx.fillStyle = 'rgba(0,0,0,0)';
  sx.fillRect(0, 4, 8, 4);
  const scanTex = new THREE.CanvasTexture(sc);
  scanTex.wrapT = THREE.RepeatWrapping;
  scanTex.repeat.set(1, 50);
  const scanMat = new THREE.MeshBasicMaterial({
    map: scanTex,
    transparent: true,
    opacity: 0.28,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const scanMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.65, 2.25), scanMat);
  scanMesh.position.z = 0.001;
  holoGroup.add(scanMesh);
})();

// Floor glow circle
const glowMat = new THREE.MeshBasicMaterial({
  color: 0x00ddff,
  transparent: true,
  opacity: 0.18,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
});
const glowCircle = new THREE.Mesh(new THREE.CircleGeometry(1.1, 32), glowMat);
glowCircle.rotation.x = -Math.PI / 2;
glowCircle.position.y = -1.1;
holoGroup.add(glowCircle);

// Cyan point light for ambient glow
const holoLight = new THREE.PointLight(0x44ffff, 1.8, 4.5);
holoLight.position.y = 0.5;
holoGroup.add(holoLight);

// Position: side wall of archetype wing (left side, against far wall)
holoGroup.position.set(WING_X - WING_W / 2 + 1.8, 1.9, WING_Z + 2.0);

/* ═══════════════════════════════════════════════════════
   BENCH / PEDESTAL (decorative)
   ═══════════════════════════════════════════════════════ */
const matBench = new THREE.MeshStandardMaterial({ color: 0x1e1614, roughness: 0.5, metalness: 0.3 });
// Central bench
addBox(3.0, 0.38, 0.8, matBench,  0, 0.19, 3);
addBox(3.0, 0.38, 0.8, matBench,  0, 0.19, -3);
// Wing bench
addBox(2.0, 0.38, 0.7, matBench, WING_X - 2, 0.19, WING_Z + 1.5);

/* ═══════════════════════════════════════════════════════
   DAY / NIGHT TOGGLE
   ═══════════════════════════════════════════════════════ */
let isDay = false;

const btnDN   = document.getElementById('btn-daynight');
const dnIcon  = document.getElementById('dn-icon');
const dnLabel = document.getElementById('dn-label');

const NIGHT = {
  bg: new THREE.Color(0x060308), fog: 0.025, ambient: 0.45,
  ambCol: new THREE.Color(0x200840), spotInt: 2.0,
  spotCol: new THREE.Color(0xeeddff), fillInt: 1.8,
  fillCol: new THREE.Color(0x3300aa), exposure: 0.9,
};
const DAY = {
  bg: new THREE.Color(0xf8f5f0), fog: 0.015, ambient: 2.8,
  ambCol: new THREE.Color(0xfff8f0), spotInt: 5.5,
  spotCol: new THREE.Color(0xfff5e8), fillInt: 1.2,
  fillCol: new THREE.Color(0xffeedd), exposure: 1.2,
};

// Sync button label with initial state (starts in night mode)
dnIcon.textContent  = '☀';
dnLabel.textContent = 'DAY MODE';

btnDN.addEventListener('click', () => {
  isDay = !isDay;
  dnIcon.textContent  = isDay ? '☾' : '☀';
  dnLabel.textContent = isDay ? 'NIGHT MODE' : 'DAY MODE';
});

function applyLighting(fac) {
  const lerp = (a, b) => a + (b - a) * fac;
  scene.background.lerpColors(NIGHT.bg, DAY.bg, fac);
  scene.fog.density = lerp(NIGHT.fog, DAY.fog);
  ambientLight.intensity = lerp(NIGHT.ambient, DAY.ambient);
  ambientLight.color.lerpColors(NIGHT.ambCol, DAY.ambCol, fac);
  fillLight.intensity = lerp(NIGHT.fillInt, DAY.fillInt);
  fillLight.color.lerpColors(NIGHT.fillCol, DAY.fillCol, fac);
  renderer.toneMappingExposure = lerp(NIGHT.exposure, DAY.exposure);
  spotLights.forEach(s => {
    s.intensity = lerp(NIGHT.spotInt, DAY.spotInt);
    s.color.lerpColors(NIGHT.spotCol, DAY.spotCol, fac);
  });
}

let dnFac = 0;

/* ═══════════════════════════════════════════════════════
   PROCEDURAL AMBIENT MUSIC (Web Audio API)
   ═══════════════════════════════════════════════════════ */
let audioCtx = null, musicNodes = [], musicPlaying = false;
const btnMusic   = document.getElementById('btn-music');
const musicIcon  = document.getElementById('music-icon');
const musicLabel = document.getElementById('music-label');

function buildAmbientMusic() {
  if (audioCtx) return;
  const AudioCtx = window.AudioContext || /** @type {typeof AudioContext} */ (window['webkitAudioContext']);
  audioCtx = new AudioCtx();
  const sr  = audioCtx.sampleRate;
  const now = audioCtx.currentTime;

  /* ── Master chain: warm lowpass → compressor → master gain ── */
  const masterGain = audioCtx.createGain();
  masterGain.gain.setValueAtTime(0, now);
  masterGain.gain.linearRampToValueAtTime(0.55, now + 3);
  masterGain.connect(audioCtx.destination);

  const comp = audioCtx.createDynamicsCompressor();
  comp.threshold.value = -20; comp.knee.value = 12;
  comp.ratio.value = 4; comp.attack.value = 0.003; comp.release.value = 0.3;
  comp.connect(masterGain);

  const warmLP = audioCtx.createBiquadFilter();
  warmLP.type = 'lowpass'; warmLP.frequency.value = 4800; warmLP.Q.value = 0.6;
  warmLP.connect(comp);

  /* ── Room reverb ── */
  const conv = audioCtx.createConvolver();
  const irLen = sr * 3;
  const irBuf = audioCtx.createBuffer(2, irLen, sr);
  for (let ch = 0; ch < 2; ch++) {
    const d = irBuf.getChannelData(ch);
    for (let i = 0; i < irLen; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / irLen, 1.8);
  }
  conv.buffer = irBuf;
  const reverbSend = audioCtx.createGain(); reverbSend.gain.value = 0.38;
  const drySend    = audioCtx.createGain(); drySend.gain.value    = 0.62;
  conv.connect(reverbSend); reverbSend.connect(warmLP);
  drySend.connect(warmLP);

  /* ── Vinyl hiss ── */
  const hissBuf = audioCtx.createBuffer(1, sr * 3, sr);
  const hissD   = hissBuf.getChannelData(0);
  for (let i = 0; i < hissD.length; i++) hissD[i] = (Math.random() * 2 - 1) * 0.018;
  const hissSrc = audioCtx.createBufferSource();
  hissSrc.buffer = hissBuf; hissSrc.loop = true;
  const hissBP = audioCtx.createBiquadFilter();
  hissBP.type = 'bandpass'; hissBP.frequency.value = 7500; hissBP.Q.value = 0.6;
  const hissG = audioCtx.createGain(); hissG.gain.value = 0.055;
  hissSrc.connect(hissBP); hissBP.connect(hissG); hissG.connect(masterGain);
  hissSrc.start(); musicNodes.push(hissSrc);

  /* ── Vinyl crackle ── */
  const crackBuf = audioCtx.createBuffer(1, sr * 4, sr);
  const crackD   = crackBuf.getChannelData(0);
  for (let i = 0; i < crackD.length; i++)
    crackD[i] = Math.random() < 0.0008 ? (Math.random() * 2 - 1) * 0.5 : 0;
  const crackSrc = audioCtx.createBufferSource();
  crackSrc.buffer = crackBuf; crackSrc.loop = true;
  const crackHP = audioCtx.createBiquadFilter();
  crackHP.type = 'highpass'; crackHP.frequency.value = 2200;
  const crackG = audioCtx.createGain(); crackG.gain.value = 0.12;
  crackSrc.connect(crackHP); crackHP.connect(crackG); crackG.connect(masterGain);
  crackSrc.start(); musicNodes.push(crackSrc);

  /* ── Lofi chord progression (Am7 → Fmaj7 → Cmaj7 → Em7) at 76 BPM ── */
  const BPM  = 76;
  const BEAT = 60 / BPM;
  const BAR  = BEAT * 4;
  const chords = [
    [110.0, 130.8, 164.8, 196.0],  // Am7
    [87.3,  110.0, 130.8, 164.8],  // Fmaj7
    [65.4,   82.4,  98.0, 123.5],  // Cmaj7
    [82.4,  123.5, 146.8, 185.0],  // Em7
  ];

  function playChord(freqs, t) {
    freqs.forEach((f, i) => {
      const o1 = audioCtx.createOscillator(); o1.type = 'triangle'; o1.frequency.value = f;
      const o2 = audioCtx.createOscillator(); o2.type = 'sine';     o2.frequency.value = f * 1.004;
      const g  = audioCtx.createGain();
      const vol = 0.038 - i * 0.005;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(vol, t + 0.12);
      g.gain.setValueAtTime(vol, t + BAR - 0.35);
      g.gain.linearRampToValueAtTime(0, t + BAR + 0.15);
      o1.connect(g); o2.connect(g);
      g.connect(drySend); g.connect(conv);
      o1.start(t); o2.start(t);
      o1.stop(t + BAR + 0.2); o2.stop(t + BAR + 0.2);
      musicNodes.push(o1, o2);
    });
    /* bass pluck on beat 1 */
    const bass = audioCtx.createOscillator(); bass.type = 'sine';
    bass.frequency.value = freqs[0] / 2;
    const bassG = audioCtx.createGain();
    bassG.gain.setValueAtTime(0.18, t);
    bassG.gain.exponentialRampToValueAtTime(0.001, t + 0.7);
    bass.connect(bassG); bassG.connect(drySend);
    bass.start(t); bass.stop(t + 0.75);
    musicNodes.push(bass);
  }

  function scheduleChords(startT) {
    chords.forEach((ch, i) => playChord(ch, startT + i * BAR));
    setTimeout(() => { if (musicPlaying && audioCtx) scheduleChords(startT + chords.length * BAR); },
      (chords.length * BAR - 0.8) * 1000);
  }
  scheduleChords(now + 0.5);

  /* ── Lofi beat: kick · snare · hi-hats ── */
  function makeKick(t) {
    const o = audioCtx.createOscillator(); o.type = 'sine';
    o.frequency.setValueAtTime(160, t);
    o.frequency.exponentialRampToValueAtTime(38, t + 0.22);
    const g = audioCtx.createGain();
    g.gain.setValueAtTime(0.55, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
    o.connect(g); g.connect(masterGain);
    o.start(t); o.stop(t + 0.3); musicNodes.push(o);
  }
  function makeSnare(t) {
    const buf = audioCtx.createBuffer(1, Math.floor(sr * 0.18), sr);
    const d   = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 1.4);
    const src = audioCtx.createBufferSource(); src.buffer = buf;
    const bp  = audioCtx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 1100; bp.Q.value = 1.2;
    const g   = audioCtx.createGain(); g.gain.value = 0.22;
    src.connect(bp); bp.connect(g); g.connect(masterGain);
    src.start(t); src.stop(t + 0.2); musicNodes.push(src);
  }
  function makeHat(t, open) {
    const buf = audioCtx.createBuffer(1, Math.floor(sr * (open ? 0.12 : 0.05)), sr);
    const d   = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 2.5);
    const src = audioCtx.createBufferSource(); src.buffer = buf;
    const hp  = audioCtx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 7000;
    const g   = audioCtx.createGain(); g.gain.value = open ? 0.07 : 0.05;
    src.connect(hp); hp.connect(g); g.connect(masterGain);
    src.start(t); musicNodes.push(src);
  }

  // Lofi beat pattern: K on 1 & 3, S on 2 & 4, shuffled hats on 8ths
  const hatShuf = [1, 0.8, 1, 0.85, 1, 0.9, 1, 0.8]; // swing feel
  function scheduleBeat(barStart) {
    makeKick(barStart);
    makeKick(barStart + BEAT * 2 + BEAT * 0.05); // slight late kick
    makeSnare(barStart + BEAT);
    makeSnare(barStart + BEAT * 3);
    hatShuf.forEach((_vel, i) => {
      if (Math.random() > 0.12)
        makeHat(barStart + i * BEAT * 0.5, i % 4 === 2);
    });
    setTimeout(() => { if (musicPlaying && audioCtx) scheduleBeat(barStart + BAR); },
      (BAR - 0.15) * 1000);
  }
  scheduleBeat(now + 0.6);

  musicNodes.push(masterGain, comp, warmLP);
}

function stopMusic() {
  if (!audioCtx) return;
  musicNodes.forEach(n => { try { n.stop ? n.stop() : null; } catch(_) {} });
  musicNodes = []; audioCtx.close(); audioCtx = null;
}

btnMusic.addEventListener('click', () => {
  musicPlaying = !musicPlaying;
  if (musicPlaying) {
    buildAmbientMusic();
    musicIcon.textContent  = '♫'; musicLabel.textContent = 'MUSIC ON';
    btnMusic.classList.add('music-on');
  } else {
    stopMusic();
    musicIcon.textContent  = '♪'; musicLabel.textContent = 'MUSIC OFF';
    btnMusic.classList.remove('music-on');
  }
});

document.getElementById('btn-home').addEventListener('click', () => {
  stopMusic();
  controls.unlock();
  location.reload();
});

/* ═══════════════════════════════════════════════════════
   PLAYER MOVEMENT
   ═══════════════════════════════════════════════════════ */
const keys = {};
document.addEventListener('keydown', e => {
  keys[e.code] = true;
  if (e.code === 'Space') e.preventDefault();
});
document.addEventListener('keyup', e => { keys[e.code] = false; });

const SPEED   = 4.5;
const GROUND_Y = 1.4;   // camera eye height at floor level
const GRAVITY  = -22;   // downward acceleration (units/s²)
const JUMP_V   =  8;    // initial upward velocity on jump
const clock    = new THREE.Clock();

let velY = 0; // vertical velocity

function clampPlayer(obj) {
  const x = obj.position.x, z = obj.position.z;
  const M = 0.55; // wall margin

  const inMainHall = (
    x >= -ROOM_W / 2 + M && x <= ROOM_W / 2 - M &&
    z >= -ROOM_D / 2 + M && z <= ROOM_D / 2 - M
  );
  const inWing = (
    x >= ROOM_W / 2 - M && x <= WING_X + WING_W / 2 - M &&
    z >= WING_Z - WING_D / 2 + M && z <= WING_Z + WING_D / 2 - M
  );
  const inMusicRoom = (
    x >= MP3_X - MP3_W / 2 + M && x <= -ROOM_W / 2 + M &&
    z >= MP3_Z - MP3_D / 2 + M && z <= MP3_Z + MP3_D / 2 - M
  );
  // Explicit doorway tunnels — wide tolerance so the player always passes through
  const inRightDoor = (
    x >= ROOM_W / 2 - 1.2 && x <= WING_X + 1.2 &&
    z >= doorZ - DOOR_W / 2 + 0.1 && z <= doorZ + DOOR_W / 2 - 0.1
  );
  const inLeftDoor = (
    x >= -ROOM_W / 2 - 1.2 && x <= -ROOM_W / 2 + 1.2 &&
    z >= doorZ - DOOR_W / 2 + 0.1 && z <= doorZ + DOOR_W / 2 - 0.1
  );

  if (!inMainHall && !inWing && !inMusicRoom && !inRightDoor && !inLeftDoor) {
    obj.position.x = THREE.MathUtils.clamp(x, -ROOM_W / 2 + M, ROOM_W / 2 - M);
    obj.position.z = THREE.MathUtils.clamp(z, -ROOM_D / 2 + M, ROOM_D / 2 - M);
  }
}

function movePlayer(dt) {
  if (!controls.isLocked) return;
  const fwd = new THREE.Vector3(); controls.getDirection(fwd);
  fwd.y = 0; fwd.normalize();
  const right = new THREE.Vector3();
  right.crossVectors(fwd, new THREE.Vector3(0, 1, 0)).normalize();

  const vel = new THREE.Vector3();
  if (keys['KeyW']) vel.addScaledVector(fwd,   SPEED);
  if (keys['KeyS']) vel.addScaledVector(fwd,  -SPEED);
  if (keys['KeyA']) vel.addScaledVector(right, -SPEED);
  if (keys['KeyD']) vel.addScaledVector(right,  SPEED);

  const obj = controls.getObject();
  const onGround = obj.position.y <= GROUND_Y + 0.02;

  // Jump only when standing on the ground
  if (keys['Space'] && onGround) velY = JUMP_V;

  // Apply gravity
  velY += GRAVITY * dt;
  obj.position.y += velY * dt;

  // Land on ground
  if (obj.position.y <= GROUND_Y) {
    obj.position.y = GROUND_Y;
    velY = 0;
  }

  obj.position.addScaledVector(vel, dt);
  clampPlayer(obj);
}

/* ═══════════════════════════════════════════════════════
   RAYCASTING — click to inspect art
   ═══════════════════════════════════════════════════════ */
const raycaster = new THREE.Raycaster();
const center    = new THREE.Vector2(0, 0);

document.addEventListener('click', () => {
  if (!controls.isLocked) return;
  raycaster.setFromCamera(center, camera);
  const hits = raycaster.intersectObjects(artObjects.map(a => a.mesh));
  if (hits.length > 0) {
    const found = artObjects.find(a => a.mesh === hits[0].object);
    if (!found) return;
    if (found.art.isContact) {
      openContactModal();
    } else if (found.art.isApp) {
      openAppModal();
    } else if (found.art.url.startsWith('archetype/cards/')) {
      openTarot(found.art);
    } else {
      openZoom(found.art);
    }
  }
});

/* ═══════════════════════════════════════════════════════
   ZOOM MODAL
   ═══════════════════════════════════════════════════════ */
const zoomModal    = document.getElementById('zoom-modal');
const zoomImg      = document.getElementById('zoom-img');
const zoomTitle    = document.getElementById('zoom-title');
const zoomDesc     = document.getElementById('zoom-desc');
const zoomClose    = document.getElementById('zoom-close');
const zoomBackdrop = document.getElementById('zoom-backdrop');

function openZoom(art) {
  controls.unlock();
  zoomImg.src = art.url;
  zoomTitle.textContent = art.title;
  zoomDesc.textContent  = art.desc;
  zoomModal.classList.remove('hidden');
}

function closeZoom() {
  zoomModal.classList.add('hidden');
  controls.lock();
}

zoomClose.addEventListener('click', closeZoom);
zoomBackdrop.addEventListener('click', closeZoom);

/* ═══════════════════════════════════════════════════════
   APP MODAL (MP3 Room screen)
   ═══════════════════════════════════════════════════════ */
const appModal      = document.getElementById('app-modal');
const appModalClose = document.getElementById('app-modal-close');
const appFrame      = document.getElementById('app-frame');

function openAppModal() {
  controls.unlock();
  appFrame.src = 'mp3 app/index.html';
  appModal.classList.remove('hidden');
  resumePrompt.classList.remove('active'); // keep resume prompt hidden while app is open
}
function closeAppModal() {
  appModal.classList.add('hidden');
  appFrame.src = '';
  // Small delay so the browser registers the button click as a user gesture for re-locking
  setTimeout(() => controls.lock(), 80);
}
appModalClose.addEventListener('click', closeAppModal);

/* ═══════════════════════════════════════════════════════
   CONTACT MODAL
   ═══════════════════════════════════════════════════════ */
const contactModal = document.getElementById('contact-modal');
const contactClose = document.getElementById('contact-close');
const contactForm  = document.getElementById('contact-form');
const contactStatus = document.getElementById('contact-status');

function openContactModal() {
  controls.unlock();
  contactModal.classList.remove('hidden');
  resumePrompt.classList.remove('active');
}
function closeContactModal() {
  contactModal.classList.add('hidden');
  contactForm.reset();
  contactStatus.textContent = '';
  setTimeout(() => controls.lock(), 80);
}
contactClose.addEventListener('click', closeContactModal);

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  const name    = document.getElementById('c-name').value.trim();
  const email   = document.getElementById('c-email').value.trim();
  const message = document.getElementById('c-message').value.trim();
  const subject = encodeURIComponent(`Gallery message from ${name}`);
  const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.open(`mailto:nbaguhin@gmail.com?subject=${subject}&body=${body}`, '_blank');
  contactStatus.textContent = '✓  Opening your email client…';
  contactStatus.style.color = '#a0ffb0';
});

/* ═══════════════════════════════════════════════════════
   TAROT READING MINI-GAME
   ═══════════════════════════════════════════════════════ */
const tarotModal      = document.getElementById('tarot-modal');
const tarotImg        = document.getElementById('tarot-img');
const tarotName       = document.getElementById('tarot-name');
const tarotTagline    = document.getElementById('tarot-tagline');
const tarotRevealZone = document.getElementById('tarot-reveal-zone');
const tarotRevealBtn  = document.getElementById('tarot-reveal-btn');
const tarotReadingZone = document.getElementById('tarot-reading-zone');
const tarotReadingText = document.getElementById('tarot-reading-text');
const tarotAspectsRow  = document.getElementById('tarot-aspects-row');
const tarotReturnBtn  = document.getElementById('tarot-return-btn');

let _tarotTyper = null;

function openTarot(art) {
  controls.unlock();
  const data = ARCHETYPE_READINGS[art.title];
  if (!data) { openZoom(art); return; }

  tarotImg.src       = art.url;
  tarotName.textContent    = art.title;
  tarotTagline.textContent = data.tagline;

  // Reset to pre-reveal state
  tarotRevealZone.style.opacity = '';
  tarotRevealZone.classList.remove('t-hidden');
  tarotRevealBtn.disabled = false;
  tarotReadingZone.classList.add('t-hidden');
  tarotReadingText.textContent = '';
  tarotAspectsRow.innerHTML    = '';
  tarotReturnBtn.classList.add('t-hidden');

  tarotModal._data = data;
  tarotModal.classList.remove('hidden');
}

function closeTarot() {
  tarotModal.classList.add('hidden');
  if (_tarotTyper) { clearInterval(_tarotTyper); _tarotTyper = null; }
  controls.lock();
}

tarotRevealBtn.addEventListener('click', () => {
  const data = tarotModal._data;
  tarotRevealBtn.disabled = true;

  // Fade out the reveal zone, then show reading
  tarotRevealZone.style.opacity = '0';
  setTimeout(() => {
    tarotRevealZone.classList.add('t-hidden');
    tarotRevealZone.style.opacity = '';
    tarotReadingZone.classList.remove('t-hidden');

    // Typewriter effect
    const text = data.reading;
    let i = 0;
    tarotReadingText.textContent = '';
    tarotReadingText.classList.add('typing');

    _tarotTyper = setInterval(() => {
      tarotReadingText.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(_tarotTyper); _tarotTyper = null;
        tarotReadingText.classList.remove('typing');

        // Aspect cards slide in one by one
        data.aspects.forEach((asp, idx) => {
          setTimeout(() => {
            const card = document.createElement('div');
            card.className = 'aspect-card';
            card.innerHTML =
              `<div class="aspect-word">${asp.word}</div>` +
              `<div class="aspect-meaning">${asp.meaning}</div>`;
            tarotAspectsRow.appendChild(card);
          }, idx * 380);
        });

        // Return button appears last
        setTimeout(() => {
          tarotReturnBtn.classList.remove('t-hidden');
        }, data.aspects.length * 380 + 450);
      }
    }, 22);
  }, 380);
});

tarotReturnBtn.addEventListener('click', closeTarot);
const tarotBg = document.getElementById('tarot-bg');
tarotBg.addEventListener('click', closeTarot);

// ESC closes whichever modal is open
document.addEventListener('keydown', e => {
  if (e.code !== 'Escape') return;
  if (!zoomModal.classList.contains('hidden'))  closeZoom();
  else if (!tarotModal.classList.contains('hidden')) closeTarot();
});

/* ═══════════════════════════════════════════════════════
   OVERLAY & HUD
   ═══════════════════════════════════════════════════════ */
const overlay      = document.getElementById('overlay');
const startBtn     = document.getElementById('start-btn');
const crosshair    = document.getElementById('crosshair');
const crosshairDot = document.getElementById('crosshair-dot');
const hud          = document.getElementById('hud');
const resumePrompt = document.getElementById('resume-prompt');

let gameStarted    = false;
let selectedGender = null;

// Gender card selection
document.querySelectorAll('.gender-card').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.gender-card').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedGender = btn.dataset.gender;
    startBtn.disabled = false;
  });
});

startBtn.addEventListener('click', () => {
  if (!selectedGender) return;
  controls.lock();
});

controls.addEventListener('lock', () => {
  if (!gameStarted) {
    gameStarted = true;
    overlay.classList.add('fade-out');
    setTimeout(() => { overlay.style.display = 'none'; }, 900);
    hud.style.display = 'flex';
  }
  crosshair.style.display = crosshairDot.style.display = 'block';
  resumePrompt.classList.remove('active');
  document.body.classList.add('pointer-locked');
});

controls.addEventListener('unlock', () => {
  document.body.classList.remove('pointer-locked');
  crosshair.style.display = crosshairDot.style.display = 'none';
  const noModal = zoomModal.classList.contains('hidden') && tarotModal.classList.contains('hidden');
  if (gameStarted && noModal) resumePrompt.classList.add('active');
});

// Click canvas to re-lock after ESC
canvas.addEventListener('click', () => {
  const noModal = zoomModal.classList.contains('hidden') && tarotModal.classList.contains('hidden');
  if (gameStarted && !controls.isLocked && noModal) controls.lock();
});

/* ═══════════════════════════════════════════════════════
   RESIZE
   ═══════════════════════════════════════════════════════ */
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

/* ═══════════════════════════════════════════════════════
   RENDER LOOP
   ═══════════════════════════════════════════════════════ */
function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.05);
  movePlayer(dt);

  // ── Hologram bob + flicker ───────────────────────────
  const t = Date.now() * 0.001;
  holoGroup.position.y = 1.9 + Math.sin(t * 1.1) * 0.14;
  holoGroup.rotation.y = Math.sin(t * 0.3) * 0.18;
  holoMat.opacity = 0.72 + Math.sin(t * 4.7) * 0.10;
  holoLight.intensity = 1.6 + Math.sin(t * 3.2) * 0.4;
  glowCircle.material.opacity = 0.13 + Math.sin(t * 1.8) * 0.05;

  // ── Archetype portal glass shimmer ───────────────────
  portalMesh.material.opacity = 0.08 + Math.sin(Date.now() * 0.0012) * 0.04;

  // ── Day / Night ──────────────────────────────────────
  const targetFac = isDay ? 1 : 0;
  dnFac += (targetFac - dnFac) * Math.min(dt * 1.5, 1);
  applyLighting(dnFac);

  renderer.render(scene, camera);
}

animate();
