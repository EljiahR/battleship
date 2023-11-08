import { createPlayer } from "./app";

const root = document.getElementById('root');

const playerGrid = document.createElement('div');
playerGrid.id= 'player-grid';
playerGrid.classList.add('game-grid')

const opponentGrid = document.createElement('div');
opponentGrid.id = 'opponent-grid';
opponentGrid.classList.add('game-grid')

for(let i = 0; i < 10; i++){
    for(let j = 0; j < 10; j++){
        
        let playerCell = document.createElement('div');
        playerCell.dataset.key = `[${i},${j}]`
        playerCell.classList.add('player')
        playerCell.classList.add('cell')
        playerGrid.appendChild(playerCell)
        
        let opponentCell = document.createElement('div');
        opponentCell.dataset.key = `[${i},${j}]`
        opponentCell.classList.add('opponent')
        opponentCell.classList.add('cell')
        opponentGrid.appendChild(opponentCell)
    }
}
root.appendChild(playerGrid);
root.appendChild(opponentGrid);

function startGame(){
    const player = createPlayer("document.getElementById('player-name').innerText", false);
    const computer = createPlayer('Computer', true);

    player.board.placeShip(3,[0,0],[0,2]);
    computer.board.placeShip(4,[5,6],[8,6]);
    
    player.board.ships.forEach(ship =>{
        ship.cells.forEach(cell =>{    
            document.querySelector(`.player[data-key="[${cell}]"]`).classList.add('ship')
        })
    })

    computer.board.ships.forEach(ship =>{
        ship.cells.forEach(cell =>{
            document.querySelector(`.opponent[data-key="[${cell}]"]`).classList.add('ship')
        })
    })
}

startGame();