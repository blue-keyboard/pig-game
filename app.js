/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

// * setter
// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML =   '<em>' + dice + '</em>';

// * getter
// let x = document.querySelector('#score-1').textContent;
// console.log(x)

// * get element by its id
// document.getElementById('name-' + activePlayer).textContent = 'WINNER!';

// * Syntax to change CSS properties
// document.querySelector('.dice').style.display = 'none';

let scores, roundScore, activePlayer, gamePlaying, lastDice, gameMode, maxScore;

maxScore = 100;
gameMode = 1;

init();

document.getElementById('btn-roll').addEventListener('click', function() {
    
    if(gamePlaying && gameMode === 1) {

        let dice = Math.floor(Math.random() * 6) + 1;

        document.querySelector('.dice').style.display = 'block';
        document.querySelector('.dice1').src = 'dice-' + dice + '.png';

        if (dice === 6 && lastDice === 6) {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();

        } else if (dice !== 1) {
            lastDice = dice;
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        
        } else {
            document.querySelector('.dice').style.display = 'none';
            nextPlayer();
        }

    } else if (gamePlaying && gameMode === 2) {

        let dice1 = Math.floor(Math.random() * 6) + 1;
        let dice2 = Math.floor(Math.random() * 6) + 1;

        document.querySelector('.dice').style.display = 'block';
        document.querySelector('.dice1').src = 'dice-' + dice1 + '.png';
        document.querySelector('.dice2').src = 'dice-' + dice2 + '.png';

        if (dice1 !== 1 && dice2 !== 2) {
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
            document.querySelector('.dice').style.display = 'none';
        }
    }
});

document.getElementById('btn-hold').addEventListener('click', function() {

    if (gamePlaying) {
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        document.querySelector('.dice').style.display = 'none';
    
        if (scores[activePlayer] >= maxScore) {
            document.getElementById('current-0').textContent = '0';
            document.getElementById('current-1').textContent = '0';
            document.getElementById('name-' + activePlayer).textContent = 'WINNER!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

document.getElementById('btn-new').addEventListener('click', function () {
    document.getElementById('settings').style.display = 'flex';
});

document.querySelector('.btn-sett').addEventListener('click', function () {

    maxScore = parseInt(document.getElementById('max-score').value);
    gameMode = parseInt(document.getElementById('dices').value);
    console.log(maxScore)
    console.log(gameMode)

    if ((maxScore < 1) || (gameMode !== 1 && gameMode !== 2)) {
        if (maxScore < 1) {
            document.getElementById('max-score').classList.add('input-color')
        } else {
            document.getElementById('max-score').classList.remove('input-color')
        }
        if (gameMode !== 1 && gameMode !== 2) {
            document.getElementById('dices').classList.add('input-color')
        } else {
            document.getElementById('dices').classList.remove('input-color')
        }
    } else {
        document.getElementById('max-score').classList.remove('input-color')
        document.getElementById('dices').classList.remove('input-color')
        document.getElementById('settings').style.display = 'none';
        init();
    }    
});

function nextPlayer() {
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('current-' + activePlayer).textContent = '0';
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    roundScore = 0;
    lastDice = 0;
}

function init() {

    document.querySelector('.dice').style.display = 'none';
    roundScore = 0;
    scores = [0,0];
    activePlayer = 0;
    gamePlaying = true;
    lastDice = 0;

    if (gameMode === 1) {
        document.querySelector('.dice2').style.display = 'none'
        document.querySelector('.dice').style.top= '178px'
    } else {
        document.querySelector('.dice2').style.display = 'block'
        document.querySelector('.dice').style.top= '158px'
    }
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}   
