import { createShip, createGameboard, createPlayer } from "./app.js"

describe('Ship objects',()=>{
    const mockShip = createShip(4);
    
    test('hit() increases # of hits by 1', ()=>{
        mockShip.hit();
        expect(mockShip.getHits()).toBe(1);
    })
    
    test('isSunk() should be false',()=>{
        
        expect(mockShip.isSunk()).toBe(false);
    })
    test('isSunk() should be true after # of hits equal to length',()=>{
        mockShip.hit();
        mockShip.hit();
        mockShip.hit();
        expect(mockShip.isSunk()).toBe(true);
    })
});

describe('Gameboard object tests',()=>{
    const mockGame = createGameboard();
    
    test('placeShip() should set grid array values to reference the ship',()=>{
        mockGame.placeShip(3, [0,0], [0, 2]);
        expect(mockGame.getInfo([0,0])).toBe(mockGame.getInfo([0,2]));
    })
    
    test('recieveAttack() on [0,0] should set hits of mockShip to 1', ()=>{
        mockGame.recieveAttack([0,0]);
        expect(mockGame.getInfo([0,2]).getHits()).toBe(1);
    })

    test('recieveAttack() on [1,1] should be a miss and grid should be labeled as such',()=>{
        mockGame.recieveAttack([1,1]);
        expect(mockGame.getInfo([1,1])).toBe('miss');
    })

    test('allShipsSunk() should return false', ()=>{
        expect(mockGame.allShipsSunk()).toBe(false);
    })

    test('allShipsSunk() should return true', ()=>{
        mockGame.recieveAttack([0,1]);
        mockGame.recieveAttack([0,2]);
        expect(mockGame.allShipsSunk()).toBe(true);
    })
})

describe('Player object functionality',()=>{
    const player = createPlayer('Joe', false);
    const computer = createPlayer('Shmoe', true);
    
    test('Player places ship on their board',()=>{
        player.board.placeShip(5, [4,2], [9,2])
        expect(player.board.getInfo([4,2])).toBe(player.board.getInfo([7,2]))
    })
    test('Computer places ship on their board', ()=>{
        computer.board.placeShip(3,[1,1],[3,1])
        expect(computer.board.getInfo([1,1])).toBe(computer.board.getInfo([2,1]))
    })
    test('Player misses ship shows results',()=>{
        expect(player.fire(computer, [0,0])).toBe('Miss at A1!')
    })
    test('Player hits ship shows results',()=>{
        expect(player.fire(computer, [1,1])).toBe('Hit at B2!')
    })
    test('Computer fires random shot',()=>{
        let result = computer.fire(player)
        expect(result !== undefined).toBe(true)
    })

    test('Trying to fire at a missed cell results in random shot',()=>{
        expect(player.fire(computer, [0,0])).not.toBe('Miss at A1!')
    })
})