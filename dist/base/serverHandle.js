"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const render_1 = require("./render");
exports.serverHandle = (req, res) => {
    switch (req.url) {
        case '/': {
            render_1.simpleRender(res, __dirname + '/../../frontend/index.html');
            return;
        }
    }
};
//# sourceMappingURL=serverHandle.js.map