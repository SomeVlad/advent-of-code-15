const fs = require('fs')

function calcDistance(x1, y1, x2, y2) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2)
}

/**
 * считаем [от, до] для искомого ряда относительно каждой пары
 * @param {[number, number, number, number]} pair
 * @param {number} row
 * @returns {[number, number]|undefined} from-to tuple
 */
function findCheckedCoordinatesByPair(pair, row) {
    const [Sx, Sy, Bx, By] = pair

    // distance from sensor to beacon
    const Dsb = calcDistance(Sx, Sy, Bx, By)

    // distance for target row
    const Dn = Dsb * 2 + 1 - 2 * Math.abs(Sy - row)

    if (Dn < 1) return undefined
    const left = Sx - (Dn - 1) / 2
    const right = Sx + (Dn - 1) / 2

    return [left, right]
}

function findCheckedRangeForRow(pairs, row) {
    const rowN = []
    const negativeRowN = []

    for (let pair of pairs) {
        // count [from, to] tuple for the target row for each pair
        const range = findCheckedCoordinatesByPair(pair, row)
        if (!range) continue

        const [left, right] = range
        const [Sx, Sy, Bx, By] = pair

        for (let i = left; i < right + 1; i++) {
            // beacon is on target row
            if (By === row && Bx === i) continue

            if (i < 0) negativeRowN[-i] = true
            else rowN[i] = true
        }
    }

    return [rowN, negativeRowN]
}

function calculate(filename, row) {
    const fileContents = fs.readFileSync(filename, 'utf-8')
    const pairs = []

    fileContents.split(/\n/).forEach(line => {
        const pair = line
            .match(/-?\d+/gs)
            .map(string => Number.parseInt(string))
        pairs.push(pair)
    })

    const [rowN, negativeRowN] = findCheckedRangeForRow(pairs, row)

    return rowN.filter(Boolean).length + negativeRowN.filter(Boolean).length
}

module.exports = {
    calculate,
    calcDistance,
    findCheckedCoordinatesByPair,
    findCheckedRangeForRow,
}
