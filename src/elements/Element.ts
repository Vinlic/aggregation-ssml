import IElementOptions from './interface/IElementOptions';

import ElementTypes from '../enums/ElementTypes';
import Providers from '../enums/Providers';

import ElementFactory from '../ElementFactory';
import TagNameMap from '../TagNameMap';
import CorrectMap from '../CorrectMap';
import Document from '../Document';
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

    public find(key: string) {
        for(let node of this.children) {
            if(node.type === key)
                return node;
            node.find(key);
        }
        return null;
    }

    public appendChild(node: Element) {
        if (!Element.isInstance(node))
            throw new TypeError('node must be an Element instance');
        node.parent = this;
        this.children.push(node);
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
            const temp = value.substring(searchIndex, foundIndex);
            temp && texts.push(temp);  //切分文本内容
            searchIndex = foundIndex + 1;
        }
        return texts;
    }

    public parseTextDuration(text: string, provider: Providers, declaimer: string, speechRate: number, correctMap: any = {}) {
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
        correctMap = util.merge(CorrectMap, correctMap);
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
                        text,
                        startTime: currentTime,
                        endTime: currentTime + textDuration
                    });
                    currentTime += textDuration + pauseDuration;
                });
            }
            else
                node.toTimeline(timeline, baseTime, provider, declaimer, speechRate);
        });
        return timeline;
    }

    public static isInstance(value: any) {
        return value instanceof Element;
    }

    public set parent(obj: Document | Element | undefined) {
        this.#parent = obj;
    }

    public get parent() {
        return this.#parent;
    }

}

export default Element;