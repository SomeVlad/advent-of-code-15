const fs = require('fs')
const { calcDistance } = require('./part-1')

/**
 * @param {[number, number, number, number]} pair
 * @param {number} row
 * @param {number} limit
 * @returns {[number, number]|undefined} from-to tuple
 */
function findCheckedCoordinatesByPair(pair, row, limit) {
    const [Sx, Sy, Bx, By] = pair

    // distance from sensor to beacon
    const Dsb = calcDistance(Sx, Sy, Bx, By)

    // distance for target row
    const Dn = Dsb * 2 + 1 - 2 * Math.abs(Sy - row)

    if (Dn < 1) return undefined
    const left = Math.min(limit, Math.max(0, Sx - (Dn - 1) / 2))
    const right = Math.max(0, Math.min(limit, Sx + (Dn - 1) / 2))

    return [left, right]
}

function findCheckedRangeForRow(pairs, row, limit) {
    const ranges = []

    for (let pair of pairs) {
        // count [from, to] tuple for the target row for each pair
        const range = findCheckedCoordinatesByPair(pair, row, limit)
        if (!range) continue

        ranges.push(range)
    }

    const flatRanges = ranges
        .sort(([leftA], [leftB]) => leftA - leftB)
        .reduce((prev, curr, index, array) => {
            const min = prev[0]
            let max = prev[1]

            if (curr[0] >= min && curr[0] <= prev[1]) {
                max = Math.max(max, curr[1])
            }

            return [min, max]
        })

    if (flatRanges[0] === 0 && flatRanges[1] === limit) {
        return undefined
    }

    if (flatRanges[0] !== 0) return 0

    return flatRanges[1] + 1
}

function calculate(filename, limit) {
    const fileContents = fs.readFileSync(filename, 'utf-8')
    const pairs = []
    const frequencyMultiplicator = 4000000

    fileContents.split(/\n/).forEach(line => {
        const pair = line
            .match(/-?\d+/gs)
            .map(string => Number.parseInt(string))
        pairs.push(pair)
    })

    for (let i = 0; i < limit + 1; i++) {
        console.log(i)
        const dbIndex = findCheckedRangeForRow(pairs, i, limit)

        if (!dbIndex || dbIndex < 0) continue

        return dbIndex * frequencyMultiplicator + i
    }
}

module.exports = {
    calculate,
}
