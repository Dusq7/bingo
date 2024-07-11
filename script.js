const arrayWords = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", 
];

const game = document.getElementById("game");
const fireworks = document.getElementById('fireworks');
const winMusic = document.getElementById('music');
let musicTimeout;

arrayWords.forEach((item) => {
    game.append(returnButtonWithText(item));
});

function returnButtonWithText(text) {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener('click', () => {
        button.classList.add('active');
        checkAllButtonsClicked();
    });
    return button;
}

function checkAllButtonsClicked() {
    const buttons = game.querySelectorAll('button');
    const allClicked = Array.from(buttons).every(button => button.classList.contains('active'));
    if (allClicked) {
        fireworks.style.display = 'block';
        playWinMusic();
    }
}

const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => {
    const buttons = game.querySelectorAll('button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    fireworks.style.display = 'none';
    stopWinMusic();
});

function playWinMusic() {
    if (fireworks.style.display === 'block') {
        winMusic.play();
        musicTimeout = setTimeout(stopWinMusic, 4500);
    }
}

function stopWinMusic() {
    winMusic.pause();
    winMusic.currentTime = 0;
    clearTimeout(musicTimeout);
}

document.getElementById('load').addEventListener('click',function(){
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(event) {
            try {
                const jsonContent = JSON.parse(event.target.result);
                game.innerHTML = '';
                jsonContent.forEach(item => {
                game.append(returnButtonWithText(item));
                });
            } catch (error) {
                document.getElementById('game').textContent = 'Niewłaściwy format pliku!';
            }
        };

        reader.readAsText(file);
    } else {
        alert('Nie wybrano pliku!');
    }

})