import "normalize.css";
import "../styles/main.scss";
import { Game } from './game.js';
import { Gameboard } from './gameboard.js';


const strictElement = document.getElementsByClassName('js-strict-mode')[0];
const resetButton = document.getElementsByClassName('js-reset-button')[0];

let strictMode = strictElement.checked;
strictElement.addEventListener('click', () => {
    strictMode = strictElement.checked;
    //reset game if strict mode changed -- handled through gameboard.js
    resetButton.dispatchEvent(new Event('click'));
});

let game = new Game(strictMode);
let gameboard = new Gameboard(game);

gameboard.init();
