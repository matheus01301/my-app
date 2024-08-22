export interface IndicatorProps {
    id: string;
    title: string;
    property: string;
    value: string;
    unit: string;
    type?: string;
    size?: string;
    isLeftColumn?: boolean;
    [key: string]: any;
}
