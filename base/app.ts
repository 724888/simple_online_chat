import * as WebSocket from 'ws'

import * as http from 'http'

import {serverHandle} from "./serverhadle";

import {wsEvent, wsshandle} from "./wssHandle";

import {Server} from "ws";

const createWss =  (server): Server => {
    const wss = new WebSocket.Server({server});

    wss.on('connection', wsshandle);

    wsEvent.on('broadcastData', (data) => {
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        })
    })

    return wss
}

export const createServer = async () => {
    const server = http.createServer();

    server.on('request', serverHandle);

    createWss(server);

    return server
}

