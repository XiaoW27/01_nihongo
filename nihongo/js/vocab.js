let vocabList = [];
let current = 0;
let score = 0;
let locked = false;

const wordDisplay = document.getElementById('wordDisplay');
const kanaDisplay = document.getElementById('kanaDisplay');
const meaningDisplay = document.getElementById('meaningDisplay');
const flashcard = document.getElementById('flashcard');
const answerForm = document.getElementById('answerForm');
const answerInput = document.getElementById('answerInput');
const feedbackMsg = document.getElementById('feedbackMsg');
const retryRow = document.getElementById('retryRow');
const nextRow = document.getElementById('nextRow');
const retryBtn = document.getElementById('retryBtn');
const revealBtn = document.getElementById('revealBtn');
const nextBtn = document.getElementById('nextBtn');
const progressLabel = document.getElementById('progressLabel');
const progressFill = document.getElementById('progressFill');
const scoreLabel = document.getElementById('scoreLabel');

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

fetch('data/vocab.json')
  .then(r => r.json())
  .then(data => {
    vocabList = shuffle(data);
    renderCard();
  })
  .catch(() => {
    wordDisplay.textContent = '資料載入失敗';
  });

function renderCard() {
  locked = false;
  const item = vocabList[current];
  flashcard.classList.remove('state-correct', 'state-reveal');
  wordDisplay.textContent = item.word;
  kanaDisplay.style.display = 'none';
  meaningDisplay.style.display = 'none';
  kanaDisplay.textContent = '';
  meaningDisplay.textContent = '';

  answerForm.style.display = 'flex';
  answerInput.value = '';
  answerInput.disabled = false;
  feedbackMsg.textContent = '';
  feedbackMsg.className = 'feedback-msg';
  retryRow.style.display = 'none';
  nextRow.style.display = 'none';

  progressLabel.textContent = `${current + 1} / ${vocabList.length}`;
  progressFill.style.width = `${((current) / vocabList.length) * 100}%`;
  scoreLabel.textContent = `正解 ${score}`;
  setTimeout(() => answerInput.focus(), 50);
}

function normalize(str) {
  return str.trim();
}

function revealAnswer(isCorrect) {
  const item = vocabList[current];
  kanaDisplay.style.display = 'block';
  meaningDisplay.style.display = 'block';
  kanaDisplay.textContent = item.kana;
  meaningDisplay.textContent = item.meaning;
  flashcard.classList.add(isCorrect ? 'state-correct' : 'state-reveal');
  answerForm.style.display = 'none';
  retryRow.style.display = 'none';
  nextRow.style.display = 'flex';
}

answerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (locked) return;
  const item = vocabList[current];
  const userAns = normalize(answerInput.value);
  if (!userAns) return;

  if (userAns === item.kana) {
    locked = true;
    score += 1;
    feedbackMsg.textContent = '正解！';
    feedbackMsg.className = 'feedback-msg right';
    revealAnswer(true);
  } else {
    feedbackMsg.textContent = '不正解。もう一度挑戦しますか？';
    feedbackMsg.className = 'feedback-msg wrong';
    answerInput.disabled = true;
    retryRow.style.display = 'flex';
  }
});

retryBtn.addEventListener('click', () => {
  answerInput.disabled = false;
  answerInput.value = '';
  feedbackMsg.textContent = '';
  feedbackMsg.className = 'feedback-msg';
  retryRow.style.display = 'none';
  answerInput.focus();
});

revealBtn.addEventListener('click', () => {
  locked = true;
  revealAnswer(false);
});

nextBtn.addEventListener('click', () => {
  current += 1;
  if (current >= vocabList.length) {
    vocabList = shuffle(vocabList);
    current = 0;
  }
  renderCard();
});
