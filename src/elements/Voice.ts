import IVoiceOptions from './interface/IVoiceOptions';

import ElementTypes from '../enums/ElementTypes';
import Providers from '../enums/Providers';

import Element from './Element';
import util from '../util';

class Voice extends Element {

    public name = '';  //发音人模型
    public gender?: string;  //发音人性别
    public age?: number;  //发音人年龄
    public variant?: string;  //语音特征值
    public language?: string;  //发音语言列表

    constructor(options: IVoiceOptions, type = ElementTypes.Voice) {
        super(options, type);
        options.gender = options.gender || options["xml:gender"];
        options.language = options.language || options["xml:lang"];
        util.optionsInject(this, options, {
            age: (v: any) => !util.isUndefined(v) ? Number(v) : v
        }, {
            name: (v: any) => util.isString(v),
            gender: (v: any) => util.isUndefined(v) || util.isString(v),
            age: (v: any) => util.isUndefined(v) || util.isFinite(v),
            variant: (v: any) => util.isUndefined(v) || util.isString(v),
            language: (v: any) => util.isUndefined(v) || util.isString(v)
        });
    }

    render(parent: any, provider: Providers) {
        const element = super.render(parent, provider);
        switch (provider) {
            case Providers.Microsoft:
                element.att("name", this.name);
                element.att("age", this.age);
                element.att("variant", this.variant);
                element.att("xml:gender", this.gender);
                element.att("xml:lang", this.language);
                break;
        }
        return element;
    }

}

export default Voice;