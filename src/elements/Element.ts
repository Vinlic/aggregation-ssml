import IElementOptions from './interface/IElementOptions';

import ElementTypes from '../enums/ElementTypes';
import Providers from '../enums/Providers';

import ElementFactory from '../ElementFactory';
import TagNameMap from '../TagNameMap';
import Document from '../Document';
import util from '../util';

class Element {
    public static Type = ElementTypes;

    public type: ElementTypes = ElementTypes.Element; //元素类型
    public tagName = 'element';  //元素标签名称
    public value?: string;  //元素节点值
    public parent?: Document | Element;  //父级指针
    public children: Element[] = [];  //元素子节点

    constructor(options: IElementOptions, type = ElementTypes.Element) {
        if(!util.isObject(options)) throw new TypeError('options must be an object');
        util.optionsInject(this, options, {
            type: (v: any) => util.defaultTo(v, type),
            children: (datas: IElementOptions[]) =>
                util.isArray(datas)
                    ? datas.map(options => {
                        const node = Element.isInstance(options) ? options as Element : ElementFactory.createElement(options);
                        node.parent = this;
                        return node;
                    })
                    : [], //实例化子节点
        }, {
            type: (v: any) => util.isString(v),
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
        if(!tagName) return parent;
        const element = parent.ele(tagName);
        this.children.forEach(node => {
            if(util.isString(node))
                element.txt(node);
            else
                node.render(element, provider);
        });
        return element;
    }

    public static isInstance(value: any) {
        return value instanceof Element;
    }

}

export default Element;