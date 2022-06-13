const { Document } = require("../dist");

const ssml = '<speak provider="microsoft"><voice name="zh-cn-YunxiNeural"><prosody contenteditable="true" rate="1" volume="100"><p>欢迎<break contenteditable="false" time="2s">[2s]</break>收看本期国<phoneme contenteditable="false" ph="chéng" data-content="[=chéng]">盛</phoneme>证券</p></prosody></voice></speak>';

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