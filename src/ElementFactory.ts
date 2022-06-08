import IElementOptions from './elements/interface/IElementOptions';

import ElementTypes from './enums/ElementTypes';

import { Element } from './elements';
import util from './util';

class ElementFactory {
    /**
     * 实例化元素
     *
     * @param {Object} data
     * @returns {Element}
     */
    public static createElement(data: IElementOptions) {
        if (!util.isObject(data)) throw new TypeError('data must be an Object');
        switch (data.type) {
            case ElementTypes.Voice: //语音元素
                
            case ElementTypes.Audio: //音频元素
                
            
        }
        return new Element(data, undefined);
    }
}

export default ElementFactory;
