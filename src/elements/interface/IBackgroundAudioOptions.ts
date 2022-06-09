import IElementOptions from "./IElementOptions";

interface IBackgroundAudioOptions extends IElementOptions {
    src?: string;
    volume?: number | string;
    fadeIn?: number | string;
    fadeOut?: number | string;
}

export default IBackgroundAudioOptions;