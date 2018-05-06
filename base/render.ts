import * as fs from 'fs'

import {ServerResponse} from "http";

export const simpleRender = (res: ServerResponse, htmlPath) => {
    fs.readFile(htmlPath, ((err, data: Buffer) => {
        if (err) throw err
        res.end(data.toString())
    }))
}