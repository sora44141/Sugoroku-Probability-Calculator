const form = document.querySelector('#probability-form');
const facesInput = document.querySelector('#faces');
const targetInput = document.querySelector('#target');
const errorMessage = document.querySelector('#error-message');
const probabilityOutput = document.querySelector('#probability');
const decimalOutput = document.querySelector('#decimal');
const nearbyList = document.querySelector('#nearby-list');
const resultSection = document.querySelector('.result');
const animationOverlay = document.querySelector('#calculation-animation');
let animationTimer;

function probabilities(faces, lastSquare) {
  const result = new Float64Array(lastSquare + 1);
  result[0] = 1;
  let windowSum = 1;

  for (let square = 1; square <= lastSquare; square += 1) {
    result[square] = windowSum / faces;
    windowSum += result[square];
    if (square - faces >= 0) windowSum -= result[square - faces];
  }
  return result;
}

function formatPercent(value) {
  const digits = value < 0.01 ? 8 : value < 1 ? 5 : 3;
  return `${(value * 100).toLocaleString('ja-JP', { maximumFractionDigits: digits })}%`;
}

function calculate() {
  const faces = Number(facesInput.value);
  const target = Number(targetInput.value);
  if (!Number.isInteger(faces) || faces < 1 || faces > 1000 || !Number.isInteger(target) || target < 0 || target > 100000) {
    errorMessage.textContent = '面数は1〜1,000、マス番号は0〜100,000の整数で入力してください。';
    return false;
  }
  errorMessage.textContent = '';
  const start = Math.max(0, target - 5);
  const values = probabilities(faces, target + 5);
  const probability = values[target];
  document.querySelector('#faces-result').textContent = faces.toLocaleString('ja-JP');
  document.querySelector('#target-result').textContent = target.toLocaleString('ja-JP');
  probabilityOutput.value = formatPercent(probability);
  probabilityOutput.textContent = formatPercent(probability);
  decimalOutput.textContent = `小数表示: ${probability.toLocaleString('ja-JP', { maximumFractionDigits: 12 })}`;
  document.querySelector('#result-note').textContent = target === 0 ? 'スタート地点にいる確率は 100% です。' : '任意の回数振ったときに、このマスへちょうど到達する確率です。';
  nearbyList.replaceChildren(...Array.from({ length: target + 5 - start + 1 }, (_, index) => {
    const square = start + index;
    const row = document.createElement('div');
    row.className = `nearby-row${square === target ? ' current' : ''}`;
    row.innerHTML = `<span>${square.toLocaleString('ja-JP')} マス${square === target ? '（指定）' : ''}</span><span>${formatPercent(values[square])}</span>`;
    return row;
  }));
  return true;
}

function showCalculationAnimation() {
  window.clearTimeout(animationTimer);
  animationOverlay.classList.remove('is-visible');
  void animationOverlay.offsetWidth;
  animationOverlay.classList.add('is-visible');
  animationOverlay.setAttribute('aria-hidden', 'false');
  animationTimer = window.setTimeout(() => {
    animationOverlay.classList.remove('is-visible');
    animationOverlay.setAttribute('aria-hidden', 'true');
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 2000);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (calculate()) showCalculationAnimation();
});
calculate();
