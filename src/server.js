import http from 'http';

import {
    Readable
} from 'stream'

import {
    randomUUID
} from 'crypto'

function* run() {
    for (let index = 0; index <= 99; index++) {
        const data = {
            id: randomUUID(),
            name: `Fulano-${index}`
        }
        yield data
    }
}

function handler(requeste, response) {
    const readable = Readable({
        read() {
            for (const data of run()) {
                console.log(`sending`, data)
                this.push(JSON.stringify(data) + "\n")
            }
            this.push(null) //info que os dados acabaram
        }
    })
    readable
        .pipe(response)
}

http.createServer(handler)
    .listen(3000)
    .on('listening', () => console.log('server running at 3000'))