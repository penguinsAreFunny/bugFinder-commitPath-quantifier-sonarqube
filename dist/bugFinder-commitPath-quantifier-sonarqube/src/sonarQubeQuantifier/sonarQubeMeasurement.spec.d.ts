export declare const x: {
    component: {
        key: string;
        name: string;
        qualifier: string;
        path: string;
        language: string;
        measures: ({
            metric: string;
            value: string;
            bestValue: boolean;
            periods?: undefined;
            period?: undefined;
        } | {
            metric: string;
            periods: {
                index: number;
                value: string;
                bestValue: boolean;
            }[];
            period: {
                index: number;
                value: string;
                bestValue: boolean;
            };
            value?: undefined;
            bestValue?: undefined;
        } | {
            metric: string;
            value: string;
            bestValue?: undefined;
            periods?: undefined;
            period?: undefined;
        } | {
            metric: string;
            periods: {
                index: number;
                value: string;
            }[];
            period: {
                index: number;
                value: string;
                bestValue?: undefined;
            };
            value?: undefined;
            bestValue?: undefined;
        })[];
    };
};
