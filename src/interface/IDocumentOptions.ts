import IElementOptions from "../elements/interface/IElementOptions";

import Element from '../elements/Element';

interface IDocumentOptions {
    type?: string;
    provider?: string;
    solution?: string;
    version?: string;
    language?: string;
    xmlns?: string;
    effect?: string;
    effectValue?: string;
    format?: string;
    sampleRate?: string;
    children?: (Element | IElementOptions)[];
}

export default IDocumentOptions;