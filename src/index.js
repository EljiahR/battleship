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
        playerCell.classList.add('cell')
        playerGrid.appendChild(playerCell)
        
        let opponentCell = document.createElement('div');
        opponentCell.dataset.key = `[${i},${j}]`
        opponentCell.classList.add('cell')
        opponentGrid.appendChild(opponentCell)
    }
}
root.appendChild(playerGrid);
root.appendChild(opponentGrid);