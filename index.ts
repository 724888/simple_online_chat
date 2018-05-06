import {createServer} from "./base/app";


module.exports= (async ()=> {
    try {
        const app = await createServer();
        return app.listen(3000)
    } catch (e) {
        console.log(e);
        process.exit(1)
    }
})();