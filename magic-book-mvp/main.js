const CHARACTER_TEMPLATES = {
  fox: { id: 'fox', name: 'Лисёнок', emoji: '🦊', color: '#ff9f43' },
  bunny: { id: 'bunny', name: 'Зайчонок', emoji: '🐰', color: '#b9a7ff' },
  owl: { id: 'owl', name: 'Совёнок', emoji: '🦉', color: '#8fd0ff' }
};

const COLORS = ['#ff4f81', '#ff8a00', '#ffdf00', '#56c271', '#31b6ff', '#7a4cff', '#000000', '#ffffff'];

const state = {
  selectedCharacterId: null,
  brushColor: COLORS[0],
  tool: 'brush',
  undoSnapshot: null,
  drawingDataUrl: null,
  starsTotal: 6,
  starsCollected: 0
};

const screens = [...document.querySelectorAll('.screen')];
const storyText = document.getElementById('storyText');
const parentsDialog = document.getElementById('parentsDialog');
const charactersRoot = document.getElementById('characters');
const templateCanvas = document.getElementById('templateCanvas');
const drawCanvas = document.getElementById('drawCanvas');
const templateCtx = templateCanvas.getContext('2d');
const drawCtx = drawCanvas.getContext('2d');
const colorPalette = document.getElementById('colorPalette');
const revivePreview = document.getElementById('revivePreview');
const glow = document.getElementById('glow');
const miniGameField = document.getElementById('miniGameField');
const starProgress = document.getElementById('starProgress');
const miniGameResult = document.getElementById('miniGameResult');
const libraryGrid = document.getElementById('libraryGrid');
const replayPanel = document.getElementById('replayPanel');
const replayImage = document.getElementById('replayImage');

function navigate(screenId) {
  screens.forEach((screen) => {
    screen.classList.toggle('screen--active', screen.id === screenId);
  });

  if (screenId === 'library') {
    renderLibrary();
  }

  if (screenId === 'characterSelect') {
    storyText.textContent = 'Выбери героя для новой истории';
  }
}

function createCharacterCards() {
  const cards = Object.values(CHARACTER_TEMPLATES).map((character) => {
    const button = document.createElement('button');
    button.className = 'character-card';
    button.innerHTML = `<div style="font-size:40px">${character.emoji}</div><strong>${character.name}</strong>`;
    button.addEventListener('click', () => {
      state.selectedCharacterId = character.id;
      drawTemplate(character);
      storyText.textContent = `${character.name} ждёт, пока ты его оживишь!`;
      navigate('drawing');
    });
    return button;
  });

  charactersRoot.replaceChildren(...cards);
}

function drawTemplate(character) {
  templateCtx.clearRect(0, 0, templateCanvas.width, templateCanvas.height);

  templateCtx.fillStyle = '#f6f2ff';
  templateCtx.fillRect(0, 0, templateCanvas.width, templateCanvas.height);

  templateCtx.fillStyle = character.color;
  templateCtx.beginPath();
  templateCtx.arc(210, 210, 140, 0, Math.PI * 2);
  templateCtx.fill();

  templateCtx.fillStyle = '#ffffff';
  templateCtx.font = '110px serif';
  templateCtx.textAlign = 'center';
  templateCtx.textBaseline = 'middle';
  templateCtx.fillText(character.emoji, 210, 210);

  clearDrawing();
}

function setupPalette() {
  const dots = COLORS.map((color, index) => {
    const dot = document.createElement('button');
    dot.className = `color-dot ${index === 0 ? 'active' : ''}`;
    dot.style.background = color;
    dot.addEventListener('click', () => {
      state.brushColor = color;
      state.tool = 'brush';
      highlightActiveColor(dot);
    });
    return dot;
  });

  colorPalette.replaceChildren(...dots);
}

function highlightActiveColor(activeDot) {
  document.querySelectorAll('.color-dot').forEach((dot) => dot.classList.remove('active'));
  activeDot.classList.add('active');
}

function setupDrawing() {
  let drawing = false;

  drawCanvas.addEventListener('pointerdown', (event) => {
    drawing = true;
    state.undoSnapshot = drawCanvas.toDataURL('image/png');
    draw(event);
  });

  drawCanvas.addEventListener('pointermove', (event) => {
    if (!drawing) return;
    draw(event);
  });

  drawCanvas.addEventListener('pointerup', () => {
    drawing = false;
    drawCtx.beginPath();
  });

  drawCanvas.addEventListener('pointerleave', () => {
    drawing = false;
    drawCtx.beginPath();
  });
}

function draw(event) {
  const rect = drawCanvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const dist = Math.sqrt((x - 210) ** 2 + (y - 210) ** 2);
  if (dist > 140) return;

  drawCtx.lineWidth = 8;
  drawCtx.lineCap = 'round';
  drawCtx.strokeStyle = state.tool === 'eraser' ? '#ffffff' : state.brushColor;
  drawCtx.lineTo(x, y);
  drawCtx.stroke();
  drawCtx.beginPath();
  drawCtx.moveTo(x, y);
}

