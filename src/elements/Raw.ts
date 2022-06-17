import IElementOptions from './interface/IElementOptions';

import ElementTypes from '../enums/ElementTypes';
import Providers from '../enums/Providers';

import Element from './Element';

class Raw extends Element {

    constructor(options: IElementOptions = {}, type = ElementTypes.Raw) {
        super(options, type);
    }

    render(parent: any, provider: Providers) {
        return super.render(parent, provider);
    }

    toText() {
        return this.value || "";
    }

}

export default Raw;