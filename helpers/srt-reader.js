const segmentType = {
    IDENTIFIER: 'identifier',
    HOUR: 'hour',
    SUBTITLE: 'subtitle',
    BREAK: 'break'
}

const orderType = {
    ASC: 'asc',
    DESC: 'desc'
}

function removeTags(text) {
    const regex = /(<([^>]+)>)/ig
    return text.replace(regex, '')
}

function removeSpecialCharacters(text) {
    const regex = /[`~!@#$%^&*()_|+\-=?;:",.<>\{\}\[\]\\\/]/gi
    return text.replace(regex, '')
}

function getHour(hour) {
    const arr = hour.replace(/,/g, ':').split('-->')
    const arrMin = arr[0].trim().split(':')
    const arrMax = arr[1].trim().split(':')
    const min = new Date()
    min.setHours(Number(arrMin[0]), Number(arrMin[1]), Number(arrMin[2]), Number(arrMin[3]))
    const max = new Date()
    max.setHours(Number(arrMax[0]), Number(arrMax[1]), Number(arrMax[2]), Number(arrMax[3]))
    return [min, max]
}

function orderAccumulator(accumulator, type) {

    const ordinators = {
        [orderType.ASC]: (a, b) => {
            return a.count - b.count
        },
        [orderType.DESC]: (a, b) => {
            return b.count - a.count
        }
    }

    accumulator.words.sort(ordinators[type])
}

function srtReadingControl() {
    var segment = segmentType.BREAK

    function getCurrentSegment(line) {
        const conditions = [{
            segment: segmentType.IDENTIFIER,
            satisfied: line && segment === segmentType.BREAK
        }, {
            segment: segmentType.HOUR,
            satisfied: segment === segmentType.IDENTIFIER
        }, {
            segment: segmentType.SUBTITLE,
            satisfied: segment === segmentType.HOUR || (line && segment === segmentType.SUBTITLE)
        }, {
            segment: segmentType.BREAK,
            satisfied: !line
        }]

        segment = conditions.find(condition => condition.satisfied).segment

        return segment
    }

    return getCurrentSegment
}

const getCurrentSegment = srtReadingControl()

const getLineReader = () => {
    let current = {}
    return (accumulator, line) => {
        const segment = getCurrentSegment(line)
        switch (segment) {
            case segmentType.SUBTITLE:
                current.subtitle = removeSpecialCharacters(removeTags(line)).trim()
                break
            case segmentType.IDENTIFIER:
                current.identifier = Number(line)
                break
            case segmentType.HOUR:
                const [start, end] = getHour(line)
                current = { ...current, start, end }
                break
            default:
                accumulator.push(current)
                current = {}
        }
    }
    
}

module.exports = {
    getCurrentSegment,
    orderAccumulator,
    removeSpecialCharacters,
    removeTags,
    orderType,
    segmentType,
    getHour,
    getLineReader
}