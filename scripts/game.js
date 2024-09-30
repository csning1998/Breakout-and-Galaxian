
function getDifficultyFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.has('difficulty') || "Easy";
}

function initializaGame(){
    const canvasContainer = document.getElementById('game-canvas');
    const difficulyLevel = document.getElementById('difficuly-level');
    difficulyLevel.textContent = getDifficultyFromURL();

    const canvas = document.getElementById('game-canvas');
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    canvas.style.border = '2px solid #BB86FC';
    canvas.style.backgroundColor = '#1E1E1E';
    canvasContainer.innerHTML = '';
    canvasContainer.appendChild(canvas);
}

