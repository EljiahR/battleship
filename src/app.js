const yTranslate = {0:'A',1:'B',2:'C',3:'D',4:'E',5:'F',6:'G',7:'H',8:'I',9:'J'};

function getRandom(min,max){
    return Math.floor(Math.random() * (max - min) + min);
}

function createShip(length){
    return {
        length,
        hits: 0,
        hit(){
            this.hits += 1;
        },
        getLength(){
            return this.length
        },
        getHits(){
            return this.hits
        },
        isSunk(){
            return this.length === this.hits ? true : false;
        }
    }
}

function createGameboard(){
    return {
        grid:[new Array(10),new Array(10),new Array(10),new Array(10),
            new Array(10),new Array(10),new Array(10),new Array(10),
            new Array(10),new Array(10)],
        ships: [],
        placeShip(shipLength, start, end) {
            // Check if viable placement for ship of designated size
            if((start[0] === end[0] || start[1] === end[1]) && (Math.abs(start[0] - end[0]) + 1 === shipLength || Math.abs(start[1] - end[1]) + 1 === shipLength)){
                const newShip = createShip(shipLength);
                
                let cells = [];
                // Check if placement is horizontal
                if(start[1] === end[1]){
                    let xStart = start[0];
                    let xEnd = end[0];
                    if(xStart > xEnd){
                        [xStart, xEnd] = [xEnd, xStart]
                    }
                    for(let i = xStart; i <= xEnd; i++){
                        this.grid[i][start[1]] = newShip;
                        cells.push([i,start[1]]);
                    }
                // Else placement must be vertical
                }else {
                    let yStart = start[1];
                    let yEnd = end[1];
                    if(yStart > yEnd){
                        [yStart, yEnd] = [yEnd, yStart]
                    }
                    for(let i = yStart; i <= yEnd; i++){
                        this.grid[start[0]][i] = newShip;
                        cells.push([start[0],i]);
                    }
                }
                this.ships.push({ship: newShip, cells});
            }
        },
        getInfo(coords){
            return this.grid[coords[0]][coords[1]];
        },
        recieveAttack(coords){
            if(this.grid[coords[0]][coords[1]] === undefined){
                this.grid[coords[0]][coords[1]] = 'miss';
                return 'Miss!'
            }else if(this.grid[coords[0]][coords[1]] === 'miss'){
                return;
            }else{
                this.grid[coords[0]][coords[1]].hit();
                this.grid[coords[0]][coords[1]] = 'hit';
                return 'Hit!'
            }
        },
        allShipsSunk(){
            if(this.ships.filter((shipObject => !shipObject.ship.isSunk())).length === 0){
                return true;
            }
            return false;
        }
        
    }
}

function createPlayer(name, isComputer){
    return {
        name,
        isComputer,
        board: createGameboard(),
        fire(opponent, coords = [getRandom(0,10), getRandom(0,10)]){
            
            // Translating dataset coords to actual numbers instead of strings   
            let y = Number(coords[0]);
            let x = Number(coords[1])
            
            // Prevents computer from shooting at already missed spaces,
            // don't plan to allow for playes but who knows.
            while(opponent.board.getInfo([y,x]) === 'miss' || opponent.board.getInfo([y,x]) == 'hit'){
                y = getRandom(0,10);
                x = getRandom(0,10);
            }
            let result = opponent.board.recieveAttack([y,x]);
            if(result === 'Hit!'){
                return `Hit at ${yTranslate[y]}${x+1}!`
            }else{
                return `Miss at ${yTranslate[y]}${x+1}!`
            }
        }
    }

}

export { createShip, createGameboard, createPlayer }