import {simpleRender} from "./render";

import {sign} from "jsonwebtoken";

import {jwtSecret} from "./wssHandler";

export const serverHandler = (req, res) => {
    switch (req.url) {
        case '/': {
            simpleRender(res, __dirname + '/frontend/index.html', 'html');
            break
        }

        case '/token': {
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'})
            res.end(JSON.stringify({
                token: sign({uid: null, nick: null}, jwtSecret)
            }));
            break
        }

        case (req.url.match(/^\/(\w*\/?)*\w+\.(css|js)/) || {}).input: {
            simpleRender(res, `${__dirname}/frontend/static${req.url}`, req.url.split('.')[1]);
            break
        }
    }
};