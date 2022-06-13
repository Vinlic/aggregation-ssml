const { Document } = require("../dist");

const ssml = '<speak provider="aliyun">\
<voice name="zh-cn-YunyangNeural">\
    <prosody contenteditable="true" rate="1.1" volume="500">\
        <p><w>欢迎</w>收看<break contenteditable="false" time="500ms">[500ms]</break>本期国盛证<phoneme contenteditable="false" ph="xuàn" data-content="[=xuàn]">券</phoneme><break contenteditable="false" time="500ms">[500ms]</break>U投顾个股分析</p>\
    </prosody>\
</voice>\
</speak>';

const document = Document.parse(ssml);
console.log(document.toSSML());
console.log(JSON.stringify(document.toTimeline()));

// const document = new Document({
//     provider: "microsoft",
//     children: [
//         {
//             type: "audio",
//             src: "http://www.baidu.com"
//         },
//         {
//             type: "backgroundAudio",
//             src: "http://www.baidu.com"
//         },
//         {
//             type: "break",
//             time: 1000
//         }
//     ]
// });

// console.log(document.toSSML(true));