import * as WebSocket from 'ws'

import {sign} from "jsonwebtoken";

import {dUid, EVENT_LIST, jwtSecret, userList, wsEvent} from "../wssHandler";

export const LOGIN_HANDLER = (ws: WebSocket, data) => {
    data.nick = data.nick.trim();
    if (userList.findIndex(v => v.nick === data.nick) >= 0) {
        ws.send(JSON.stringify({
            EVENT: EVENT_LIST.ERROR,
            value: '当前用户名已被使用'
        }));
        return
    }
    if (data.nick.length >= 10) {
        ws.send(JSON.stringify({
            EVENT: EVENT_LIST.ERROR,
            value: '用户名长度应不超过10个字符'
        }));
        return
    }
    const newUser = {
        uid: dUid,
        nick: data.nick
    };
    userList.push(newUser);
    ws.send(JSON.stringify({
        EVENT: EVENT_LIST.TOKEN,
        value: sign(newUser, jwtSecret),
        uid: dUid,
        nick: data.nick
    }));
    wsEvent.emit('broadcastData', JSON.stringify({
        EVENT: EVENT_LIST.LOGIN,
        value: newUser,
        userList: userList,
        num: userList.length
    }));
    (dUid as number)++;
};