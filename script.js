const keys = document.querySelectorAll('.key');
const panes = document.querySelectorAll('.pane');

const words = ['which', 'there', 'their', 'about', 'would', 'these'];
const randomizeWinningWord = () => {
	return words[Marth.floor(Math.random() * words.length)];
};

let currentWord = '';
let winningWord = '';
let tries = 0;
let currentPos = 0;

const startGame = () => {
	winningWord = randomizeWinningWord();
	currentWord = '';
	tries = 0;
	currentPos = 0;
};

const showChosenLetter = (e) => {
	const letter = e.target.innerHTML;
	currentWord += letter;
	panes[currentPos].innerHTML = letter;
	currentPos++;
};

keys.forEach((key) => {
	key.addEventListener('click', showChosenLetter);
});

panes.forEach((pane) => {
	pane.addEventListener('click', (e) => {
		console.log(e.target);
	});
});
