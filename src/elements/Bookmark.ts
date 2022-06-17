import IBookmarkOptions from './interface/IBookmarkOptions';

import ElementTypes from '../enums/ElementTypes';
import Providers from '../enums/Providers';

import Element from './Element';
import util from '../util';

class Bookmark extends Element {

    public mark = '';  //引用文本

    constructor(options: IBookmarkOptions, type = ElementTypes.Bookmark) {
        super(options, type);
        util.optionsInject(this, options, {}, {
            mark: (v: any) => util.isString(v)
        });
    }

    render(parent: any, provider: Providers) {
        const element = super.render(parent, provider);
        switch(provider) {
            case Providers.Aggregation:
            case Providers.Microsoft:
                element.att("mark", this.mark);
            break;
        }
        return element;
    }

}

export default Bookmark;