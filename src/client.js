import axios from 'axios'

import {
    Transform,
    Writable
} from 'stream'

const url = 'http://localhost:3000'

async function consume() {
    const response = await axios({
        url,
        mehod: 'get',
        responseType: 'stream'
    })
    return response.data
}

const stream = await consume()
stream
    .pipe(
        new Transform({
            transform(chunk, enc, cb) {
                const item = JSON.parse(chunk)
                const myNumber = /\d+/.exec(item.name)[0]
                let name = item.name
                if (myNumber % 2 === 0) name = name.concat(' é par')
                else name = name.concat(' é impar')
                item.name = name
                cb(null, JSON.stringify(item))
            }
        })
    )
    .pipe(
        new Writable({
            write(chunk, enc, cb) {
                console.log('chegou', chunk.toString())
                cb()
            }
        })
    )