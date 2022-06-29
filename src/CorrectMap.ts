import Providers from './enums/Providers';

export default {
    [Providers.YunXiaoWei]: {
        default: {
            halfCharDuration: 100,
            fullCharDuration: 220,
            bigCharDuration: 880
        }
    },
    [Providers.Aliyun]: {
        default: {
            halfCharDuration: 100,
            fullCharDuration: 220,
            bigCharDuration: 880
        }
    },
    [Providers.Microsoft]: {
        default: {
            halfCharDuration: 80,
            fullCharDuration: 180,
            bigCharDuration: 540
        }
    }
} as any;