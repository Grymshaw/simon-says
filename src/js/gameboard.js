function Gameboard(gameInstance) {
    //Variables
    const DELAY_TIME = 500,
        CLICK_TIME = 120;
    let game = gameInstance;
    let strictMode = game.isStrictMode();

    let isPatternPlaying = true;
    let previousAudio;
    this.sounds = [
        'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',
        'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3',
        'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3',
        'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'
    ];
    this.audio = [
        (new Audio(this.sounds[0])),
        (new Audio(this.sounds[1])),
        (new Audio(this.sounds[2])),
        (new Audio(this.sounds[3]))
    ];

    // Cache DOM
    const tileElements = document.getElementsByClassName('js-tile');
    const resetButton = document.getElementsByClassName('js-reset-button')[0];
    const strictModeButton = document.getElementsByClassName('js-strict-mode')[0];
    const scoreElement = document.getElementsByClassName('js-score')[0];
    const gameMessage = document.getElementsByClassName('js-game-message')[0];

    // Bind Events
    Array.from(tileElements).forEach((val, i) => {
        val.addEventListener('click', () => {
            this.handleTileClick(i);
        });
    });
    resetButton.addEventListener('click', () => {
        this.showMessage('Game reset<br/><br/>');
        //make button 'press'
        resetButton.classList.add('on');
        setTimeout(() => {
            resetButton.classList.remove('on');
        }, 100);
        //check strict mode
        strictMode = strictModeButton.classList.contains('on');
        //restart game after short delay
        setTimeout(() => {
            this.init();
        }, DELAY_TIME);
    });
    strictModeButton.addEventListener('click', () => {
        strictModeButton.classList.toggle('on');
        strictMode = strictModeButton.classList.contains('on');
        this.showMessage('Strict mode ' + (strictMode ? 'enabled' : 'disabled') + '<br/><br/>');
    });

    //Functions
    this.init = () => {
        game.resetGame(strictMode);
        scoreElement.innerHTML = game.getScore();
        game.extendPattern();
        this.playPattern();
    };
    this.showMessage = (msg) => {
        gameMessage.innerHTML = msg;
        setTimeout(() => {
            gameMessage.innerHTML = '<br/><br/>';
        }, 1000);
    };
    this.handleTileClick = (i) => {
        //wait until pattern is done playing
        if(!isPatternPlaying && !game.isGameOver()) {
            this.playTile(i);
            let correct = game.checkInput(i);
            //input is correct
            if(correct) {
                if(game.playerInputs.length === game.pattern.length) {
                    game.incrementScore();
                    scoreElement.innerHTML = game.getScore();
                    //player wins
                    if(game.getScore() === game.getWinningScore()) {
                        game.setIsGameOver(true);
                        gameMessage.innerHTML = 'Congrats, you win!<br/>Click reset to play again';
                    } else {
                        //on to next pattern
                        this.showMessage('Well done!<br/>Next pattern...');
                        isPatternPlaying = true;
                        game.clearPlayerInputs();
                        game.extendPattern();
                        setTimeout(() => {
                            this.playPattern();
                        }, 2 * DELAY_TIME);
                    }
                }
            } else {
                //incorrect input
                if(strictMode) {
                    this.showMessage('Incorrect input!<br/>Start from scratch');
                    setTimeout(() => {
                        this.init();
                    }, 2 * DELAY_TIME);
                } else {
                    this.showMessage('Incorrect input!<br/>Try again');
                    game.clearPlayerInputs();
                }
            }
        }
    };
    this.playTile = (tileIndex) => {
        const currentTile = tileElements[tileIndex];
        //light up tile
        currentTile.classList.add('hover');
        setTimeout(() => {
            currentTile.classList.remove('hover');
        }, CLICK_TIME);
        //clear previous audio and play current
        if(previousAudio) {
            previousAudio.pause();
            previousAudio.currentTime = 0;
        }
        previousAudio = this.audio[tileIndex];
        previousAudio.play();

    };
    this.playPattern = () => {
        let pattern = game.pattern;
        // let difficulty = 1 - this.calculateDifficulty();
        // let delayTime = DELAY_TIME + difficulty * DELAY_TIME;
        let delayTime = DELAY_TIME;
        //play each tile in order of pattern
        let timeouts = pattern.map((cur, i) => {
            setTimeout(() => {
                this.playTile(cur);
            }, delayTime * i);
        });
        //prevent inputs until pattern finshes playing
        setTimeout(() => {
            isPatternPlaying = false;
        }, delayTime * pattern.length);
    };
    this.calculateDifficulty = () => {
        return game.pattern.length / game.getWinningScore();
    };
}

export { Gameboard };
