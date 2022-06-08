import IElementOptions from './interface/IElementOptions';

import ElementTypes from '../enums/ElementTypes';

import ElementFactory from '../ElementFactory';
import Document from '../Document';
import util from '../util';

class Element {
    public static Type = ElementTypes;

    public static tagName = "element";  //元素节点名称

    public type: ElementTypes = ElementTypes.Element; //元素类型
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

    public render(parent?: any) {
        this.children.forEach(element => element.render(parent));
    }

    public static isInstance(value: any) {
        return value instanceof Element;
    }

}

export default Element;