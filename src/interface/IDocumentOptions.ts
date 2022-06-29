import IElementOptions from "../elements/interface/IElementOptions";

import Element from '../elements/Element';

interface IDocumentOptions {
    type?: string;
    provider?: string;
    realProvider?: string;
    solution?: string;
    version?: string;
    language?: string;
    xmlns?: string;
    effect?: string;
    effectValue?: string;
    format?: string;
    sampleRate?: string;
    children?: (Element | IElementOptions)[];
    correctMap?: any;
}

export default IDocumentOptions;
