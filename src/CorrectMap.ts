import Providers from './enums/Providers';

export default {
    [Providers.YunXiaoWei]: {
        default: {
            halfCharDuration: 80,
            fullCharDuration: 230,
            bigCharDuration: 930
        }
    },
    [Providers.Aliyun]: {
        default: {
            halfCharDuration: 80,
            fullCharDuration: 190,
            bigCharDuration: 930
        }
    },
    [Providers.Microsoft]: {
        default: {
            halfCharDuration: 80,
            fullCharDuration: 230,
            bigCharDuration: 950
        }
    }
} as any;