import { IndicatorProps } from "../../interfaces/indicator";
import { v4 as uuidv4 } from 'uuid';

interface DataObject {
  customValue: number | null;
  property: string;
  title: string;
  type?: string;
  unit: string;
  fator: number;
  color?: string;
  isLeftColumn?: boolean;
  roomID?: number;
  hora?: string;
}

export const createDataWithCustomValues = (dataObjects: DataObject[]): IndicatorProps[] => {
  return dataObjects.map((data) => ({
    id: uuidv4(),
    title: data?.title || 'a',
    type: data?.type ? data.type : 'indicator',
    fator: data?.fator,
    value: String(data.customValue !== null && data.customValue !== undefined ? data.customValue : ''), 
    unit: data.unit,
    size: 'custom',
    btn: [true, true],
    property: data.property,
    color: data.color || '#09090A',
    isLeftColumn: data.isLeftColumn || false,
    roomID: data.roomID,
    hora: data.hora,
  }));
};

export default createDataWithCustomValues;
