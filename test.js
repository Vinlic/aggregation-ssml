const { Document } = require("./");

const document = new Document({
    provider: "microsoft",
    children: [
        {
            type: "audio",
            src: "http://www.baidu.com"
        },
        {
            type: "backgroundAudio",
            src: "http://www.baidu.com"
        },
        {
            type: "break",
            time: 1000
        }
    ]
});

console.log(document.toSSML(true));