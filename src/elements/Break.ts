import IBreakOptions from './interface/IBreakOptions';

import ElementTypes from '../enums/ElementTypes';
import Providers from '../enums/Providers';

import Element from './Element';
import util from '../util';

class Break extends Element {

    public strength?: string;  //指定暂停的相对持续时间
    public time = '';  //指定暂停的绝对持续时间

    constructor(options: IBreakOptions = {}, type = ElementTypes.Break) {
        super(options, type);
        util.optionsInject(this, options, {
            strength: (v: any) => !util.isUndefined(v) ? v.toString() : v,
            time: (v: any) => !util.isUndefined(v) ? v.toString() : v,
        }, {
            strength: (v: any) => util.isUndefined(v) || util.isString(v),
            time: (v: any) => util.isString(v)
        });
    }

    render(parent: any, provider: Providers) {
        if(provider !== Providers.Aggregation)
            this.children = [];  //非聚合服务商则清除子元素
        const element = super.render(parent, provider);
        element.att("time", this.time);
        switch(provider) {
            case Providers.Aggregation:
            case Providers.Aliyun:
            case Providers.YunXiaoWei:
                element.att("strength", this.strength);
            break;
        }
        return element;
    }

    get duration() {
        return util.timeStringToMilliseconds(this.time);
    }

}

export default Break;