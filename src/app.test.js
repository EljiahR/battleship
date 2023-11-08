import { createShip } from "./app"

describe('Ship objects',()=>{
    const mockShip = createShip(4);
    testShip.hit()
    test('hit() increases # of hits by 1', ()=>{
        expect(testShip.getHits()).toBe(1);
    })
    testShip.hit()
    testShip.hit()
    test('isSunk() should be false',()=>{
        expect(testShip.isSunk()).toBe(false);
    })
    testShip.hit()
    test('isSunk() should be true',()=>{
        expect(testShip.isSunk()).toBe(true);
    })
})