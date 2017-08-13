import $ from 'jquery';

function Gameboard(game) {
    //Variables
    const DELAY_TIME = 500,
        CLICK_TIME = 120;
    this.game = game;
    // this.playerInputs = [];

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
    const tileElements = document.getElementsByClassName('tile');

    // Bind Events
    Array.from(tileElements).forEach((val, i) => {
        val.addEventListener('click', () => {
            this.handleTileClick(i);
        });
    });

    //Functions
    this.init = () => {
        this.game.resetGame();
        this.game.extendPattern();
        this.playPattern();
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
                    console.log('score: ' + game.getScore());
                    //player wins
                    if(game.getScore() === game.getWinningScore()) {
                        game.setIsGameOver(true);
                        console.log('good job -- you win!');
                    } else {
                        //on to next pattern
                        console.log('well done -- next pattern');
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
                console.log('incorrect input -- try again');
                game.clearPlayerInputs();
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
        let pattern = this.game.pattern;
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
        return this.game.pattern.length / this.game.getWinningScore();
    };
}

export { Gameboard };
