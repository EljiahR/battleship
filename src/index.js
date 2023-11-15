import { createPlayer } from "./app";

function randomNumber(min,max){
    return Math.floor(Math.random() * (max - min) + min);
}

const playerGridLocation = document.getElementById('player-y-and-grid');
const opponentGridLocation = document.getElementById('opponent-y-and-grid');

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
playerGridLocation.appendChild(playerGrid);
opponentGridLocation.appendChild(opponentGrid);

function startGame(playerName, opponentName, isOpponentComputer, playerShips, opponentShips = randomCoordinates("opponent")){
    // Creating player objects and setting labels
    const player = createPlayer(playerName, false);
    const opponent = createPlayer(opponentName, isOpponentComputer);

    //Hiding opponent boats
    //opponentGrid.classList.add('hidden');

    // Faux data for testing
    //player.board.placeShip(3,[0,0],[0,2]);
    //Adding player ships to board
    playerShips.forEach(ship =>{
        player.board.placeShip(ship[2], ship[0], ship[1])
    })
    
    opponentShips.forEach(ship =>{
        opponent.board.placeShip(ship[2], ship[0], ship[1])
    })
    
    //Placing the players ships on their board
    player.board.ships.forEach(ship =>{
        ship.cells.forEach(cell =>{    
            document.querySelector(`.player[data-x="${cell[0]}"][data-y="${cell[1]}"]`).classList.add('ship')
        })
    })

    // Placing opponents ships on their board
    opponent.board.ships.forEach(ship =>{
        ship.cells.forEach(cell =>{
            document.querySelector(`.opponent[data-x="${cell[0]}"][data-y="${cell[1]}"]`).classList.add('ship')
        })
    })
    const attackOpponent = function (e){
        let playerResult = player.fire(opponent, [e.target.dataset.x,e.target.dataset.y])
        // Getting true coordinates of shot if random
        let playerTarget = document.querySelector(`.opponent[data-x="${playerResult.coordinates[0]}"][data-y="${playerResult.coordinates[1]}"]`)

        console.log(playerResult.message)
        if(playerResult.message.includes('Miss')){
            playerTarget.classList.add('miss');
            playerTarget.innerText = 'O'
        }else if(playerResult.message.includes('Hit')){
            playerTarget.classList.add('hit')
            playerTarget.innerText +='X'
            if(opponent.board.allShipsSunk()){
                alert(`${playerName} Wins!`)
                opponentGrid.removeEventListener('click', attackOpponent)
                return;
            }
        }
        if(opponent.isComputer){
            
            let opponentResult = opponent.fire(player);
            // Getting coordinates for random computer fire or miss retry
            let opponentTarget = document.querySelector(`.player[data-x="${opponentResult.coordinates[0]}"][data-y="${opponentResult.coordinates[1]}"]`)


            if(opponentResult.message.includes('Miss')){
                opponentTarget.classList.add('miss');
                opponentTarget.innerText = 'O'
            }else if(opponentResult.message.includes('Hit')){
                opponentTarget.classList.add('hit')
                opponentTarget.innerHTML +='X'
                if(player.board.allShipsSunk()){
                    alert(`${opponentName} Wins!`)
                    opponentGrid.removeEventListener('click', attackOpponent)
                    return;
                }
            }
        }
    }
    // Adding event listener to grid for taking fire()'s
    opponentGrid.addEventListener('click', attackOpponent);

}

let playerName, opponentName, isComputer;

function getName(){
    playerName = document.getElementById('player-name-input').value;
    opponentName = document.getElementById('opponent-name-input').value;
    isComputer = document.getElementById('computer-checkbox').checked;
    if(isComputer){
        opponentName = 'Computer'
    }
    if(playerName == ''){
        playerName = 'Player'
    }
    document.getElementById('background').remove();
    document.getElementById('player-name').innerText = playerName + "'s Board";
    document.getElementById('opponent-name').innerText = opponentName + "'s Board";

    //startGame(playerName, opponentName, isComputer);
}

