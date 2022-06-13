import IElementOptions from './interface/IElementOptions';

import ElementTypes from '../enums/ElementTypes';
import Providers from '../enums/Providers';

import ElementFactory from '../ElementFactory';
import TagNameMap from '../TagNameMap';
import Document from '../Document';
import { Break } from '../elements';
import util from '../util';

class Element {
    public static Type = ElementTypes;

    public type: ElementTypes = ElementTypes.Element; //元素类型
    public value?: string;  //元素节点值
    public children: Element[] = [];  //元素子节点
    #parent?: Document | Element;  //父级指针

    constructor(options: IElementOptions, type = ElementTypes.Element) {
        if(!util.isObject(options)) throw new TypeError('options must be an object');
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

    public find(path: string) {
        const keys = path.split(".");
        let that: Element | undefined = this;
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

    public render(parent: any, provider: Providers) {
        const tagName = TagNameMap[provider] ? TagNameMap[provider][this.type] : null;
        const element = tagName ? parent.ele(tagName) : parent;
        this.value && element.txt(this.value);
        this.children.forEach(node => node.render(element, provider));
        return element;
    }

    public toText(): string {
        return this.children.reduce((result, node) => result + node.toText(), "");
    }

    public toTimeline(baseTime = 0, provider: Providers, declaimer: string, speechRate: number): any {
        let timeline: any = [];
        this.children.forEach((node: any) => {
            if(node.type === ElementTypes.Break)
                baseTime += node.duration;
            const result = node.toTimeline(baseTime, provider, declaimer, speechRate);
            if(!result) return;
            const { timeline: _timeline, duration } = result;
            if(_timeline.length === 1)
                timeline.push(_timeline[0]);
            else
                timeline = timeline.concat(_timeline);
            baseTime += duration;
        });
        return {
            timeline,
            duration: baseTime
        };
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