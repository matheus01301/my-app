import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';
import createDataWithCustomValues from '../GridView/IndicatorData';
import { IndicatorProps } from '../../interfaces/indicator';
import { initialIndicators } from '../utils/utils';

let ipcRenderer;
if (typeof window !== 'undefined') {
    ipcRenderer = window.require('electron').ipcRenderer;
}

interface IndicatorsContextProps {
    indicatorsData: IndicatorProps[];
    setIndicatorsData: React.Dispatch<React.SetStateAction<IndicatorProps[]>>;
    setIsMQTTActive: React.Dispatch<React.SetStateAction<boolean>>;
    updateIndicator: (updatedIndicator: IndicatorProps) => void;
    deleteIndicator: (id: string) => void;
}

const defaultContext: IndicatorsContextProps = {
    indicatorsData: [],
    setIndicatorsData: () => { },
    setIsMQTTActive: () => { },
    updateIndicator: () => { },
    deleteIndicator: () => { },
};

export const IndicatorsContext = createContext<IndicatorsContextProps>(defaultContext);

interface IndicatorsProviderProps {
    children: ReactNode;
}

export const IndicatorsProvider = ({ children }: IndicatorsProviderProps) => {
    const [isMQTTActive, setIsMQTTActive] = useState(true);
    const [indicatorsData, setIndicatorsData] = useState<IndicatorProps[]>([]);
    const [manualChanges, setManualChanges] = useState<Record<string, IndicatorProps>>({});
    const [config, setConfig] = useState<any>(null);

    useEffect(() => {
        const dataObjects = initialIndicators.map(indicator => ({
            ...indicator,
            color: config?.indicatorColors?.find(i => i.property === indicator.property)?.color || '#141414',
        }));

        const initializedData = createDataWithCustomValues(dataObjects);
        setIndicatorsData(initializedData);
    }, [config]);

    useEffect(() => {
        ipcRenderer.on('config-loaded', (event, config) => {
            setConfig(config);
        });

        return () => {
            ipcRenderer.removeAllListeners('config-loaded');
        };
    }, []);

    const updateIndicator = useCallback((updatedIndicator: IndicatorProps) => {
        setIndicatorsData((prevData) => {
            return prevData.map((ind) => {
                if (ind.id === updatedIndicator.property) {
                    return {
                        ...ind,
                        ...updatedIndicator,
                        value: updatedIndicator.value,
                    };
                }
                return ind;
            });
        });

        setManualChanges((prev) => ({
            ...prev,
            [updatedIndicator.property]: updatedIndicator,
        }));
    }, []);

    const deleteIndicator = useCallback((id: string) => {
        setIndicatorsData((prevData) => prevData.filter((ind) => ind.id !== id));
        setManualChanges((prev) => {
            const newManualChanges = { ...prev };
            delete newManualChanges[id];
            return newManualChanges;
        });
    }, []);

    return (
        <IndicatorsContext.Provider value={{ indicatorsData, setIndicatorsData, setIsMQTTActive, updateIndicator, deleteIndicator }}>
            {children}
        </IndicatorsContext.Provider>
    );
};

export const useIndicators = () => useContext(IndicatorsContext);
