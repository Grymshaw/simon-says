import "normalize.css";
import "../styles/main.scss";
import { Game } from './game.js';
import { Gameboard } from './gameboard.js';

let game = new Game();
let gameboard = new Gameboard(game);

gameboard.init();
