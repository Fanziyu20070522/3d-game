const gameState = {
  disksCount: 5,
  pegs: [[5,4,3,2,1], [], []],
  moves: 0,
  isAutoSolving: false,
  selectedPeg: null
};
function isValidMove(from, to) {
  const topFrom = gameState.pegs[from].at(-1);
  const topTo = gameState.pegs[to].at(-1);
  return !topTo || topFrom < topTo;
}

function moveDisk(from, to) {
  if (!isValidMove(from, to)) {
    showWarning();
    return;
  }

  const disk = gameState.pegs[from].pop(); // ✅ 数组核心
  gameState.pegs[to].push(disk);

  gameState.moves++;
  updateUI();
}
function autoSolve(n, from, to, aux) {
  if (n === 0) return;

  autoSolve(n - 1, from, aux, to);

  setTimeout(() => {
    moveDisk(from, to);
    autoSolve(n - 1, aux, to, from);
  }, 600);
}
document.querySelectorAll('.peg').forEach((peg, index) => {
  peg.addEventListener('click', () => handlePegClick(index));
});