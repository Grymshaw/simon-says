import chai from 'chai';
const should = chai.should();
import { Game } from '../src/js/game.js';

describe('Game', () => {
    let game, result;
    beforeEach(() => {
        game = new Game();
    });
    describe('#extendPattern()', () => {
        it('should return an array', () => {
            result = game.extendPattern();
            result.should.be.an('array');
        });
        it('should keep previous pattern in same order', () => {
            let result1 = game.extendPattern();
            let result2 = game.extendPattern();
            let result3 = game.extendPattern();

            result1[0].should.equal(result2[0]);
            result1[0].should.equal(result3[0]);
            result2[0].should.equal(result3[0]);
            result2[1].should.equal(result3[1]);
        });
        it('should increase pattern length by one', () => {
            let result1 = game.extendPattern().length;
            let result2 = game.extendPattern().length;
            (result1).should.equal(result2 - 1);
        });
    });
});
