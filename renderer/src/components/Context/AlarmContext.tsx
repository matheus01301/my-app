import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface Alarm {
    idnivelarme: number;
    indice: number;
    name: string;
    idvariavel: number;
    valuemin: number;
    valuemax: number;
    active: boolean;
}

interface AlarmContextType {
    alarms: Alarm[];
    addAlarm: (alarm: Alarm) => void;
    updateAlarm: (key: React.Key, status: string) => void;
    toggleAlarm: (idvariavel: number) => void;
    addAlarmLog: (name: string, duration: number) => void;
    deleteAlarm: (idnivelarme: number) => void;
}

const defaultContextValue: AlarmContextType = {
    alarms: [],
    addAlarm: () => { },
    updateAlarm: () => { },
    toggleAlarm: () => { },
    addAlarmLog: () => { },
    deleteAlarm: () => { },
};

const AlarmContext = createContext<AlarmContextType>(defaultContextValue);

export const useAlarmContext = () => {
    return useContext(AlarmContext);
};
{/* @ts-ignore */}
export const AlarmProvider: React.FC = ({ children }) => {
    const [alarms, setAlarms] = useState<Alarm[]>([]);
    const [alarmLogs, setAlarmLogs] = useState([]);

    const fetchSalas = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/salas/');
            if (!response.ok) {
                throw new Error('Failed to fetch salas');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching salas:', error);
            return [];
        }
    };
    

    const loadAlarms = async () => {
        const alarmsData = await fetchSalas();
        setAlarms(alarmsData);
    };

    useEffect(() => {
        loadAlarms();
    }, []);

    const addAlarmLog = useCallback((alarmName, duration) => {
        setAlarmLogs(prevLogs => [...prevLogs, { alarmName, duration, timestamp: new Date() }]);
    }, []);

    const toggleAlarm = useCallback((idvariavel) => {
        setAlarms((currentAlarms) => {
            const updatedAlarms = currentAlarms.map((alarm) => {
                if (alarm.idvariavel === idvariavel) {
                    return { ...alarm, active: !alarm.active };
                }
                return alarm;
            });
            return updatedAlarms;
        });
    }, [setAlarms]);

    const updateAlarm = useCallback((key, newStatus) => {
        setAlarms(alarms => alarms.map(alarm => {
            if (alarm.idnivelarme === key) {
                return { ...alarm, active: newStatus === 'Active' };
            }
            return alarm;
        }));
    }, []);

    const addAlarm = (alarm: Alarm) => {
        setAlarms((prevAlarms) => {
            return [...prevAlarms, alarm];
        });
    };

    const deleteAlarm = useCallback((idnivelarme: number) => {
        setAlarms((currentAlarms) => {
            return currentAlarms.filter((alarm) => alarm.idnivelarme !== idnivelarme);
        });
    }, []);

    const value = { alarms, addAlarm, updateAlarm, toggleAlarm, addAlarmLog, deleteAlarm, alarmLogs };

    return <AlarmContext.Provider value={value}>{children}</AlarmContext.Provider>;
};
