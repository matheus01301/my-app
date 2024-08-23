import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';
import createDataWithCustomValues from '../GridView/IndicatorData';
import { IndicatorProps } from '../../interfaces/indicator';
import { initialIndicators, fetchRoom } from '../utils/utils';

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
    updateRoomIndicator: (roomId: number, horario: string) => void;
}

const defaultContext: IndicatorsContextProps = {
    indicatorsData: [],
    setIndicatorsData: () => {},
    setIsMQTTActive: () => {},
    updateIndicator: () => {},
    deleteIndicator: () => {},
    updateRoomIndicator: () => {},
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
        console.log('Config loaded, initializing indicators...');
        const dataObjects = initialIndicators.map(indicator => ({
            ...indicator,
            color: config?.indicatorColors?.find(i => i.property === indicator.property)?.color || '#141414',
        }));
{/* @ts-ignore */}
        const initializedData = createDataWithCustomValues(dataObjects);
        setIndicatorsData(initializedData);
        console.log('Indicators initialized:', initializedData);
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
        setIndicatorsData(prevData => {
            return prevData.map(ind => {
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

        setManualChanges(prev => ({
            ...prev,
            [updatedIndicator.property]: updatedIndicator,
        }));
    }, []);

    const deleteIndicator = useCallback((id: string) => {
        setIndicatorsData(prevData => prevData.filter(ind => ind.id !== id));
        setManualChanges(prev => {
            const newManualChanges = { ...prev };
            delete newManualChanges[id];
            return newManualChanges;
        });
    }, []);

    const updateRoomIndicator = useCallback(async (roomId: number, horario: string) => {
        console.log(`roomId: ${roomId} horario ${horario}`);
        const roomData = await fetchRoom(roomId);
        
        if (roomData) {
            // Extrair apenas a hora inicial do roomData.horario (se o servidor estiver enviando no formato "07:00 - 07:50")
            const [horaInicial] = roomData.horario.split(" - ");
    
            setIndicatorsData((prevData) => {
                return prevData.map((ind) => {
                    // Verifica se o indicador corresponde ao horário E ao id da sala
                    if (ind.roomID === roomId && ind.hora === horaInicial) {
                        console.log(`Atualizando indicador: ${ind.hora}, ${horaInicial}, ${roomId}`);
                        return {
                            ...ind,
                            value: `Usuário ID: ${roomData.id_usuario}`, // Exemplo de como mostrar o id_usuario
                        };
                    } else {
                        console.log(`Indicador não corresponde: ${ind.hora} !== ${horaInicial} ou roomId: ${ind.roomID} !== ${roomId}`);
                    }
                    return ind;
                });
            });
        } else {
            console.log(`No room data found for roomId: ${roomId}`);
        }
    }, []);
    

    useEffect(() => {
        // Atualiza todos os indicadores com base nos dados iniciais
        initialIndicators.forEach(indicator => {
            if (indicator.roomID && indicator.hora) { // Verifica se roomID e hora são válidos
                console.log(`Processing initial indicator with roomID: ${indicator.roomID} and hora: ${indicator.hora}`);
                updateRoomIndicator(indicator.roomID, indicator.hora);
            } else {
                console.log(`Skipping indicator with undefined roomID or hora: roomID=${indicator.roomID}, hora=${indicator.hora}`);
            }
        });
    }, [updateRoomIndicator]);

    return (
        <IndicatorsContext.Provider value={{ indicatorsData, setIndicatorsData, setIsMQTTActive, updateIndicator, deleteIndicator, updateRoomIndicator }}>
            {children}
        </IndicatorsContext.Provider>
    );
};

export const useIndicators = () => useContext(IndicatorsContext);
