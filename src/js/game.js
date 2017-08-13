function Game(strictMode = false) {
    //Variables
    const NUMBER_OF_TILES = 4;
    const WINNING_SCORE = 5;
    let isGameOver = false;
    this.pattern = [];
    this.playerInputs = [];
    this.score = 0;
    this.strictMode = strictMode;
    //Methods
    this.checkInput = (input) => {
        if (this.pattern[this.playerInputs.length] === input) {
            this.playerInputs.push(input);
            return true;
        } else {
            if(this.strictMode) {
                isGameOver = true;
            }
            return false;
        }
    };
    this.isGameOver = () => {
        return isGameOver;
    };
    this.setIsGameOver = (gameOver) => {
        isGameOver = gameOver;
    };
    this.clearPlayerInputs = () => {
        this.playerInputs = [];
    };
    this.extendPattern = () => {
        console.log(this.pattern);
        this.pattern.push(this.randomInput());
        console.log(this.pattern);
        return this.pattern;
    };
    this.randomInput = () => {
        return Math.floor(Math.random() * NUMBER_OF_TILES);
    };
    this.incrementScore = () => {
        this.score += 1;
    };
    this.getScore = () => {
        return this.score;
    };
    this.getWinningScore = () => {
        return WINNING_SCORE;
    };
    this.resetGame = (strictMode) => {
        this.pattern = [];
        this.playerInputs = [];
        isGameOver = false;
        this.score = 0;
        this.strictMode = strictMode;
    };
}

export { Game };
