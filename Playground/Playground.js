const testRouter = require("express").Router();
const { default: axios } = require("axios");
const fs = require("fs");
const _fs = require("node:fs/promises");
const http = require("node:https");
const { jsonFileToJS_Object } = require("../Util/fileReading");

testRouter.get("/", async (req, res, next) => {
    try {
        const appRoot = process.cwd();
        const jsonData = await jsonFileToJS_Object(appRoot + "/config/json/clientInfo.json");
        const tempDir = `${appRoot}/.temp/`;

        // const fetch = () => {
        //     return new Promise((resolve, reject) => {
        //         const req = http.request(new URL(`https://www.freepik.com/premium-vector/instagram-promotion-banner-template_12824506.htm`), (res) => {
        //             let data;
        //             res.on("data", (d) => {
        //                 data += d.toString();
        //                 res.emit("end");
        //             });
        //             res.on("end", () => {
        //                 resolve(data);
        //             });
        //         });

        //         req.on("error", (error) => {
        //             reject(error);
        //         });
        //         req.end();
        //     });
        // };

        // fetch().then((data) => {
        //     console.log(data);
        //     res.send(data);
        // });

        axios
            .get(`https://www.freepik.com/premium-vector/instagram-promotion-banner-template_12824506.htm`)
            .then((data) => {
                const { data: text } = data;
                const metaTag = String(text).match(/<meta\s*\w*title=".*"\s*content=".*".*\/>/gi);
                console.log(data.data.substring(0,10000))
                console.log(metaTag);
                res.send(true);
            })
            .catch((e) => res.send(e.message));
    } catch (e) {
        console.error(e.message);
    }
});

module.exports = testRouter;
