export interface IndicatorProps {
    id: string;
    title: string;
    property: string;
    value: string;
    unit: string;
    type?: string;
    size?: string;
    isLeftColumn?: boolean;
    roomID?: number;
    hora?: string;
    [key: string]: any;
}
