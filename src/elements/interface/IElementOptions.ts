import ElementTypes from '../../enums/ElementTypes';

import Element from '../Element';

interface IElementOptions {
  type?: ElementTypes;
  value?: string;
  children?: (Element | IElementOptions)[];
}

export default IElementOptions;
