import IBackgroundAudioOptions from './interface/IBackgroundAudioOptions';

import ElementTypes from '../enums/ElementTypes';
import Providers from '../enums/Providers';

import Element from './Element';
import util from '../util';

class BackgroundAudio extends Element {

    public src = '';  //音频路径
    public volume = 1;  //音频音量
    public fadeIn?: number;  //音频淡入时长
    public fadeOut?: number;  //音频淡出时长

    constructor(options: IBackgroundAudioOptions = {}, type = ElementTypes.BackgroundAudio) {
        super(options, type);
        util.optionsInject(this, options, {
            volume: (v: any) => Number(util.defaultTo(v, 1)),
            fadeIn: (v: any) => !util.isUndefined(v) ? Number(v) : v,
            fadeOut: (v: any) => !util.isUndefined(v) ? Number(v) : v
        }, {
            src: (v: any) => util.isString(v),
            volume: (v: any) => util.isFinite(v),
            fadeIn: (v: any) => util.isUndefined(v) || util.isFinite(v),
            fadeOut: (v: any) => util.isUndefined(v) || util.isFinite(v)
        });
    }

    render(parent: any, provider: Providers) {
        const element = super.render(parent, provider);
        element.att("src", this.src);
        element.att("volume", this.volume);
        element.att("fadeIn", this.fadeIn);
        element.att("fadeOut", this.fadeOut);
        switch(provider) {
            case Providers.Microsoft:
                element.txt(" ");  //避免闭合标签
            break;
        }
        return element;
    }

}

export default BackgroundAudio;