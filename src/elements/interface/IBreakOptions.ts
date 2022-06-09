import IElementOptions from "./IElementOptions";

interface IBreakOptions extends IElementOptions {
    strength?: number | string;
    time?: number | string;
}

export default IBreakOptions;