// Dragging fuctionality
let dragged;
let shipLength;
let shipCoordinates = {
    "destroyer": null,
    "cruiser": null,
    "submarine": null,
    "battleship": null,
    "carrier": null,
}
const allShips = document.querySelectorAll('.new-ship');
window.addEventListener('keydown', (e)=>{
    if(e.key == 'r' && dragged.classList.contains('new-ship')){
        
        if(dragged.classList.contains('r')){
            
            if(Number(dragged.parentNode.dataset.x) + shipLength > 10){
                return;
            }
            dragged.classList.remove('r')
        }else{
            if(Number(dragged.parentNode.dataset.y) + shipLength > 10){
                return;
            }
            dragged.classList.add('r')
        }
    }
})

allShips.forEach((ship)=>{
    
    ship.addEventListener('dragstart', (e)=>{
        dragged = e.target;
        shipLength = Number(dragged.dataset.length)
        dragged.classList.add('dragged');
    })
})

playerGrid.addEventListener('dragover',(e)=>{
    e.preventDefault();
})
playerGrid.addEventListener('drop',(e)=>{
    e.preventDefault();
    dragged.classList.remove('dragged')
    // Make sure location is valid, and had issues when moving to a spot that was partially covered by self
    if(dragged.parentNode != e.target && e.target != dragged){
        // Checks orientation of boat
        if(dragged.classList.contains('r')){
            if(Number(e.target.dataset.y) + shipLength > 10){
                // Exit function
                return;
            }
        }else{
            if(Number(e.target.dataset.x) + shipLength > 10){
                return;
            }
        }

        if(dragged.classList.contains('not-placed')){
            dragged.classList.remove('not-placed')
        }
        if(dragged.classList.contains('destroyer')){
            shipCoordinates["destroyer"] = [Number(e.target.dataset.y), Number(e.target.dataset.x)]
        } else if(dragged.classList.contains('cruiser')){
            shipCoordinates["cruiser"] = [Number(e.target.dataset.y), Number(e.target.dataset.x)]
        } else if(dragged.classList.contains('submarine')){
            shipCoordinates["submarine"] = [Number(e.target.dataset.y), Number(e.target.dataset.x)]
        } else if(dragged.classList.contains('battleship')){
            shipCoordinates["battleship"] = [Number(e.target.dataset.y), Number(e.target.dataset.x)]
        } else if(dragged.classList.contains('carrier')){
            shipCoordinates["carrier"] = [Number(e.target.dataset.y), Number(e.target.dataset.x)]
        }
        if(shipCoordinates['destroyer'] && shipCoordinates['cruiser'] && shipCoordinates['submarine'] 
        && shipCoordinates['battleship'] && shipCoordinates['carrier']){
            document.getElementById('player-submit-ships').disabled = false
        }
        dragged.parentNode.removeChild(dragged);
        e.target.appendChild(dragged);
    }
})

function getShipCoordinates(side){
    
    const theseShips = [];
    theseShips.push([document.getElementById(`${side}-destroyer`),1])
    theseShips.push([document.getElementById(`${side}-cruiser`),2])
    theseShips.push([document.getElementById(`${side}-submarine`),2])
    theseShips.push([document.getElementById(`${side}-battleship`),3])
    theseShips.push([document.getElementById(`${side}-carrier`),4])
    const shipCoordinates = [];
    theseShips.forEach(ship =>{
        if(ship[0].classList.contains('r')){
            shipCoordinates.push([[Number(ship[0].parentNode.dataset.x),Number(ship[0].parentNode.dataset.y)],
            [Number(ship[0].parentNode.dataset.x), Number(ship[0].parentNode.dataset.y) + ship[1]], ship[1]+1])
        }else{
            shipCoordinates.push([[Number(ship[0].parentNode.dataset.x),Number(ship[0].parentNode.dataset.y)],
            [Number(ship[0].parentNode.dataset.x) + ship[1], Number(ship[0].parentNode.dataset.y)], ship[1]+1])
        }
    })
    if(isComputer){
        document.getElementById('player-boats').remove();
        document.getElementById('player-submit-ships').remove();
        startGame(playerName, opponentName, isComputer, shipCoordinates)
        
    }
    
}

