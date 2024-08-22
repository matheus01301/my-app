export interface IndicatorProps {
    id: string;
    title: string;
    property: string;
    value: string;
    unit: string;
    type?: string;
    size?: string;
    isLeftColumn?: boolean;
    roomID?: number;  // Add roomID
    hora?: string;    // Add hora
    [key: string]: any;
}
