"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
exports.wsEvent = new events_1.EventEmitter();
let userList = [];
let dUid = 1;
const EVENT_LIST = {
    NUM_PEOPLE: 'NUM_PEOPLE',
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    SPEAK: 'SPEAK'
};
exports.wsshandle = (ws, req) => {
    ws.on('message', (rdata) => {
        try {
            const data = JSON.parse(rdata);
            switch (data.EVENT) {
                case EVENT_LIST.NUM_PEOPLE:
                    ws.send(JSON.stringify({
                        EVENT: EVENT_LIST.NUM_PEOPLE,
                        value: userList.length
                    }));
                    break;
                case EVENT_LIST.LOGIN:
                    const newUser = {
                        uid: dUid,
                        nick: data.nick
                    };
                    userList.push(newUser);
                    exports.wsEvent.emit('broadcastData', JSON.stringify({
                        EVENT: EVENT_LIST.LOGIN,
                        value: newUser,
                        userList: userList,
                        num: userList.length
                    }));
                    dUid++;
                    break;
                case EVENT_LIST.LOGOUT:
                    userList.splice(userList.findIndex(v => v.uid === data.user.uid), 1);
                    exports.wsEvent.emit('broadcastData', JSON.stringify({
                        EVENT: EVENT_LIST.LOGOUT,
                        value: userList.findIndex(v => v.uid === data.user.uid),
                        userList: userList,
                        num: userList.length
                    }));
                    break;
                case EVENT_LIST.SPEAK:
                    exports.wsEvent.emit('broadcastData', JSON.stringify({
                        EVENT: EVENT_LIST.SPEAK,
                        user: data.user,
                        word: data.word
                    }));
                    break;
            }
        }
        catch (e) {
            console.log(e);
        }
    });
};
//# sourceMappingURL=wssHandle.js.map