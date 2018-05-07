import * as http from "http";

import * as WebSocket from 'ws'

import {EventEmitter} from "events";

interface User {
    uid: number,
    nick: string
}

export const wsEvent = new EventEmitter();

let userList: Array<User> = [];

let dUid = 1;

const EVENT_LIST = {
    NUM_PEOPLE: 'NUM_PEOPLE',
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    SPEAK: 'SPEAK',
    ERROR: 'ERROR'
};

export const wsshandle = (ws: WebSocket, req: http.IncomingMessage) => {
    ws.on('message', (rdata: WebSocket.Data) => {
        try {
            console.log(req.headers.authorization)
            const data = JSON.parse(rdata as string);
            switch (data.EVENT) {
                case EVENT_LIST.NUM_PEOPLE:
                    ws.send(JSON.stringify({
                        EVENT: EVENT_LIST.NUM_PEOPLE,
                        value: userList.length
                    }));
                    break;
                case EVENT_LIST.LOGIN:
                    data.nick = data.nick.trim();
                    if (userList.findIndex(v => v.nick === data.nick) >= 0) {
                        ws.send(JSON.stringify({
                            EVENT: EVENT_LIST.ERROR,
                            value: '当前用户名已被使用'
                        }));
                        break;
                    }
                    if (data.nick.length >= 10) {
                        ws.send(JSON.stringify({
                            EVENT: EVENT_LIST.ERROR,
                            value: '用户名长度应不超过10个字符'
                        }));
                        break;
                    }
                    const newUser = {
                        uid: dUid,
                        nick: data.nick
                    };
                    userList.push(newUser);
                    wsEvent.emit('broadcastData', JSON.stringify({
                        EVENT: EVENT_LIST.LOGIN,
                        value: newUser,
                        userList: userList,
                        num: userList.length
                    }));
                    dUid ++;
                    break;
                case EVENT_LIST.LOGOUT:
                    userList.splice(userList.findIndex(v => v.uid === data.user.uid), 1)
                    wsEvent.emit('broadcastData', JSON.stringify({
                        EVENT: EVENT_LIST.LOGOUT,
                        value: userList.findIndex(v => v.uid === data.user.uid),
                        userList: userList,
                        num: userList.length
                    }));
                    break;
                case EVENT_LIST.SPEAK:
                    wsEvent.emit('broadcastData', JSON.stringify({
                        EVENT: EVENT_LIST.SPEAK,
                        user: data.user,
                        word: data.word
                    }));
                    break;
            }
        } catch (e) {
            console.log(e)
        }
    });
}