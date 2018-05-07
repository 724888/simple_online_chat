import {createServer} from "./src/app";

module.exports= (async ()=> {
    try {
        const app = await createServer();
        return app.listen(3000)
    } catch (e) {
        process.exit(1)
    }
})();