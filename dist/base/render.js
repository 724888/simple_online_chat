"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
exports.simpleRender = (res, htmlPath) => {
    fs.readFile(htmlPath, ((err, data) => {
        if (err)
            throw err;
        res.end(data.toString());
    }));
};
//# sourceMappingURL=render.js.map