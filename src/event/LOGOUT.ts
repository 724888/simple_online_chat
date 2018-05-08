import * as WebSocket from 'ws'

import {EVENT_LIST, userList, wsEvent} from "../wssHandler";

export const LOGOUT_HANDLER = (ws: WebSocket, data) => {
    userList.splice(userList.findIndex(v => v.uid === data.user.uid), 1);
    wsEvent.emit('broadcastData', JSON.stringify({
        EVENT: EVENT_LIST.LOGOUT,
        value: userList.findIndex(v => v.uid === data.user.uid),
        userList: userList,
        num: userList.length
    }));
};