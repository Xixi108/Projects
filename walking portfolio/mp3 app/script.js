const audio         = document.getElementById('audio');
const fileInput     = document.getElementById('fileInput');
const albumCoverWrap = document.getElementById('albumCoverWrap');
const btnPlay       = document.getElementById('btnPlay');
const btnPrev       = document.getElementById('btnPrev');
const btnNext       = document.getElementById('btnNext');
const progressBar   = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl    = document.getElementById('duration');
const songTitleEl   = document.getElementById('songTitle');
const player        = document.getElementById('player');
const animeGirlEl   = document.querySelector('.anime-girl');

const defaultTracks = [
  { url: 'music/Avril%20Lavigne%20-%20Take%20Me%20Away.mp3',                                       name: 'Take Me Away' },
  { url: 'music/Avril%20Lavigne%20-%20My%20Happy%20Ending%20(Official%20Video%20-%20Clean).mp3',   name: 'My Happy Ending' },
  { url: "music/Avril%20Lavigne%20-%20Don%20t%20Tell%20Me%20(Official%20Video).mp3",               name: "Don't Tell Me" },
];

let playlist     = [...defaultTracks];
let currentIndex = 0;
const animeGirls = [
  'assets/anime girl 1.png',
  'assets/anime girl 2.png',
  'assets/anime girl 3.png'
];
let animeGirlIndex = 1;

// ---- File loading ----

albumCoverWrap.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', () => {
  const files = [...fileInput.files].filter(f => f.type.startsWith('audio/'));
  if (files.length) loadFiles(files);
  fileInput.value = '';
});

// Drag and drop
player.addEventListener('dragover', e => {
  e.preventDefault();
  player.classList.add('drag-over');
});

player.addEventListener('dragleave', () => {
  player.classList.remove('drag-over');
});

player.addEventListener('drop', e => {
  e.preventDefault();
  player.classList.remove('drag-over');
  const files = [...e.dataTransfer.files].filter(f => f.type.startsWith('audio/'));
  if (files.length) loadFiles(files);
});

function loadFiles(files) {
  // Free old object URLs (skip default tracks which aren't blob URLs)
  playlist.forEach(t => { if (t.url.startsWith('blob:')) URL.revokeObjectURL(t.url); });

  playlist = files.map(f => ({
    url:  URL.createObjectURL(f),
    name: f.name.replace(/\.[^.]+$/, '').replace(/_/g, ' ')
  }));

  currentIndex = 0;
  loadTrack(0, true);
}

function loadTrack(index, autoPlay = false) {
  if (!playlist.length) return;
  const track = playlist[index];
  audio.src = track.url;
  audio.load();
  updateTitle(track.name);
  resetProgress();

  if (autoPlay) {
    audio.play().catch(err => {
      console.warn('Play blocked:', err);
    });
  }
}

audio.addEventListener('error', () => {
  const codes = ['', 'ABORTED', 'NETWORK', 'DECODE', 'SRC_NOT_SUPPORTED'];
  const code = audio.error ? audio.error.code : 0;
  console.error('Audio error:', codes[code] || code, audio.src);
  updateTitle('⚠ Cannot load — click album to upload MP3');
});

// ---- Play / Pause ----

btnPlay.addEventListener('click', () => {
  if (!playlist.length) {
    fileInput.click();
    return;
  }
  if (audio.paused) {
    audio.play().catch(err => console.warn('Play blocked:', err));
  } else {
    audio.pause();
  }
});

audio.addEventListener('play',  () => btnPlay.classList.add('playing'));
audio.addEventListener('pause', () => btnPlay.classList.remove('playing'));

// ---- Prev / Next ----

btnPrev.addEventListener('click', () => {
  if (!playlist.length) return;
  if (audio.currentTime > 3) {
    audio.currentTime = 0;
  } else {
    currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentIndex, !audio.paused);
  }
});

btnNext.addEventListener('click', () => {
  if (!playlist.length) return;
  currentIndex = (currentIndex + 1) % playlist.length;
  loadTrack(currentIndex, !audio.paused);
  setNextAnimeGirl();
});

audio.addEventListener('ended', () => {
  currentIndex = (currentIndex + 1) % playlist.length;
  loadTrack(currentIndex, true);
});

// ---- Progress bar ----

audio.addEventListener('timeupdate', () => {
  if (!audio.duration) return;
  progressBar.value = (audio.currentTime / audio.duration) * 100;
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

audio.addEventListener('loadedmetadata', () => {
  durationEl.textContent = formatTime(audio.duration);
});

progressBar.addEventListener('input', () => {
  if (audio.duration) {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
  }
});

// ---- Keyboard shortcuts ----

document.addEventListener('keydown', e => {
  if (e.target.tagName === 'INPUT') return;
  switch (e.code) {
    case 'Space':
      e.preventDefault();
      btnPlay.click();
      break;
    case 'ArrowRight':
      btnNext.click();
      break;
    case 'ArrowLeft':
      btnPrev.click();
      break;
  }
});

// ---- Helpers ----

function resetProgress() {
  progressBar.value = 0;
  currentTimeEl.textContent = '0:00';
  durationEl.textContent = '0:00';
}

function updateTitle(name) {
  songTitleEl.textContent = name;
  // Marquee for long titles
  const wrap = songTitleEl.parentElement;
  songTitleEl.classList.toggle('marquee', songTitleEl.scrollWidth > wrap.clientWidth);
}

function formatTime(secs) {
  const m = Math.floor(secs / 60);
  const s = String(Math.floor(secs % 60)).padStart(2, '0');
  return `${m}:${s}`;
}

function setNextAnimeGirl() {
  if (!animeGirlEl || !animeGirls.length) return;
  animeGirlIndex = (animeGirlIndex + 1) % animeGirls.length;
  animeGirlEl.src = animeGirls[animeGirlIndex];
}

// Load the first default track on startup
loadTrack(0);
