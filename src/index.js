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
        let playerResult = player.fire(opponent, [e.target.dataset.x,e.target.dataset.y])
        // Getting true coordinates of shot if random
        let playerTarget = document.querySelector(`.player[data-x="${playerResult.coordinates[0]}"][data-y="${playerResult.coordinates[1]}"]`)

        console.log(playerResult.message)
        if(playerResult.message.includes('Miss')){
            playerTarget.classList.add('miss');
            playerTarget.innerText = 'O'
        }else if(playerResult.message.includes('Hit')){
            playerTarget.classList.add('hit')
            playerTarget.innerText='X'
        }
        if(opponent.isComputer){
            let opponentResult = opponent.fire(player);
            // Getting coordinates for random computer fire or miss retry
            let opponentTarget = document.querySelector(`.opponent[data-x="${opponentResult.coordinates[0]}"][data-y="${opponentResult.coordinates[1]}"]`)


            if(opponentResult.message.includes('Miss')){
                opponentTarget.classList.add('miss');
                opponentTarget.innerText = 'O'
            }else if(opponentResult.message.includes('Hit')){
                opponentTarget.classList.add('hit')
                opponentTarget.innerText='X'
            }
        }
    })

}



startGame();

