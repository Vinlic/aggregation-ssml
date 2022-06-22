import ISilenceOptions from './interface/ISilenceOptions';

import ElementTypes from '../enums/ElementTypes';
import Providers from '../enums/Providers';

import Element from './Element';
import util from '../util';

class Silence extends Element {

    public __type = '';  //指定静音位置
    public __value = '';  //暂停的绝对持续时间

    constructor(options: ISilenceOptions = {}, type = ElementTypes.Silence) {
        super(options, type);
        util.optionsInject(this, options, {}, {
            __type: (v: any) => util.isString(v),
            __value: (v: any) => util.isString(v)
        });
    }

    render(parent: any, provider: Providers) {
        const element = super.render(parent, provider);
        switch (provider) {
            case Providers.Aggregation:
            case Providers.Microsoft:
                element.att("type", this.__type);
                element.att("value", this.__value);
                break;
        }
        return element;
    }

}

export default Silence;