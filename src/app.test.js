import { createShip } from "./app.js"

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
})