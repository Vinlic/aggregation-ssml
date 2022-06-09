import IElementOptions from "./IElementOptions";

interface IExpressAsOptions extends IElementOptions {
    style?: string;
    styledegree?: number | string;
    role?: string
}

export default IExpressAsOptions;