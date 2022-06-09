import { create } from 'xmlbuilder2';
import { XMLParser } from 'fast-xml-parser';

import IElementOptions from './elements/interface/IElementOptions';

import ElementFactory from './ElementFactory';
import Element from './elements/Element';
import Providers from './enums/Providers';
import util from './util';

class Document {

    public static readonly type = 'document'; // type标识
    public type = ''; // 文档type必须为document
    public provider = Providers.Unknown;  //服务提供商
    public version = '';  //文档版本
    public language = '';  //根文档语言
    public xmlns = '';  //文档URI
    public effect?: string;  //发音效果器
    public effectValue?: string;  //发音效果器值
    public format?: string;  //发音音频文件格式
    public sampleRate?: string;  //发音音频采样率
    public children: Element[] = [];  //文档子元素

    constructor(options = {}) {
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

    public find(path: string) {
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
        this.children.forEach(node => node.render(speak, this.provider));
        return speak.end({ prettyPrint: pretty, headless: true });
    }

    public static parse(content: any) {
        if (!util.isString(content) && !util.isObject(content)) throw new TypeError('content must be an string or object');
        if (util.isObject(content)) return new Document(content);
        if (!/\<speak/.test(content)) return JSON.parse(content);
        
    }

}

export default Document;