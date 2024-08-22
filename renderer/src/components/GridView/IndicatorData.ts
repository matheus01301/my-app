import { IndicatorProps } from "../../interfaces/indicator";

interface DataObject {
  customValue: number | null;
  property: string;
  title: string;
  type?: string;
  unit: string;
  fator: number;
  color?: string;
}

export const createDataWithCustomValues = (dataObjects: DataObject[]): IndicatorProps[] => {
    return dataObjects.map((data) => ({
        id: data?.property || 'a',
        title: data?.title || 'a',
        type: data?.type ? data.type : 'indicator',
        fator: data?.fator,
        value: String(data.customValue !== null && data.customValue !== undefined ? data.customValue : ""),  // Certifica que é uma string
        unit: data.unit,
        size: 'custom',
        btn: [true, true],
        property: data.property,
        color: data.color || '#09090A',
        isLeftColumn: data.isLeftColumn || false,  // Garante que a propriedade seja passada
    }));
};

export default createDataWithCustomValues;
