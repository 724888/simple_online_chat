import {simpleRender} from "./render";

export const serverHandle = (req, res) => {
    switch (req.url) {
        case '/': {
            simpleRender(res, __dirname + '/../../frontend/index.html')
            return
        }
    }
}