function clearDrawing() {
  drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
  state.undoSnapshot = null;
}

function restoreUndo() {
  if (!state.undoSnapshot) return;
  const snapshot = new Image();
  snapshot.onload = () => {
    drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
    drawCtx.drawImage(snapshot, 0, 0);
  };
  snapshot.src = state.undoSnapshot;
  state.undoSnapshot = null;
}

function buildCombinedDrawing() {
  const output = document.createElement('canvas');
  output.width = 420;
  output.height = 420;
  const outCtx = output.getContext('2d');
  outCtx.drawImage(templateCanvas, 0, 0);
  outCtx.drawImage(drawCanvas, 0, 0);
  return output.toDataURL('image/png');
}

function playRevive() {
  state.drawingDataUrl = buildCombinedDrawing();
  revivePreview.src = state.drawingDataUrl;
  navigate('revive');
  glow.classList.remove('active');
  requestAnimationFrame(() => {
    glow.classList.add('active');
  });
}

function startMiniGame() {
  navigate('miniGame');
  miniGameField.innerHTML = '';
  miniGameResult.classList.add('hidden');
  state.starsCollected = 0;
  starProgress.textContent = `Собрано: 0/${state.starsTotal}`;

  for (let i = 0; i < state.starsTotal; i += 1) {
    const star = document.createElement('button');
    star.className = 'star';
    star.textContent = '⭐';
    star.style.left = `${Math.floor(Math.random() * 88)}%`;
    star.style.top = `${Math.floor(Math.random() * 82)}%`;
    star.addEventListener('click', () => collectStar(star));
    miniGameField.appendChild(star);
  }

  setTimeout(() => {
    [...miniGameField.children].forEach((star) => star.classList.add('hint'));
  }, 4000);
}

function collectStar(starElement) {
  if (!starElement.parentNode) return;
  starElement.remove();
  state.starsCollected += 1;
  starProgress.textContent = `Собрано: ${state.starsCollected}/${state.starsTotal}`;

  if (state.starsCollected >= state.starsTotal) {
    miniGameResult.classList.remove('hidden');
  }
}

function saveStory() {
  const id = `story_${Date.now()}`;
  const library = getLibrary();
  const entry = {
    storyId: id,
    characterId: state.selectedCharacterId,
    characterName: CHARACTER_TEMPLATES[state.selectedCharacterId].name,
    drawingDataUrl: state.drawingDataUrl,
    completed: true,
    createdAt: new Date().toISOString()
  };
  library.unshift(entry);
  localStorage.setItem('magicBookStories', JSON.stringify(library));
  storyText.textContent = 'История добавлена на полку!';
  navigate('library');
}

function getLibrary() {
  try {
    return JSON.parse(localStorage.getItem('magicBookStories')) || [];
  } catch (error) {
    return [];
  }
}

function renderLibrary() {
  const stories = getLibrary();
  replayPanel.classList.add('hidden');

  if (!stories.length) {
    libraryGrid.innerHTML = '<p>Пока пусто. Создай первую историю ✨</p>';
    return;
  }

  const cards = stories.map((story) => {
    const card = document.createElement('article');
    card.className = 'story-card';
    const date = new Date(story.createdAt).toLocaleString('ru-RU');
    card.innerHTML = `
      <img src="${story.drawingDataUrl}" alt="${story.characterName}" />
      <p><strong>${story.characterName}</strong></p>
      <p>${date}</p>
      <button class="btn btn--small">Открыть</button>
    `;

    card.querySelector('button').addEventListener('click', () => {
      replayImage.src = story.drawingDataUrl;
      replayPanel.classList.remove('hidden');
      storyText.textContent = `Реплей: ${story.characterName}`;
    });

    return card;
  });

  libraryGrid.replaceChildren(...cards);
}

function bindUI() {
  document.querySelectorAll('[data-nav]').forEach((button) => {
    button.addEventListener('click', () => navigate(button.dataset.nav));
  });

  document.getElementById('parentsBtn').addEventListener('click', () => parentsDialog.showModal());
  document.getElementById('closeParentsDialog').addEventListener('click', () => parentsDialog.close());
  document.getElementById('brushTool').addEventListener('click', () => (state.tool = 'brush'));
  document.getElementById('eraserTool').addEventListener('click', () => (state.tool = 'eraser'));
  document.getElementById('undoBtn').addEventListener('click', restoreUndo);
  document.getElementById('clearBtn').addEventListener('click', clearDrawing);
  document.getElementById('reviveBtn').addEventListener('click', playRevive);
  document.getElementById('toMinigameBtn').addEventListener('click', startMiniGame);
  document.getElementById('saveStoryBtn').addEventListener('click', saveStory);
}

function init() {
  createCharacterCards();
  setupPalette();
  setupDrawing();
  bindUI();
}

init();
