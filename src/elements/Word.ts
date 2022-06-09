import IWordOptions from './interface/IWordOptions';

import ElementTypes from '../enums/ElementTypes';
import Providers from '../enums/Providers';

import Element from './Element';

class Word extends Element {

    constructor(options: IWordOptions, type = ElementTypes.Word) {
        super(options, type);
    }

    render(parent: any, provider: Providers) {
        return super.render(parent, provider);
    }

}

export default Word;