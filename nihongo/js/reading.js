let readingList = [];
let current = 0;
let score = 0;
let answeredCount = 0;
let passageHighlights = [];

const passageTitle = document.getElementById('passageTitle');
const passageText = document.getElementById('passageText');
const questionsWrap = document.getElementById('questionsWrap');
const nextBtn = document.getElementById('nextBtn');
const progressLabel = document.getElementById('progressLabel');
const progressFill = document.getElementById('progressFill');
const scoreLabel = document.getElementById('scoreLabel');
const resultBanner = document.getElementById('resultBanner');
const finalScore = document.getElementById('finalScore');
const restartBtn = document.getElementById('restartBtn');
const passageBox = document.getElementById('passageBox');

fetch('data/reading.json')
  .then(r => r.json())
  .then(data => {
    readingList = data;
    renderPassage();
  })
  .catch(() => {
    passageText.textContent = '資料載入失敗';
  });

function totalQuestions() {
  return readingList.reduce((sum, p) => sum + p.questions.length, 0);
}

function renderPassage() {
  answeredCount = 0;
  passageHighlights = [];
  const p = readingList[current];

  passageTitle.textContent = p.title;
  passageText.innerHTML = p.passage;

  questionsWrap.innerHTML = '';
  p.questions.forEach((q, qIdx) => {
    const block = document.createElement('div');
    block.className = 'question-block';
    block.innerHTML = `
      <h4>問${qIdx + 1}. ${q.question}</h4>
      <div class="option-list" data-qidx="${qIdx}"></div>
      <div class="key-hint" data-hint="${qIdx}"></div>
    `;
    questionsWrap.appendChild(block);

    const list = block.querySelector('.option-list');
    q.options.forEach((opt, oIdx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt;
      btn.addEventListener('click', () => selectAnswer(qIdx, oIdx, btn, list));
      list.appendChild(btn);
    });
  });

  nextBtn.style.display = 'none';
  progressLabel.textContent = `第 ${current + 1} 篇 / ${readingList.length}`;
  progressFill.style.width = `${(current / readingList.length) * 100}%`;
  scoreLabel.textContent = `正解 ${score} / ${totalQuestions()}`;
  window.scrollTo({ top: passageBox.offsetTop - 20, behavior: 'smooth' });
}

function selectAnswer(qIdx, oIdx, clickedBtn, listEl) {
  const p = readingList[current];
  const q = p.questions[qIdx];
  const buttons = listEl.querySelectorAll('.option-btn');
  if (buttons[0].disabled) return;

  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) btn.classList.add('correct');
    if (i === oIdx && oIdx !== q.correct) btn.classList.add('incorrect');
  });

  const hintEl = document.querySelector(`[data-hint="${qIdx}"]`);

  if (oIdx === q.correct) {
    score += 1;
  } else {
    passageHighlights.push(q.keyPhrase);
    updatePassageHighlight();
    hintEl.innerHTML = `文章中的關鍵句：「${q.keyPhrase}」`;
    hintEl.classList.add('show');
  }

  scoreLabel.textContent = `正解 ${score} / ${totalQuestions()}`;
  answeredCount += 1;

  if (answeredCount === p.questions.length) {
    nextBtn.style.display = 'inline-flex';
    nextBtn.textContent = current === readingList.length - 1 ? '結果を見る →' : '下一篇 →';
  }
}

function updatePassageHighlight() {
  const p = readingList[current];
  let html = p.passage;
  passageHighlights.forEach(phrase => {
    html = html.split(phrase).join(`<mark>${phrase}</mark>`);
  });
  passageText.innerHTML = html;
}

nextBtn.addEventListener('click', () => {
  current += 1;
  if (current >= readingList.length) {
    passageBox.style.display = 'none';
    questionsWrap.innerHTML = '';
    nextBtn.style.display = 'none';
    progressFill.style.width = '100%';
    resultBanner.style.display = 'block';
    finalScore.textContent = `${score} / ${totalQuestions()}`;
    return;
  }
  renderPassage();
});

restartBtn.addEventListener('click', () => {
  current = 0;
  score = 0;
  passageBox.style.display = 'block';
  resultBanner.style.display = 'none';
  renderPassage();
});
