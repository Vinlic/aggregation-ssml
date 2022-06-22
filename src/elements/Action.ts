import IActionOptions from './interface/IActionOptions';

import ElementTypes from '../enums/ElementTypes';
import Providers from '../enums/Providers';

import Element from './Element';
import util from '../util';

class Action extends Element {

    public __type = '';  //动作类型

    constructor(options: IActionOptions = {}, type = ElementTypes.Action) {
        super(options, type);
        util.optionsInject(this, options, {}, {
            __type: (v: any) => util.isString(v)
        });
    }

    render(parent: any, provider: Providers) {
        const element = super.render(parent, provider);
        element.att("type", this.__type);
        return element;
    }

    get duration() {
        return {
            // 待补充时长
        }[this.__type] || 5000;
    }

}

export default Action;