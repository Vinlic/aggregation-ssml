import ElementTypes from '../../enums/ElementTypes';

import IElementOptions from "./IElementOptions";
import Element from '../Element';

interface ISilenceOptions {
    _type?: string;
    _value?: string;
    type?: ElementTypes;
    value?: string;
    children?: (Element | IElementOptions)[];
}

export default ISilenceOptions;