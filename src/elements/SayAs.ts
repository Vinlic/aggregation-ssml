import ISayAsOptions from './interface/ISayAsOptions';

import ElementTypes from '../enums/ElementTypes';
import Providers from '../enums/Providers';

import Element from './Element';
import util from '../util';

class SayAs extends Element {

    public interpretAs = '';  //文本内容类型
    public format?: string;  //文本指定格式
    public detail?: string;  //朗读的详细信息级别

    constructor(options: ISayAsOptions, type = ElementTypes.SayAs) {
        super(options, type);
        options.interpretAs = options.interpretAs || options["interpret-as"];
        util.optionsInject(this, options, {}, {
            interpretAs: (v: any) => util.isString(v),
            format: (v: any) => util.isUndefined(v) || util.isString(v),
            detail: (v: any) => util.isUndefined(v) || util.isString(v)
        });
    }

    render(parent: any, provider: Providers) {
        const element = super.render(parent, provider);
        switch(provider) {
            case Providers.Aliyun:
                element.att("interpret-as", this.interpretAs);
            break;
            case Providers.Microsoft:
                element.att("interpret-as", {
                    digits: "number_digit"
                }[this.interpretAs] || this.interpretAs);
                element.att("format", this.format);
                element.att("detail", this.detail);
            break;
            case Providers.YunXiaoWei:
                element.att("interpret-as", this.interpretAs);
                element.att("format", this.format);
            break;
            default:
                element.att("interpret-as", this.interpretAs);
        }
        return element;
    }

}

export default SayAs;