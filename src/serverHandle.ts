import {simpleRender} from "./render";

import {sign} from "jsonwebtoken";

import {jwtSecret} from "./wssHandle";

export const serverHandle = (req, res) => {
    switch (req.url) {
        case '/': {
            simpleRender(res, __dirname + '/frontend/index.html', 'html');
            break
        }

        case '/token': {
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