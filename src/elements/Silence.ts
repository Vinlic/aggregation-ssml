import ISilenceOptions from './interface/ISilenceOptions';

import ElementTypes from '../enums/ElementTypes';
import Providers from '../enums/Providers';

import Element from './Element';
import util from '../util';

class Silence extends Element {

    public _type = '';  //指定静音位置
    public _value = '';  //暂停的绝对持续时间

    constructor(options: ISilenceOptions, type = ElementTypes.Silence) {
        super(options, type);
        options._type = options.type;
        options._value = options.value;
        util.optionsInject(this, options, {}, {
            _type: (v: any) => util.isString(v),
            _value: (v: any) => util.isString(v)
        });
    }

    render(parent: any, provider: Providers) {
        const element = super.render(parent, provider);
        element.att("type", this._type);
        element.att("value", this._value);
        return element;
    }

}

export default Silence;