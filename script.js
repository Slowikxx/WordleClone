const keys = document.querySelectorAll('.key');
const panes = document.querySelectorAll('.pane');
const enterBtn = document.querySelector('.enter');
const deleteBtn = document.querySelector('.delete');

const words = ['which', 'there', 'their', 'about', 'would', 'these'];
const randomizeWinningWord = () => {
	return words[Math.floor(Math.random() * words.length)];
};

const firstPanesOfARow = [0, 5, 10, 15, 20, 25];

let currentWord = '';
let winningWord = '';
let tries = 0;
let currentPos = 0;

const startGame = () => {
	winningWord = randomizeWinningWord();
	currentWord = '';
	tries = 0;
	currentPos = 0;
	console.log(winningWord);
};

const showChosenLetter = (e) => {
	if (currentWord.length >= 5) return;
	const letter = e.target.innerHTML;
	currentWord += letter;
	panes[currentPos].innerHTML = letter;
	currentPos++;
};

const checkLetterPositions = () => {
	for (let i = 0; i < currentWord.length; i++) {
		if (winningWord[i] === currentWord[i].toLowerCase()) {
			// good letter in good position
			if (tries === 1) {
				flipPane(panes[i]);
				panes[i].classList.add('good');
			} else {
				flipPane(panes[currentPos - 5 + i]);
				panes[currentPos - 5 + i].classList.add('good');
			}
		} else if (winningWord.includes(currentWord[i].toLowerCase())) {
			// good letter in wrong position
			if (tries === 1) {
				flipPane(panes[i]);
				panes[i].classList.add('inWord');
			} else {
				flipPane(panes[currentPos - 5 + i]);
				panes[currentPos - 5 + i].classList.add('inWord');
			}
		} else {
			// letter not in the word
			if (tries === 1) {
				flipPane(panes[i]);
				panes[i].classList.add('notInWord');
			} else {
				flipPane(panes[currentPos - 5 + i]);
				panes[currentPos - 5 + i].classList.add('notInWord');
			}
		}
	}
};

const checkWord = () => {
	if (currentWord.length < 5) return;
	tries++;
	checkLetterPositions();
	if (currentWord.toLowerCase() === winningWord) {
		alert('You won!');
		return;
	}

	currentWord = '';
	if (tries >= 6) {
		alert('You lost!');
		return;
	}
};

const deletePreviousLetter = () => {
	if (firstPanesOfARow.includes(currentPos) && currentWord === '') return;

	currentPos--;
	panes[currentPos].innerHTML = '';
	currentWord = currentWord.slice(0, -1);
};

const flipPane = (pane) => {
	pane.style = 'transform: rotateY(-360deg)';
};

keys.forEach((key) => {
	key.addEventListener('click', showChosenLetter);
});

enterBtn.addEventListener('click', checkWord);
deleteBtn.addEventListener('click', deletePreviousLetter);

startGame();
