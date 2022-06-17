import IExpressAsOptions from './interface/IExpressAsOptions';

import ElementTypes from '../enums/ElementTypes';
import Providers from '../enums/Providers';

import Element from './Element';
import util from '../util';

class ExpressAs extends Element {

    public style = '';  //讲话风格
    public styledegree?: number;  //讲话风格强度
    public role?: string;  //讲话角色

    constructor(options: IExpressAsOptions = {}, type = ElementTypes.ExpressAs) {
        super(options, type);
        util.optionsInject(this, options, {
            styledegree: (v: any) => !util.isUndefined(v) ? Number(v) : v
        }, {
            style: (v: any) => util.isString(v),
            styledegree: (v: any) => util.isUndefined(v) || util.isFinite(v),
            role: (v: any) => util.isUndefined(v) || util.isString(v)
        });
    }

    render(parent: any, provider: Providers) {
        const element = super.render(parent, provider);
        switch(provider) {
            case Providers.Aggregation:
            case Providers.Microsoft:
                element.att("style", this.style);
                element.att("styledegree", this.styledegree);
                element.att("role", this.role);
            break;
        }
        return element;
    }

}

export default ExpressAs;