import { createShip, createGameboard } from "./app.js"

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