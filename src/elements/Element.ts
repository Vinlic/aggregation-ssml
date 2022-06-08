import ElementTypes from '../enums/ElementTypes';
import Document from '../Document';
import util from '../util';

class Element {
    public static Type = ElementTypes;

    public type: ElementTypes = ElementTypes.Element; //元素类型
    public tagName?: string;  //元素节点名称
    public value?: string;  //元素节点值
    public parent?: Document | Element;  //父级指针
    public children: Element[] = [];  //元素子节点

    

}

export default Element;