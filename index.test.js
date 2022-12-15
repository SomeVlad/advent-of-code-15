const { calculate, findCheckedCoordinatesByPair } = require('./part-1')
const { calculate: calculatePart2 } = require('./part-2')

describe('part 1 calculation', function () {
    xit('should work with test data', () => {
        expect(calculate('test-input.txt', 10)).toBe(26)
    })
})

describe('findCheckedCoordinatesByPair', function () {
    xit('should work with test data', () => {
        expect(findCheckedCoordinatesByPair([5, 2, 2, 4], 2)).toStrictEqual([
            0, 10,
        ])
        expect(findCheckedCoordinatesByPair([5, 2, 2, 4], 7)).toStrictEqual([
            5, 5,
        ])
        expect(findCheckedCoordinatesByPair([5, 2, 2, 4], 8)).toBeUndefined()
        expect(findCheckedCoordinatesByPair([5, 2, 2, 4], 4)).toStrictEqual([
            2, 8,
        ])
    })
})

describe('calculatePart2', () => {
    it('should work with test data', () => {
        expect(calculatePart2('test-input.txt', 20)).toBe(56000011)
    })
})
