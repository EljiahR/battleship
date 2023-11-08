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
                this.ships.push(newShip);
                // Check if placement is horizontal
                if(start[1] === end[1]){
                    let xStart = start[0];
                    let xEnd = end[0];
                    if(xStart > xEnd){
                        [xStart, xEnd] = [xEnd, xStart]
                    }
                    for(let i = xStart; i <= xEnd; i++){
                        this.grid[i][start[1]] = newShip;
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
                    }
                }
            }
        },
        getInfo(coords){
            return this.grid[coords[0]][coords[1]];
        },
        recieveAttack(coords){
            if(this.grid[coords[0]][coords[1]] === undefined){
                this.grid[coords[0]][coords[1]] = 'miss';
            }else if(this.grid[coords[0]][coords[1]] === 'miss'){
                return;
            }else{
                this.grid[coords[0]][coords[1]].hit();
            }
        },
        allShipsSunk(){
            if(this.ships.filter((ship => !ship.isSunk())).length === 0){
                return true;
            }
            return false;
        }
        
    }
}

export { createShip, createGameboard }