import ISubsituteOptions from './interface/ISubsituteOptions';

import ElementTypes from '../enums/ElementTypes';
import Providers from '../enums/Providers';

import Element from './Element';
import util from '../util';

class Subsitute extends Element {

    public alias = '';  //文本替换别名

    constructor(options: ISubsituteOptions = {}, type = ElementTypes.Subsitute) {
        super(options, type);
        util.optionsInject(this, options, {}, {
            alias: (v: any) => util.isString(v)
        });
    }

    render(parent: any, provider: Providers) {
        const element = super.render(parent, provider);
        element.att("alias", this.alias);
        return element;
    }

}

export default Subsitute;