function randomCoordinates(side){
    const theseShips = [];
    theseShips.push([document.getElementById(`${side}-carrier`),4])
    theseShips.push([document.getElementById(`${side}-battleship`),3])
    theseShips.push([document.getElementById(`${side}-cruiser`),2])
    theseShips.push([document.getElementById(`${side}-submarine`),2])
    theseShips.push([document.getElementById(`${side}-destroyer`),1])
    
    const shipCoordinates = [];
    const usedCoordinates =[];
    theseShips.forEach(ship=>{
        let rotated = false;
        if(randomNumber(0,2) == 1){
            rotated = true
        }
        let x = randomNumber(0, 10);
        let y = randomNumber(0, 10);
        let placed = false;
        while(!placed){
            if(rotated){
                let overlap = false;
                let currentSpaces = [];
                for(let i = y; i <= y + ship[1]; i++){
                    currentSpaces.push([x,i])
                    
                    usedCoordinates.forEach(coord=>{
                        if(coord.toString() === [x,i].toString()){
                            
                            overlap = true;
                            return;
                        }
                    })
                }
                if(y+ship[1] <= 9 && !overlap){
                    shipCoordinates.push([[x,y],[x,y+ship[1]],ship[1]+1]);
                    currentSpaces.forEach(coord=>{
                        usedCoordinates.push(coord);
                    })
                    placed = true;
                    
                    let cell = document.querySelector(`.${side}[data-x="${x}"][data-y="${y}"]`)
                    if(!ship[0].classList.contains('r')) ship[0].classList.add('r');
                    ship[0].classList.remove('not-placed')
                    ship[0].parentNode.removeChild(ship[0]);
                    cell.appendChild(ship[0]);

                }else {
                    x = randomNumber(0, 10);
                    y = randomNumber(0, 10);
                    if(randomNumber(0,2) == 1){
                        rotated = true
                    } else {
                        rotated = false;
                    }
                }
            } else {
                let overlap = false;
                let currentSpaces = [];
                for(let i = x; i <= x + ship[1]; i++){
                    currentSpaces.push([i,y])
                    usedCoordinates.forEach(coord=>{
                        if(coord.toString() === [i,y].toString()){
                            overlap = true;
                            return;
                        }
                    })
                }
                if(x+ship[1] <= 9 && !overlap){
                    shipCoordinates.push([[x,y],[x+ship[1],y],ship[1]+1]);
                    currentSpaces.forEach(coord=>{
                        usedCoordinates.push(coord);
                    })
                    placed = true;

                    let cell = document.querySelector(`.${side}[data-x="${x}"][data-y="${y}"]`)
                    if(ship[0].classList.contains('r')) ship[0].classList.remove('r');
                    ship[0].classList.remove('not-placed')
                    ship[0].parentNode.removeChild(ship[0]);
                    cell.appendChild(ship[0]);

                }else {
                    x = randomNumber(0, 10);
                    y = randomNumber(0, 10);
                    if(randomNumber(0,2) == 1){
                        rotated = true
                    } else {
                        rotated = false;
                    }
                }
            }
        }
    })
    
    return shipCoordinates;
}

document.getElementById('name-input').addEventListener('click',getName)

document.getElementById('player-submit-ships').addEventListener('click', (e)=>{
    e.preventDefault();
    getShipCoordinates('player')
})

document.getElementById('player-random').addEventListener('click', (e)=>{
    e.preventDefault();
    randomCoordinates('player');
})


