const { Document } = require("../dist");

const ssml = "<speak version=\"1.0\" xml:lang=\"zh-cn\" xmlns=\"http://www.w3.org/2001/10/synthesis\" provider=\"yunXiaoWei\" solution=\"yani\" format=\"mp3\"><voice name=\"zh-cn-XiaoxiaoNeural\"><express-as style=\"newscast\"><prosody rate=\"0\" volume=\"100\" contenteditable=\"true\"><p>近期市场担忧美联储货币政策收紧，和美债利率上升对中国市场的<break time=\"2s\"/>影响。我们认为国内外的增长与通胀“内滞外胀”的特征愈发明显。本轮海外紧缩周期主要是因为海外部分经济体此前过度刺激，通胀高企，货币政策大幅滞后通胀所致。同时中国自身增长已经在底部徘徊，稳增长政策有望继续发力，在这样的综合背景之下，本轮海外紧缩对中国市场的影响可能会相对有限，资金外流及人民币贬值压力可能会小于往期。针对近期价值风格明显跑赢成长。我们认为目前稳增长政策仍相对积极，但成效尚需时日。叠加近期国内局部疫情影响，政策仍有进一步加力的空间，稳增长可能仍将是当前的主线。结合摸底期市场风险偏好整体偏低的特征，以及海外流动性收紧背景下，全球成长跑输价值的风格具备一致性，我们认为当前低估值的稳增长领域，仍有阶段性的相对配置价值。</p></prosody></express-as></voice></speak>";

const document = Document.parse(ssml);
console.log(document.toSSML(), document.toTimeline());
// console.log(JSON.stringify(document.toTimeline()));

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