/*
Game objects,
functions:
    turn {
        param-in: event - (event is this case is just a click event used on box on website)
        param-out: -
        desc: Function is checking, if game is not end yet and if the box is not filled - there's a easy way to do that - first it check if event target have
        value in innerHTML, and then it check if actualTurn is less than 0 - (if player win, turn is -2, if there's a tie, turn is -1).
    },
    checkWinner {
        param-in: -
        param-out: -
        desc: Function is checking if there is a winner in this turn.
    },
    reload {
        param-in: -
        param-out: -
        desc: Reloads a location
    }

*/

const game = {
    player1: "far fa-circle",
    player2: "fas fa-times",
    player1_moves: [],
    player2_moves: [],
    win_combinations: [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]],
    actualTurn: 0,
    turn: function(event) {
        if(event.target.innerHTML || game.actualTurn < 0) return 0;
        game.actualTurn % 2 === 0 ? event.target.innerHTML = `<i class = '${game.player1}'></i>` : event.target.innerHTML = `<i class = '${game.player2}'></i>`;
        game.actualTurn % 2 === 0 ? game.player1_moves.push(event.target.attributes.row.value) : game.player2_moves.push(event.target.attributes.row.value);
        game.actualTurn += 1;
        game.checkWinner();
    },
    checkWinner: function() {
        let [p1, p2] = [game.player1_moves.map(Number), game.player2_moves.map(Number)];
        if(game.win_combinations.map(arr => arr.every(val => p1.includes(val))).some(x => x == true))  { //Check, if there's a win combination in player 1 moves, first it return a array of booleans, and then it checks if there's any true bool in array
            document.getElementById("header").innerHTML = "Player 1 wins!";
            game.actualTurn = -2;
            let winCombination = game.win_combinations.map(arr => arr.every(val => p1.includes(val))).indexOf(true);
            let markTheWinner = this.win_combinations[winCombination];
            markTheWinner.map(numOfRow => document.getElementById(`${numOfRow}`).style.backgroundColor = "#126078");
        } else if(game.win_combinations.map(arr => arr.every(val => p2.includes(val))).some(x => x == true)) {
            document.getElementById("header").innerHTML = "Player 2 wins!";
            game.actualTurn = -2;
            let winCombination = game.win_combinations.map(arr => arr.every(val => p2.includes(val))).indexOf(true); //Check, if there's a win combination in player 2 moves, first it return a array of booleans, and then it checks if there's any true bool in array
            let markTheWinner = this.win_combinations[winCombination];
            markTheWinner.map(numOfRow => document.getElementById(`${numOfRow}`).style.backgroundColor = "#126078");
        }
        if(p1.length + p2.length == 9 && game.actualTurn != -2) {
            document.getElementById("header").innerHTML = "It's a tie!";
            game.actualTurn = -1;
        }
    },
    reload: function() {
        location.reload();
    }
}
const boxes = [...document.querySelectorAll('.box')];
boxes.forEach(box => box.addEventListener('click', game.turn));

const btn = document.getElementById('reload');
btn.addEventListener('click', game.reload);
