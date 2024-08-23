import { IndicatorProps } from '../../interfaces/indicator';
import createDataWithCustomValues from '../GridView/IndicatorData';

describe('createDataWithCustomValues', () => {
  it('should create an array of IndicatorProps with custom values', () => {
    const dataObjects = [
      {
        customValue: 123,
        property: 'temperature',
        title: 'Temperature',
        type: 'gauge',
        unit: '°C',
        fator: 1,
        color: '#FF0000',
        isLeftColumn: true,
        roomID: 1,
        hora: '10:00',
      },
      {
        customValue: 456,
        property: 'humidity',
        title: 'Humidity',
        unit: '%',
        fator: 2,
      },
    ];

    const indicators: IndicatorProps[] = createDataWithCustomValues(dataObjects);

    expect(indicators).toHaveLength(2);

    expect(indicators[0]).toMatchObject({
      title: 'Temperature',
      type: 'gauge',
      fator: 1,
      value: '123',
      unit: '°C',
      size: 'custom',
      btn: [true, true],
      property: 'temperature',
      color: '#FF0000',
      isLeftColumn: true,
      roomID: 1,
      hora: '10:00',
    });

    expect(indicators[1]).toMatchObject({
      title: 'Humidity',
      type: 'indicator',
      fator: 2,
      value: '456',
      unit: '%',
      size: 'custom',
      btn: [true, true],
      property: 'humidity',
      color: '#09090A',
      isLeftColumn: false,
      roomID: undefined,
      hora: undefined,
    });

    // Verifica se cada objeto tem um UUID como id
    indicators.forEach(indicator => {
      expect(indicator.id).toBeDefined();
      expect(indicator.id).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
      );
    });
  });

  it('should handle null and undefined custom values', () => {
    const dataObjects = [
      {
        customValue: null,
        property: 'pressure',
        title: 'Pressure',
        unit: 'Pa',
        fator: 1,
      },
      {
        customValue: undefined,
        property: 'flow',
        title: 'Flow Rate',
        unit: 'L/s',
        fator: 1,
      },
    ];

    const indicators: IndicatorProps[] = createDataWithCustomValues(dataObjects);

    expect(indicators[0]).toMatchObject({
      title: 'Pressure',
      value: '',
      property: 'pressure',
      unit: 'Pa',
    });

    expect(indicators[1]).toMatchObject({
      title: 'Flow Rate',
      value: '',
      property: 'flow',
      unit: 'L/s',
    });
  });
});
