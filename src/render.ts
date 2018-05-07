import * as fs from 'fs'

import {ServerResponse} from "http";

export const simpleRender = (res: ServerResponse, htmlPath: string, type?: string) => {
    fs.readFile(htmlPath, ((err, data: Buffer) => {
        if (err) {
            res.writeHead(404);
            res.end('Not Found')
        } else {
            switch (type) {
                case 'js':
                    res.writeHead(200, {'Content-Type': 'application/javascript; charset=utf-8'});
                    break;
                case 'css':
                    res.writeHead(200, {'Content-Type': 'text/css; charset=utf-8'});
                    break;
                default:
                    res.writeHead(200)
            }
            res.end(data.toString())
        }
    }))
};