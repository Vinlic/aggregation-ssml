import { XMLParser } from 'fast-xml-parser';

import Document from './Document';
import ElementFactory from './ElementFactory';
import Providers from './enums/Providers';
import util from './util';

const xmlParser = new XMLParser({
    allowBooleanAttributes: true, //需要解析布尔值属性
    ignoreAttributes: false, //不要忽略属性
    attributeNamePrefix: '', //属性名称不拼接前缀
    preserveOrder: true, //保持原始文档标签顺序
    parseTagValue: false //不解析标签内值
});

class Parser {

    public static parse(content: any, provider?: Providers, correctMap?: any) {
        if (!util.isString(content) && !util.isObject(content)) throw new TypeError('content must be an string or object');
        if (util.isObject(content)) return new Document(content, correctMap);
        if (/^\{/.test(content)) return new Document(JSON.parse(content), correctMap);
        let xmlObject: any;
        xmlParser.parse(content).forEach((o: any) => {
            if (o.speak) xmlObject = o;
        });
        if (!xmlObject) throw new Error('root tag not found');
        const options = this.convertXMLObject(xmlObject);
        provider && (options.provider = provider);
        return new Document(options, correctMap);
    }

    public static parseElement(content: string) {
        const xmlObject = xmlParser.parse(content)[0];
        if (!xmlObject) throw new Error('root tag not found');
        const options = this.convertXMLObject(xmlObject);
        return ElementFactory.createElement(options);
    }

    private static convertXMLObject(obj: any, target: any = {}) {
        const type = Object.keys(obj)[0];
        target.type = type;
        for (let key in obj[':@']) {
            const targetKey = {
                type: "__type",
                value: "__value"
            }[key] || key;
            target[targetKey] = obj[':@'][key];
        }
        target.children = [];
        obj[type].forEach((v: any) => {
            if (v['#text']) return target.children.push({ type: "raw", value: v['#text'] });
            const result = this.convertXMLObject(v, {});
            result && target.children.push(result);
        });
        return target;
    }    

}

export default Parser;