const { Document } = require("../dist");

const ssml = '<speak provider="microsoft"><voice name="zh-cn-YunxiNeural"><prosody contenteditable="true" rate="1" volume="100"><p>深圳市思迪信息技术股份有限公司于2006年成立，是一家以金融软件开发、金融云基础设施、金融业务咨询服务为核心的高科技公司，已成功为几百家大型金融机构提供深度软件服务和整体解决方案。</p></prosody></voice></speak>';

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