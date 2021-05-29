const { getLineReader } = require('./srt-reader')
const readline = require("readline")
const fs = require('fs')

module.exports = (path) => {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(path)) {
            const accumulator = []
            const readLine = getLineReader()
            const input = fs.createReadStream(path)
            const rl = readline.createInterface({ input })
            rl.on('line', line => readLine(accumulator, line))
            rl.on('close', () => resolve(accumulator))
            return
        }

        reject()
    })
}
