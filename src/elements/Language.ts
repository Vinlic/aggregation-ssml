import ILanguageOptions from './interface/ILanguageOptions';

import ElementTypes from '../enums/ElementTypes';
import Providers from '../enums/Providers';

import Element from './Element';
import util from '../util';

class Language extends Element {

    public language = '';  //指定发音语言

    constructor(options: ILanguageOptions, type = ElementTypes.Language) {
        super(options, type);
        util.optionsInject(this, options, {}, {
            language: (v: any) => util.isString(v)
        });
    }

    render(parent: any, provider: Providers) {
        const element = super.render(parent, provider);
        switch(provider) {
            case Providers.Microsoft:
                element.att("xml:lang", this.language);
            break;
        }
        return element;
    }

}

export default Language;