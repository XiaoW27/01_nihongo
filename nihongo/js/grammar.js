let grammarList = [];
let current = 0;
let score = 0;
let answered = false;

const sentenceDisplay = document.getElementById('sentenceDisplay');
const optionList = document.getElementById('optionList');
const explainBox = document.getElementById('explainBox');
const nextBtn = document.getElementById('nextBtn');
const progressLabel = document.getElementById('progressLabel');
const progressFill = document.getElementById('progressFill');
const scoreLabel = document.getElementById('scoreLabel');

fetch('data/grammar.json')
  .then(r => r.json())
  .then(data => {
    grammarList = data;
    renderQuestion();
  })
  .catch(() => {
    sentenceDisplay.textContent = '資料載入失敗';
  });

function renderQuestion() {
  answered = false;
  const q = grammarList[current];
  sentenceDisplay.innerHTML = q.sentence.replace('＿＿＿＿', '<span class="blank-fill">　　</span>');

  optionList.innerHTML = '';
  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.addEventListener('click', () => selectOption(idx));
    optionList.appendChild(btn);
  });

  explainBox.classList.remove('show');
  explainBox.innerHTML = '';
  nextBtn.style.display = 'none';

  progressLabel.textContent = `${current + 1} / ${grammarList.length}`;
  progressFill.style.width = `${(current / grammarList.length) * 100}%`;
  scoreLabel.textContent = `正解 ${score}`;
}

function selectOption(idx) {
  if (answered) return;
  answered = true;
  const q = grammarList[current];
  const buttons = optionList.querySelectorAll('.option-btn');

  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) btn.classList.add('correct');
    if (i === idx && idx !== q.correct) btn.classList.add('incorrect');
  });

  if (idx === q.correct) score += 1;
  scoreLabel.textContent = `正解 ${score}`;

  explainBox.innerHTML = q.options.map(opt => `
    <div class="explain-item">
      <span class="term">${opt}</span>${q.explanations[opt] || ''}
    </div>
  `).join('');
  explainBox.classList.add('show');
  nextBtn.style.display = 'inline-flex';
  nextBtn.textContent = current === grammarList.length - 1 ? '結果を見る →' : '下一題 →';
}

nextBtn.addEventListener('click', () => {
  current += 1;
  if (current >= grammarList.length) {
    sentenceDisplay.innerHTML = `お疲れさまでした！全 ${grammarList.length} 問中 ${score} 問正解しました。`;
    optionList.innerHTML = '';
    explainBox.classList.remove('show');
    explainBox.innerHTML = '';
    nextBtn.style.display = 'none';
    progressFill.style.width = '100%';
    return;
  }
  renderQuestion();
});
