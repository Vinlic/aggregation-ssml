import IElementOptions from "./IElementOptions";

interface IProsodyOptions extends IElementOptions {
    pitch?: number | string;
    contour?: string;
    range?: string;
    rate?: number | string;
    duration?: string;
    volume?: number | string;
}

export default IProsodyOptions;