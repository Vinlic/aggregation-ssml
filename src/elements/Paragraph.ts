import IParagraphOptions from './interface/IParagraphOptions';

import ElementTypes from '../enums/ElementTypes';
import Providers from '../enums/Providers';

import Element from './Element';

class Paragraph extends Element {

    constructor(options: IParagraphOptions = {}, type = ElementTypes.Paragraph) {
        super(options, type);
    }

    render(parent: any, provider: Providers) {
        return super.render(parent, provider);
    }

}

export default Paragraph;