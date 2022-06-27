import IElementOptions from './interface/IElementOptions';

import ElementTypes from '../enums/ElementTypes';
import Providers from '../enums/Providers';

import ElementFactory from '../ElementFactory';
import TagNameMap from '../TagNameMap';
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

    public parseTextDuration(text: string, provider: Providers, declaimer: string, speechRate: number) {
        const factor = 2 - speechRate;
        let textDuration = 0;
        const chars = text.split("");
        let halfCharDuration = 0, fullCharDuration = 0, splitSymbolDuration = 0;
        switch (provider) {
            case Providers.Aliyun:
                halfCharDuration = 100;
                fullCharDuration = 220;
                break;
            case Providers.Microsoft:
                halfCharDuration = 80;
                fullCharDuration = 180;
            default:
                halfCharDuration = 100;
                fullCharDuration = 200;
        }
        chars.forEach(char => {
            if (char === "%" || char === "。")
                textDuration += fullCharDuration * 3;
            else if (splitSymbols.indexOf(char) !== -1)
                textDuration += halfCharDuration;
            else
                textDuration += fullCharDuration;
        });
        return textDuration * factor;
    }

    public toText(): string {
        return this.children.reduce((result, node) => result + node.toText(), "");
    }

    public toTimeline(timeline: any[], baseTime = 0, provider: Providers, declaimer: string, speechRate: number): any {
        this.children.forEach((node: any) => {
            const latestIndex = timeline.length ? timeline.length - 1 : 0;
            if ([ElementTypes.Break, ElementTypes.Action].includes(node.type)) {
                if (!timeline[latestIndex])
                    timeline[latestIndex] = { text: "", startTime: baseTime + node.duration, endTime: baseTime };
                else {
                    timeline[latestIndex].incomplete = true;
                    timeline[latestIndex].endTime += node.duration;
                }
            }
            else if (node.type === ElementTypes.Raw) {
                if (!node.value) return;
                let texts = this.splitText(node.value.replace(/\n/g, ""));
                if (!timeline[latestIndex])
                    timeline[latestIndex] = { text: "", startTime: baseTime, endTime: baseTime };
                if (texts.length === 1 || timeline[latestIndex].incomplete) {
                    timeline[latestIndex].incomplete && delete timeline[latestIndex].incomplete;
                    timeline[latestIndex].text += texts[0];
                    timeline[latestIndex].endTime += this.parseTextDuration(texts[0], provider, declaimer, speechRate);
                    texts = texts.slice(1);
                }
                let currentTime = timeline[latestIndex].endTime;
                texts.forEach(text => {
                    const duration = this.parseTextDuration(text, provider, declaimer, speechRate);
                    timeline.push({
                        text,
                        startTime: currentTime,
                        endTime: currentTime + duration
                    });
                    currentTime += duration;
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