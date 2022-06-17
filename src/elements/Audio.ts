import IAudioOptions from './interface/IAudioOptions';

import ElementTypes from '../enums/ElementTypes';
import Providers from '../enums/Providers';

import Element from './Element';
import util from '../util';

class Audio extends Element {

    public src = '';  //音频路径

    constructor(options: IAudioOptions = {}, type = ElementTypes.Audio) {
        super(options, type);
        util.optionsInject(this, options, {}, {
            src: (v: any) => util.isString(v)
        });
    }

    render(parent: any, provider: Providers) {
        const element = super.render(parent, provider);
        element.att("src", this.src);
        return element;
    }

}

export default Audio;