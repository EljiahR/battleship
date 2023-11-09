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
        playerCell.dataset.x = i
        playerCell.dataset.y = j
        playerCell.classList.add('player')
        playerCell.classList.add('cell')
        playerGrid.appendChild(playerCell)
        
        let opponentCell = document.createElement('div');
        opponentCell.dataset.x = i
        opponentCell.dataset.y = j
        opponentCell.classList.add('opponent')
        opponentCell.classList.add('cell')
        opponentGrid.appendChild(opponentCell)
    }
}
root.appendChild(playerGrid);
root.appendChild(opponentGrid);

function startGame(playerName = "Player", opponentName = "Computer", isOpponentComputer = true){
    const player = createPlayer(playerName, false);
    const opponent = createPlayer(opponentName, isOpponentComputer);

    player.board.placeShip(3,[0,0],[0,2]);
    opponent.board.placeShip(4,[5,6],[8,6]);
    
    player.board.ships.forEach(ship =>{
        ship.cells.forEach(cell =>{    
            document.querySelector(`.player[data-x="${cell[0]}"][data-y="${cell[1]}"]`).classList.add('ship')
        })
    })

    opponent.board.ships.forEach(ship =>{
        ship.cells.forEach(cell =>{
            document.querySelector(`.opponent[data-x="${cell[0]}"][data-y="${cell[1]}"]`).classList.add('ship')
        })
    })

    playerGrid.addEventListener('click', (e) => {
        let result = player.fire(opponent, [e.target.dataset.x,e.target.dataset.y])
        console.log(result)
        if(result.includes('Miss')){
            e.target.classList.add('miss');
            e.target.innerText = 'O'
        }else if(result.includes('Hit')){
            e.target.classList.add('hit')
            e.target.innerText='X'
        }
    })

}



startGame();

