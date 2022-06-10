import IProsodyOptions from './interface/IProsodyOptions';

import ElementTypes from '../enums/ElementTypes';
import Providers from '../enums/Providers';

import Element from './Element';
import util from '../util';

class Prosody extends Element {

    public pitch?: number;  //语音音高
    public contour?: string;  //语音调型
    public range?: string;  //语音音节范围值
    public rate?: number;  //语音速率
    public duration?: string;  //语音时长
    public volume?: number;  //语音音量

    constructor(options: IProsodyOptions, type = ElementTypes.Prosody) {
        super(options, type);
        util.optionsInject(this, options, {
            pitch: (v: any) => util.isUndefined(v) ? v : Number(v),
            rate: (v: any) => util.isUndefined(v) ? v : Number(v),
            volume: (v: any) => util.isUndefined(v) ? v : Number(v)
        }, {
            pitch: (v: any) => util.isUndefined(v) || util.isFinite(v),
            contour: (v: any) => util.isUndefined(v) || util.isString(v),
            range: (v: any) => util.isUndefined(v) || util.isString(v),
            rate: (v: any) => util.isUndefined(v) || util.isFinite(v),
            duration: (v: any) => util.isUndefined(v) || util.isString(v),
            volume: (v: any) => util.isUndefined(v) || util.isFinite(v),
        });
    }

    render(parent: any, provider: Providers) {
        const element = super.render(parent, provider);
        switch(provider) {
            case Providers.Microsoft:
                element.att("pitch", this.pitch ? `${parseInt((this.pitch * 50 - 50).toString())}%` : undefined);
                element.att("contour", this.contour);
                element.att("range", this.range);
                element.att("rate", this.rate);
                element.att("duration", this.duration);
                element.att("volume", this.volume ? (this.volume > 100 ? 100 : this.volume) : undefined);
            break;
            case Providers.YunXiaoWei:
                const volume = this.volume ? (this.volume > 200 ? 200 : this.volume) : undefined;
                this.pitch && element.att("pitch", this.pitch > 1.3 ? 1.3 : (this.pitch < 0.7 ? 0.7 : this.pitch));
                volume && element.att("volume", volume / 100);
                this.rate && element.att("rate", 2 - (this.rate > 2 ? 2 : (this.rate < 0.5 ? 0.5 : this.rate)));
            break;
        }
        return element;
    }

}

export default Prosody;