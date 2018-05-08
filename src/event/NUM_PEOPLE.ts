import * as WebSocket from 'ws'

import {EVENT_LIST, userList} from "../wssHandler";

export const NUM_PEOPLE_HANDLER = (ws: WebSocket, data) => {
    ws.send(JSON.stringify({
        EVENT: EVENT_LIST.NUM_PEOPLE,
        value: userList.length
    }));
};
