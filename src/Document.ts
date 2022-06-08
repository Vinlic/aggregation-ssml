import { create } from 'xmlbuilder2';
import { XMLParser } from 'fast-xml-parser';

import Element from './elements/Element';
import Providers from './enums/Providers';
import util from './util';

class Document {

    public static readonly type = 'document'; // type标识
    public type = ''; // 文档type必须为document
    public provider = '';  //服务提供商
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
            version: (v: any) => util.defaultTo(v, '1.0'),
            language: (v: any) => util.defaultTo(v, 'zh-cn'),
            xmlns: (v: any) => util.defaultTo(v, 'http://www.w3.org/2001/10/synthesis'),
            format: (v: any) => util.defaultTo(v, 'mp3')
        }, {
            provider: (v: any) => Object.values(Providers).includes(v),
            version: (v: any) => util.isString(v),
            language: (v: any) => util.isString(v),
            xmlns: (v: any) => util.isString(v),
            format: (v: any) => util.isString(v),
            effect: (v: any) => util.isUndefined(v) || util.isString(v),
            sampleRate: (v: any) => util.isUndefined(v) || util.isString(v)
        });
    }

    find(path: string) {
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

    toSSML(pretty = false) {
        const root = create();
        const speak = root.ele('speak');
        speak.att('version', this.version);
        speak.att("xml:lang", this.language);
        speak.att("xmlns", this.xmlns);
        switch(this.provider) {
            case Providers.Aliyun:
                
            break;
            case Providers.Microsoft:
                
            break;
        }
        return speak.end({ prettyPrint: pretty, headless: true });
    }

}

export default Document;