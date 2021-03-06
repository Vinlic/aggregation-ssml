import { create } from 'xmlbuilder2';

import IElementOptions from './interface/IElementOptions';

import ElementTypes from '../enums/ElementTypes';
import Providers from '../enums/Providers';

import ElementFactory from '../ElementFactory';
import TagNameMap from '../TagNameMap';
import Document from '../Document';
import Parser from '../Parser';
import util from '../util';

const splitSymbols = [",", "，", "。", "!", "！", ";", "；", ":", "："];

class Element {
    public static Type = ElementTypes;

    public type: ElementTypes = ElementTypes.Element; //元素类型
    public value?: string;  //元素节点值
    public children: Element[] = [];  //元素子节点
    #parent?: Document | Element;  //父级指针

    constructor(options: IElementOptions = {}, type = ElementTypes.Element) {
        if (!util.isObject(options)) throw new TypeError('options must be an object');
        this.type = type;
        util.optionsInject(this, options, {
            children: (datas: IElementOptions[]) =>
                util.isArray(datas)
                    ? datas.map(options => {
                        const node = Element.isInstance(options) ? options as Element : ElementFactory.createElement(options);
                        node.parent = this;
                        return node;
                    })
                    : [], //实例化子节点
        }, {
            value: (v: any) => util.isUndefined(v) || util.isString(v),
            children: (v: any) => util.isArray(v)
        });
    }

    public find(key: string): Element | null {
        for(let node of this.children) {
            if(node.type === key)
                return node;
            const foundNode = node.find(key);
            if(foundNode) return foundNode;
        }
        return null;
    }

    public appendChild(node: Element) {
        if (!Element.isInstance(node))
            throw new TypeError('node must be an Element instance');
        (node as Element).parent = this;
        this.children.push(node as Element);
    }

    public render(parent: any, provider: Providers) {
        const tagName = TagNameMap[provider] ? TagNameMap[provider][this.type] : null;
        const element = tagName ? parent.ele(tagName) : parent;
        this.value && element.txt(this.value);
        this.children.forEach(node => node.render(element, provider));
        return element;
    }

    splitText(value: string) {
        const texts = [];
        let searchIndex = 0;
        let foundIndex = 0;
        while (foundIndex !== Infinity) {
            foundIndex = Math.min(...(splitSymbols.map(symbol => {
                const index = value.indexOf(symbol, searchIndex);
                if (index === -1) return Infinity;
                return index;
            })));  //寻找距离最近的切分符号
            const temp = value.substring(searchIndex, foundIndex + 1);
            temp && texts.push(temp);  //切分文本内容
            searchIndex = foundIndex + 1;
        }
        return texts;
    }

    public parseTextDuration(text: string, provider: Providers, declaimer: string, speechRate: number, correctMap?: any) {
        const factor = 2 - speechRate;
        const chars = text.split("");
        let textDuration = 0, halfCharDuration = 0, fullCharDuration = 0, bigCharDuration = 0, pauseDuration = 0;
        const correctObject = correctMap[provider];
        if(!correctObject || (!correctObject.default && !correctObject[declaimer])) {
            halfCharDuration = 100;
            fullCharDuration = 200;
            bigCharDuration = fullCharDuration * 3;
        }
        else
            ({ halfCharDuration, fullCharDuration, bigCharDuration } = (correctObject[declaimer] || correctObject.default));
        chars.forEach((char, index) => {
            let duration;
            if (char === "%" || char === "。")
                duration = bigCharDuration;
            else if (splitSymbols.indexOf(char) !== -1)
                duration = halfCharDuration;
            else
                duration = fullCharDuration;
            if(index === chars.length - 1)
                return pauseDuration = duration;
            textDuration += duration;
        });
        return {
            textDuration: textDuration * factor,
            pauseDuration: pauseDuration * factor
        };
    }

    public toText(): string {
        return this.children.reduce((result, node) => result + node.toText(), "");
    }

    public toTimeline(timeline: any[], baseTime = 0, provider: Providers, declaimer: string, speechRate: number, correctMap?: any): any {
        let offsetDuration = 0;
        this.children.forEach((node: any) => {
            const latestIndex = timeline.length ? timeline.length - 1 : 0;
            if ([ElementTypes.Break, ElementTypes.Action].includes(node.type))
                offsetDuration = node.duration;
            else if (node.type === ElementTypes.Raw) {
                if (!node.value) return;
                let texts = this.splitText(node.value.replace(/\n/g, ""));
                if (!timeline[latestIndex])
                    timeline[latestIndex] = { text: "", startTime: baseTime, endTime: baseTime };
                let currentTime = timeline[latestIndex].endTime + offsetDuration;
                offsetDuration = 0;
                texts.forEach(text => {
                    const { textDuration, pauseDuration } = this.parseTextDuration(text, provider, declaimer, speechRate, correctMap);
                    timeline.push({
                        text: text.substring(0, text.length - 1),
                        startTime: currentTime,
                        endTime: currentTime + textDuration
                    });
                    currentTime += textDuration + pauseDuration;
                });
            }
            else
                node.toTimeline(timeline, baseTime, provider, declaimer, speechRate, correctMap);
        });
        return timeline;
    }

    public static isInstance(value: any) {
        return value instanceof Element;
    }

    public static parse = Parser.parseElement.bind(Parser);

    public toSSML(provider: Providers, pretty = false) {
        const tagName = TagNameMap[provider] ? TagNameMap[provider][this.type] : null;
        const element = create().ele(tagName || "raw");
        this.children.forEach(node => node.render(element, provider));
        const ssml = element.end({ prettyPrint: pretty, headless: true }).replace(/&lt;/g, "<").replace(/&gt;/g, ">");
        if(!tagName)
            return ssml.replace(/^<raw>/, "").replace(/<\/raw>$/, "");
        return ssml;
    }

    public set parent(obj: Document | Element | undefined) {
        this.#parent = obj;
    }

    public get parent() {
        return this.#parent;
    }

}

export default Element;