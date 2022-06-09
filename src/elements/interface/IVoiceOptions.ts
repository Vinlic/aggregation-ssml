import IElementOptions from "./IElementOptions";

interface IVoiceOptions extends IElementOptions {
    name?: string;
    gender?: string;
    "xml:gender"?: string;
    language?: string;
    "xml:lang"?: string;
    age?: number | string;
    variant?: string;
}

export default IVoiceOptions;