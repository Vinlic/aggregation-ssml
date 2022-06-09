import IElementOptions from "./IElementOptions";

interface ISayAsOptions extends IElementOptions {
    "interpret-as"?: string;
    interpretAs?: string;
    format?: string;
    detail?: string;
}

export default ISayAsOptions;