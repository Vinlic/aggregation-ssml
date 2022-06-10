import { create } from 'xmlbuilder2';
import { XMLParser } from 'fast-xml-parser';

import IDocumentOptions from './interface/IDocumentOptions';
import IElementOptions from './elements/interface/IElementOptions';

import ElementFactory from './ElementFactory';
import { BackgroundAudio, Element, Prosody, Voice } from './elements';
import Providers from './enums/Providers';
import util from './util';

const xmlParser = new XMLParser({
    allowBooleanAttributes: true, //需要解析布尔值属性
    ignoreAttributes: false, //不要忽略属性
    attributeNamePrefix: '', //属性名称不拼接前缀
    preserveOrder: true, //保持原始文档标签顺序
    parseTagValue: false //不解析标签内值
});

class Document {
    public static Provider = Providers;

    public static readonly type = 'document'; // type标识
    public type = ''; // 文档type必须为document
    public provider = Providers.Unknown;  //服务提供商
    public version = '';  //文档版本
    public language = '';  //根文档语言
    public xmlns = '';  //文档URI
    public effect?: string;  //发音效果器
    public effectValue?: string;  //发音效果器值
    public format = '';  //发音音频文件格式
    public sampleRate?: string;  //发音音频采样率
    public children: Element[] = [];  //文档子元素

    constructor(options: IDocumentOptions) {
        if(!util.isObject(options)) throw new TypeError('options must be an object');
        util.optionsInject(this, options, {
            type: () => 'document',
            provider: (v: any) => !util.isUndefined(v) ? v as Providers : v,
            version: (v: any) => util.defaultTo(v, '1.0'),
            language: (v: any) => util.defaultTo(v, 'zh-cn'),
            xmlns: (v: any) => util.defaultTo(v, 'http://www.w3.org/2001/10/synthesis'),
            format: (v: any) => util.defaultTo(v, 'mp3'),
            children: (datas: IElementOptions[]) =>
                util.isArray(datas)
                    ? datas.map(options => {
                        const node = Element.isInstance(options) ? options as Element : ElementFactory.createElement(options);
                        node.parent = this;
                        return node;
                    })
                    : [], //实例化子节点
        }, {
            type: (v: any) => v === "document",
            provider: (v: any) => Object.values(Providers).includes(v),
            version: (v: any) => util.isString(v),
            language: (v: any) => util.isString(v),
            xmlns: (v: any) => util.isString(v),
            format: (v: any) => util.isString(v),
            effect: (v: any) => util.isUndefined(v) || util.isString(v),
            sampleRate: (v: any) => util.isUndefined(v) || util.isString(v),
            children: (v: any) => util.isArray(v)
        });
    }

    public find(path: string): Document | Element | undefined {
        const keys = path.split(".");
        let that: Document | Element | undefined = this;
        keys.forEach(key => {
            if(!util.isObject(that)) {
                that = undefined;
                return;
            }
            that = that.children.find((v: Element) => v.type == key);
        });
        return that;
    }

    public appendChild(node: Element) {
        if (!Element.isInstance(node))
            throw new TypeError('node must be an Element instance');
        node.parent = this;
        this.children.push(node);
    }

    public toSSML(pretty = false) {
        const root = create();
        const speak = root.ele('speak');
        speak.att('version', this.version);
        speak.att("xml:lang", this.language);
        speak.att("xmlns", this.xmlns);
        switch(this.provider) {
            case Providers.Aliyun:
                const voice = this.find("voice") as Voice;
                let prosody, backgroundAudio;
                if(voice) {
                    prosody = (voice.find("prosody") || this.find("prosody")) as Prosody;
                    backgroundAudio = (voice.find("backgroundaudio") || this.find("backgroundaudio")) as BackgroundAudio;
                    speak.att("voice", voice.name);
                }
                speak.att("encodeType", this.format);
                this.sampleRate && speak.att("sampleRate", this.sampleRate);
                this.effect && speak.att("effect", this.effect);
                this.effectValue && speak.att("effectValue", this.effectValue);
                if(prosody) {
                    if(prosody.rate) {
                        const rate = prosody.rate * 500 - 500;
                        speak.att("rate", (rate > 500 ? 500 : rate).toString());
                    }
                    if(prosody.pitch) {
                        const pitch = prosody.pitch * 500 - 500;
                        speak.att("pitch", (pitch > 500 ? 500 : pitch).toString());
                    }
                    prosody.volume && speak.att("volume", parseInt((prosody.volume / 2).toString()).toString());
                }
                if(backgroundAudio) {
                    speak.att("bgm", backgroundAudio.src);
                    backgroundAudio.volume && speak.att("volume", parseInt((backgroundAudio.volume * 100 / 2).toString()).toString());
                }
            break;
            case Providers.Microsoft:
                speak.att("xmlns:mstts", "https://www.w3.org/2001/mstts");
            break;
        }
        this.children.forEach(node => node.render(speak, this.provider));
        return speak.end({ prettyPrint: pretty, headless: true });
    }

    public static parse(content: any) {
        if (!util.isString(content) && !util.isObject(content)) throw new TypeError('content must be an string or object');
        if (util.isObject(content)) return new Document(content);
        if (!/\<speak/.test(content)) return new Document(JSON.parse(content));
        let xmlObject: any;
        xmlParser.parse(content).forEach((o: any) => {
            if (o.speak) xmlObject = o;
        });
        if (!xmlObject) throw new Error('document ssml invalid');
        function parse(obj: any, target: any = {}) {
            const type = Object.keys(obj)[0];
            target.type = type;
            for (let key in obj[':@'])
                target[key] = obj[':@'][key];
            target.children = [];
            obj[type].forEach((v: any) => {
                if (v['#text']) return target.children.push({ type: "raw", value: v['#text'] });
                const result = parse(v, {});
                result && target.children.push(result);
            });
            return target;
        }
        return new Document(parse(xmlObject));
    }

}

export default Document;