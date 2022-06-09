import ILexiconOptions from './interface/ILexiconOptions';

import ElementTypes from '../enums/ElementTypes';
import Providers from '../enums/Providers';

import Element from './Element';
import util from '../util';

class Lexicon extends Element {

    public uri = '';  //外部PLS文档地址

    constructor(options: ILexiconOptions, type = ElementTypes.Lexicon) {
        super(options, type);
        util.optionsInject(this, options, {}, {
            uri: (v: any) => util.isString(v)
        });
    }

    render(parent: any, provider: Providers) {
        const element = super.render(parent, provider);
        element.att("uri", this.uri);
        return element;
    }

}

export default Lexicon;