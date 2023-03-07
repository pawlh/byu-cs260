// Set player name from local storage or prompt
document.getElementById('player-name').textContent = localStorage.getItem('name');

const greenButton = document.getElementById('green-button')
const redButton = document.getElementById('red-button')
const blueButton = document.getElementById('blue-button')
const yellowButton = document.getElementById('yellow-button')

class Button {
    constructor(soundFile, hue, el) {
        this.el = el;
        this.hue = hue;
        this.sound = loadSound(soundFile);
        this.paint(100);

        el.addEventListener('click', () => {
            game.pressButton(el);
        })
    }

    paint(level) {
        this.el.querySelector('svg').style.filter = `brightness(${level}%)`;
    }

    async press(volume) {
        this.paint(100 + this.hue);
        await this.play(volume);
        this.paint(100);
    }

    // Work around Safari's rule to only play sounds if given permission.
    async play(volume = 1.0) {
        this.sound.volume = volume;
        await new Promise((resolve) => {
            this.sound.onended = resolve;
            this.sound.play();
        });
    }
}

class Game {
    buttons;
    allowPlayer;
    sequence;
    playerPlaybackPos;
    mistakeSound;

    constructor() {
        this.buttons = new Map();
        this.allowPlayer = false;
        this.sequence = [];
        this.playerPlaybackPos = 0;
        this.mistakeSound = loadSound('error.mp3');

        const greenButton = document.getElementById('green-button')
        const redButton = document.getElementById('red-button')
        const blueButton = document.getElementById('blue-button')
        const yellowButton = document.getElementById('yellow-button')

        this.buttons.set(greenButton.id, new Button('sound1.mp3', 50, greenButton));
        this.buttons.set(redButton.id, new Button('sound2.mp3', 50, redButton));
        this.buttons.set(blueButton.id, new Button('sound3.mp3', 75, blueButton));
        this.buttons.set(yellowButton.id, new Button('sound4.mp3', 100, yellowButton));

        const resetButton = document.getElementById('reset-button');
        resetButton.addEventListener('click', () => {
            resetButton.textContent = 'Reset'
            this.reset()
        })
    }

    async pressButton(button) {
        if (this.allowPlayer) {
            this.allowPlayer = false;
            await this.buttons.get(button.id).press(1.0);

            if (this.sequence[this.playerPlaybackPos].el.id === button.id) {
                this.playerPlaybackPos++;
                if (this.playerPlaybackPos === this.sequence.length) {
                    this.playerPlaybackPos = 0;
                    this.addButton();
                    this.updateScore(this.sequence.length - 1);
                    await this.playSequence();
                }
                this.allowPlayer = true;
            } else {
                document.querySelector('#reset-button').textContent = 'Play again'
                this.saveScore(this.sequence.length - 1);
                this.mistakeSound.play();
                await this.buttonDance(2);
            }
        }
    }

    async reset() {
        this.allowPlayer = false;
        this.playerPlaybackPos = 0;
        this.sequence = [];
        this.updateScore('--');
        await this.buttonDance(1);
        this.addButton();
        await this.playSequence();
        this.allowPlayer = true;
    }

    getPlayerName() {
        return localStorage.getItem('name') ?? 'Mystery player';
    }

    async playSequence() {
        await delay(500);
        for (const btn of this.sequence) {
            await btn.press(1.0);
            await delay(100);
        }
    }

    addButton() {
        const btn = this.getRandomButton();
        this.sequence.push(btn);
    }

    updateScore(score) {
        const scoreEl = document.querySelector('#score');
        scoreEl.textContent = score;
    }

    async buttonDance(laps = 1) {
        for (let step = 0; step < laps; step++) {
            for (const btn of this.buttons.values()) {
                await btn.press(0.0);
            }
        }
    }

    getRandomButton() {
        let buttons = Array.from(this.buttons.values());
        return buttons[Math.floor(Math.random() * this.buttons.size)];
    }

    saveScore(score) {
        const userName = this.getPlayerName();
        let scores = [];
        const scoresText = localStorage.getItem('scores');
        if (scoresText) {
            scores = JSON.parse(scoresText);
        }
        scores = this.updateScores(userName, score, scores);

        localStorage.setItem('scores', JSON.stringify(scores));
    }

    updateScores(userName, score, scores) {
        const date = new Date().toLocaleDateString();
        const newScore = { name: userName, score: score, date: date };

        let found = false;
        for (const [i, prevScore] of scores.entries()) {
            if (score > prevScore.score) {
                scores.splice(i, 0, newScore);
                found = true;
                break;
            }
        }

        if (!found) {
            scores.push(newScore);
        }

        if (scores.length > 10) {
            scores.length = 10;
        }

        return scores;
    }
}

const game = new Game();

function delay(milliseconds) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, milliseconds);
    });
}

function loadSound(filename) {
    return new Audio('assets/' + filename);
}