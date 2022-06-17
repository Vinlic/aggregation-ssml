import ISentenceOptions from './interface/ISentenceOptions';

import ElementTypes from '../enums/ElementTypes';
import Providers from '../enums/Providers';

import Element from './Element';

class Sentence extends Element {

    constructor(options: ISentenceOptions = {}, type = ElementTypes.Sentence) {
        super(options, type);
    }

    render(parent: any, provider: Providers) {
        return super.render(parent, provider);
    }

}

export default Sentence;