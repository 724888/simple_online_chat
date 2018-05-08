import * as WebSocket from 'ws'

import {EVENT_LIST, wsEvent} from "../wssHandler";

export const SPEAK_HANDLER = (ws: WebSocket, data) => {
    wsEvent.emit('broadcastData', JSON.stringify({
        EVENT: EVENT_LIST.SPEAK,
        user: data.user,
        word: data.word
    }));
};