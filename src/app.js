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
    
        placeShip(shipLength, start, end) {
            // Check if viable placement for ship of designated size
            if((start[0] === end[0] || start[1] === end[1]) && (Math.abs(start[0] - end[0] + 1) === shipLength || Math.abs(start[1] - end[1] + 1 === shipLength))){
                const newShip = createShip(shipLength);
                // Check if placement is vertical
                if(start[1] === end[1]){
                    let xStart = start[0];
                    let xEnd = end[0];
                    if(xStart > xEnd){
                        [xStart, xEnd] = [xEnd, xStart]
                    }
                    for(let i = xStart; i <= xEnd; i++){
                        this.grid[i][start[1]] = newShip;
                    }
                // Else placement must be horizontal
                }else {
                    let yStart = start[1];
                    let yEnd = end[1];
                    if(yStart > yEnd){
                        [yStart, yEnd] = [yEnd, yStart]
                    }
                    for(let i = yStart; i <= yEnd; i++){
                        this.grid[i][start[0]] = newShip;
                    }
                }
            }
        },
        getInfo(coords){
            return this.grid[coords[0]][coord[1]];
        }
        
    }
}

export { createShip }