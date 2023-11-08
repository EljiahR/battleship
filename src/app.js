function createShip(length){
    return {
        length,
        hits: 0,
        hit(){
            this.hits += 1;
        },
        getHits(){
            return this.hits
        },
        isSunk(){
            return this.length === this.hits ? true : false;
        }
    }
}

export { createShip }