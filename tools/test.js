const { Document, Providers } = require("../dist");

const ssml = '<speak version="1.0" xml:lang="zh-cn" xmlns="http://www.w3.org/2001/10/synthesis" provider="microsoft" format="mp3"><voice name="zh-cn-XiaoxiaoNeural"><prosody rate="1.3" volume="100"><p>今日，10只股票类场内ETF成交额超20亿元，华夏互联网ETF、博时医疗ETF、华夏中证1000ETF位居成交额前三，分别达19.97、14.97、14.82亿元</p></prosody></voice></speak>';

const document = Document.parse(ssml, undefined, {
    [Providers.YunXiaoWei]: {
        default: {
            halfCharDuration: 100,
            fullCharDuration: 220,
            bigCharDuration: 880
        }
    }
});

console.log(document.toSSML(), document.duration);