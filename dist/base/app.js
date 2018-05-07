"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("ws");
const http = require("http");
const serverHandle_1 = require("./serverHandle");
const wssHandle_1 = require("./wssHandle");
const createWss = (server) => {
    const wss = new WebSocket.Server({ server });
    wss.on('connection', wssHandle_1.wsshandle);
    wssHandle_1.wsEvent.on('broadcastData', (data) => {
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });
    return wss;
};
exports.createServer = () => __awaiter(this, void 0, void 0, function* () {
    const server = http.createServer();
    server.on('request', serverHandle_1.serverHandle);
    createWss(server);
    return server;
});
//# sourceMappingURL=app.js.map