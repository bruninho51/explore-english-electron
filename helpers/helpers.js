const path = require('path')

const extractWordsFromSentence = (sentence) => {
    return sentence.split(' ').map(word => word.trim()).filter(word => !!word)
}

const dist = (args) => {
    return path.join.apply(null, [process.cwd(), 'dist', ...args])
}

module.exports = { dist, extractWordsFromSentence }