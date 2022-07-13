import { create } from 'xmlbuilder2';

import IDocumentOptions from './interface/IDocumentOptions';
import IElementOptions from './elements/interface/IElementOptions';

import ElementFactory from './ElementFactory';
import CorrectMap from './CorrectMap';
import { BackgroundAudio, Element, Prosody, Voice } from './elements';
import Providers from './enums/Providers';
import Parser from './Parser';
import util from './util';

class Document {
    public static Provider = Providers;

    public static readonly type = 'document'; // type标识
    public type = ''; // 文档type必须为document
    public provider = Providers.Aggregation;  //服务提供商
    public realProvider?: Providers;  //服务真实提供商
    public solution?: string;  //虚拟人形象
    public version = '';  //文档版本
    public language = '';  //根文档语言
    public xmlns = '';  //文档URI
    public effect?: string;  //发音效果器
    public effectValue?: string;  //发音效果器值
    public format = '';  //发音音频文件格式
    public sampleRate?: string;  //发音音频采样率
    public children: Element[] = [];  //文档子元素
    private correctMap?: any;  //文档时间轴纠正映射

    constructor(options: IDocumentOptions, correctMap?: any) {
        if (!util.isObject(options)) throw new TypeError('options must be an object');
        util.optionsInject(this, options, {
            type: () => 'document',
            provider: (v: any) => util.defaultTo(v, Providers.Aliyun),
            realProvider: (v: any) => !util.isUndefined(v) ? v as Providers : v,
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
            realProvider: (v: any) => util.isUndefined(v) || Object.values(Providers).includes(v),
            solution: (v: any) => util.isUndefined(v) || util.isString(v),
            version: (v: any) => util.isString(v),
            language: (v: any) => util.isString(v),
            xmlns: (v: any) => util.isString(v),
            format: (v: any) => util.isString(v),
            effect: (v: any) => util.isUndefined(v) || util.isString(v),
            sampleRate: (v: any) => util.isUndefined(v) || util.isString(v),
            children: (v: any) => util.isArray(v)
        });
        this.correctMap = correctMap;
    }

    public find(key: string) {
        for (let node of this.children) {
            if (node.type === key)
                return node;
            const foundNode = node.find(key);
            if(foundNode) return foundNode;
        }
        return null;
    }

    public appendChild(node: Element) {
        if (!Element.isInstance(node))
            throw new TypeError('node must be an Element instance');
        node.parent = this;
        this.children.push(node);
    }

    public toText() {
        return this.children.reduce((result, node) => result + node.toText(), "");
    }

    public toTimeline(baseTime = 0) {
        const timeline: any[] = [];
        this.children.forEach(node => node.toTimeline(timeline, baseTime, this.provider, this.declaimer, this.speechRate, util.merge(CorrectMap, this.correctMap || {})));
        const exportTimeline = timeline[0] && timeline[0].text ? timeline : timeline.slice(1);
        if (exportTimeline[0])
            exportTimeline[exportTimeline.length - 1].endTime += 500;
        return exportTimeline;
    }

    public toSSML(pretty = false) {
        const speak = create().ele('speak');
        speak.att('version', this.version);
        speak.att("xml:lang", this.language);
        speak.att("xmlns", this.xmlns);
        switch (this.provider) {
            case Providers.Aggregation:
                speak.att('provider', this.realProvider || this.provider);  //使用真实的提供商
                this.solution && speak.att('solution', this.solution);
                speak.att("format", this.format);
                this.sampleRate && speak.att("sampleRate", this.sampleRate);
                this.effect && speak.att("effect", this.effect);
                this.effectValue && speak.att("effectValue", this.effectValue);
                break;
            case Providers.Aliyun:
                const voice = this.find("voice") as Voice;
                let prosody, backgroundAudio;
                if (voice) {
                    prosody = (voice.find("prosody") || this.find("prosody")) as Prosody;
                    backgroundAudio = (voice.find("backgroundaudio") || this.find("backgroundaudio")) as BackgroundAudio;
                    voice.name && speak.att("voice", voice.name);
                }
                speak.att("encodeType", this.format);
                this.sampleRate && speak.att("sampleRate", this.sampleRate);
                this.effect && speak.att("effect", this.effect);
                this.effectValue && speak.att("effectValue", this.effectValue);
                if (prosody) {
                    if (!util.isUndefined(prosody.rate)) {
                        const rate = prosody.rate * 500 - 500;
                        speak.att("rate", (rate > 500 ? 500 : rate).toString());
                    }
                    if (!util.isUndefined(prosody.pitch)) {
                        const pitch = prosody.pitch * 500 - 500;
                        speak.att("pitch", (pitch > 500 ? 500 : pitch).toString());
                    }
                    !util.isUndefined(prosody.volume) && speak.att("volume", parseInt((prosody.volume / 2).toString()).toString());
                }
                if (backgroundAudio) {
                    speak.att("bgm", backgroundAudio.src);
                    !util.isUndefined(backgroundAudio.volume) && speak.att("volume", parseInt((backgroundAudio.volume * 100 / 2).toString()).toString());
                }
                break;
            case Providers.Microsoft:
                speak.att("xmlns:mstts", "https://www.w3.org/2001/mstts");
                break;
        }
        this.children.forEach(node => node.render(speak, this.provider));
        return speak.end({ prettyPrint: pretty, headless: true }).replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    }

    public static parse = Parser.parse.bind(Parser);

    get declaimer() {
        const voice = this.find("voice") as Voice;
        return voice ? voice.name || "" : "";
    }

    get volume() {
        const prosody = this.find("prosody") as Prosody;
        if (!prosody) return 100;
        return prosody.volume !== undefined ? prosody.volume : 100;
    }

    get speechRate() {
        const prosody = this.find("prosody") as Prosody;
        if (!prosody) return 1;
        return prosody.rate !== undefined ? prosody.rate : 1;
    }

    get duration() {
        const timeline = this.toTimeline();
        return timeline[timeline.length - 1] ? timeline[timeline.length - 1].endTime : 0;
    }

}

export default Document;