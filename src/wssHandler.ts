import * as http from "http";

import * as WebSocket from 'ws'

import {EventEmitter} from "events";

import * as querystring from 'querystring'

import {verify} from "jsonwebtoken";

import * as url from "url";

import {LOGIN_HANDLER, LOGOUT_HANDLER, NUM_PEOPLE_HANDLER, SPEAK_HANDLER} from "./event";

interface User {
    uid: number,
    nick: string
}

export const jwtSecret = 'vwiq2389cjkwopchwfcwev';

export const wsEvent = new EventEmitter();

export let userList: Array<User> = [];

export let dUid = 1;

export const EVENT_LIST = {
    NUM_PEOPLE: 'NUM_PEOPLE',
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    SPEAK: 'SPEAK',
    ERROR: 'ERROR',
    TOKEN: 'TOKEN'
};

export const wssHandler = (ws: WebSocket, req: http.IncomingMessage) => {
    // 校验token
    const token = querystring.parse(url.parse(req.url).query).token;
    const user = verify(token as string, jwtSecret) as User;
    if (user.uid !== null && user.nick !== null && userList.findIndex(v => v.uid === user.uid && v.nick === user.nick) >= 0) {
        ws.send(JSON.stringify({
            EVENT: EVENT_LIST.LOGIN,
            value: user,
            userList: userList,
            num: userList.length
        }))
    }
    ws.on('message', (rdata: WebSocket.Data) => {
        try {
            const data = JSON.parse(rdata as string);
            switch (data.EVENT) {
                case EVENT_LIST.NUM_PEOPLE:
                    NUM_PEOPLE_HANDLER(ws, data);
                    break;
                case EVENT_LIST.LOGIN:
                    LOGIN_HANDLER(ws, data);
                    break;
                case EVENT_LIST.LOGOUT:
                    LOGOUT_HANDLER(ws, data);
                    break;
                case EVENT_LIST.SPEAK:
                   SPEAK_HANDLER(ws, data);
                    break;
            }
        } catch (e) {
            console.log(e)
        }
    });
};