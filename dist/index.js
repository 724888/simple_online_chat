"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./base/app");
module.exports = (() => __awaiter(this, void 0, void 0, function* () {
    try {
        const app = yield app_1.createServer();
        return app.listen(3000);
    }
    catch (e) {
        console.log(e);
        process.exit(1);
    }
}))();
//# sourceMappingURL=index.js.map