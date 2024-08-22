import { debounce } from 'lodash'

export let BASE_URL = 'http://127.0.0.1:8080';

export const setBaseURL = (newBaseURL) => {
  BASE_URL = newBaseURL;
  if (typeof window !== "undefined") {
    localStorage.setItem('base_url', newBaseURL);
  }
};

export const getBaseURL = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem('base_url') || BASE_URL;
  }
  return BASE_URL;
};

BASE_URL = getBaseURL();

export let STEPnum = '60';

export const setStep = (newStep) => {
  STEPnum = newStep;
  if (typeof window !== "undefined") {
    localStorage.setItem('step_num', newStep);
  }
};

export const getStep = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem('step_num') || STEPnum;
  }
  return STEPnum;
};

STEPnum = getStep();

console.log(STEPnum)

// console.log('base', BASE_URL)

export let LAB_NUMBER = '19';

export let witsml_format = false;

export const setLabNumber = (newLabNumber) => {
  LAB_NUMBER = newLabNumber;
  if (typeof window !== "undefined") {
    localStorage.setItem('lab_number', newLabNumber);
  }
};

export const getLabNumber = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem('lab_number') || LAB_NUMBER;
  }
  return LAB_NUMBER;
};

LAB_NUMBER = getLabNumber();

// console.log('Lab Number:', LAB_NUMBER);

export let ACCESS_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJHODR4d2U0MGxWdUJteHloc21PUTNNeVVGVEw4bG5sZnhJWGpsX2FSY0dVIn0.eyJleHAiOjE3MjI5NDQyOTMsImlhdCI6MTcyMjg1Nzg5MywianRpIjoiZTA3NTlkMjgtM2M2My00Mjg5LWFiNjEtNWNhZmQxZDU2NGMzIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLmdlb3dlbGxleC5jb20vYXV0aC9yZWFsbXMvR2Vvd2VsbGV4IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImY6ZTRmMDdkYjAtNTE4ZS00NzIxLWJlMTMtOWZmNjQ2YTIxYzFkOjUxNiIsInR5cCI6IkJlYXJlciIsImF6cCI6Imdlb3dlbGxleC1mcm9udGVuZCIsInNlc3Npb25fc3RhdGUiOiI1NWNhY2M2OS03YmI0LTQ0MmYtOTU3Ny0zODYyMjMyZTVhOTUiLCJhY3IiOiIxIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InNlcnZpY2VzX2FsbG93ZWQgcHJvZmlsZSBlbWFpbCBsYWJzX2FsbG93ZWQiLCJzaWQiOiI1NWNhY2M2OS03YmI0LTQ0MmYtOTU3Ny0zODYyMjMyZTVhOTUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJtYXRoZXVzLm1hcmluaG8iLCJncm91cHMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtYXRoZXVzLm1hcmluaG9AZ2Vvd2VsbGV4LmNvbSIsImdpdmVuX25hbWUiOiJtYXRoZXVzLm1hcmluaG8iLCJsYWJzX2FsbG93ZWQiOlsxLDIsMywxOV0sImVtYWlsIjoibWF0aGV1cy5tYXJpbmhvQGdlb3dlbGxleC5jb20ifQ.Aoff0LkxZc9NPfc-iXQYgTGob6Z9gHzHosgmN3StWCR2A46B4oewxOSm_Mb0cqc55drgbSM-q7xKSPPmKJqGAKKb9_1fcurJIR8RsQtVxLpTaemUHqTV4feG0ATYpZUZZCAePPI1op0cTOK7mUvQKGsfbMeaRlwpLnoMtXTeNubKXf_SKRC4imJmSgtiWr2WS13BAun8-WFoeTbe89NK2RbPYS8BEjVCg1V7v01Na_F1meHsE7rDdqa3cn6sMHYtwpS_5eIb49depfwQ0sr8LYl5KuTujQecJLeD4VdcvSWoXYzw-XA1Uc4eISH19uYl_dk7YTpA8acobAey8wFtXQ';

export const setAccessToken = (newAccessToken) => {
  ACCESS_TOKEN = newAccessToken;
  if (typeof window !== "undefined") {
    localStorage.setItem('access_token', newAccessToken);
  }
};

export const getAccessToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem('access_token') || ACCESS_TOKEN;
  }
  return ACCESS_TOKEN;
};

ACCESS_TOKEN = getAccessToken();

// console.log('Access Token:', ACCESS_TOKEN);

let requestCount = 0;

let initializationPromise = null;

export const fetchInitializationData = async () => {
  if (!initializationPromise) {
    initializationPromise = (async () => {
      try {
        requestCount++;
        console.log(`Número de requisições: ${requestCount}`);
        const lab_number = getLabNumber();
        const accessToken = getAccessToken();
        const response = await fetch(`${BASE_URL}/wellexds/initialization/?lab_number=${lab_number}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
      } catch (error) {
        console.error('Erro ao buscar os dados de inicialização:', error);
        initializationPromise = null;
        throw error;
      }
    })();
  }
  return initializationPromise;
};

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await fetch('http://127.0.0.1:8088/wellexds/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'password',
        username: username,
        password: password,
        scope: '',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to login');
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const getUserPermission = async (accessToken: string) => {
  try {
    const response = await fetch('http://127.0.0.1:8088/wellexds/logado', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user permission');
    }

    const data = await response.json();
    console.log('oi',data)
    return data.permissao;
  } catch (error) {
    console.error('Error fetching user permission:', error);
    throw error;
  }
};

export async function createUser(nome: string, matricula: number, senha: string) {
    try {
        const response = await fetch('http://127.0.0.1:8000/user/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, matricula, senha }),
      });
  
      if (!response.ok) {
        throw new Error('Erro na criação do usuário');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
  }

export const fetchAlarms = async () => {
  const lab_number = getLabNumber();
  const response = await fetch(`${BASE_URL}/wellexds/alarms/?lab_number=${lab_number}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ACCESS_TOKEN}`
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const alarms = await response.json();

  const filteredAlarms = alarms.filter(alarm => alarm.idusuario === 26);

  return filteredAlarms;
};

export const initialIndicators = [
  // Início com o horário
  { id: 'hour1', title: 'Horas', property: 'hora', customValue: '07:00 - 07:50', unit: '', fator: 1, isLeftColumn: true },

  // Primeiro grupo de indicadores normais
  { id: 'indicator1', title: 'Temperature', property: 'temp', customValue: 25, unit: 'C', fator: 1 },
  { id: 'indicator2', title: 'Pressure', property: 'pressure', customValue: 1013, unit: 'hPa', fator: 1 },
  { id: 'indicator3', title: 'Humidity', property: 'humidity', customValue: 55, unit: '%', fator: 1 },
  { id: 'indicator4', title: 'Wind Speed', property: 'wind', customValue: 12, unit: 'km/h', fator: 1 },

  // Segundo horário
  { id: 'hour2', title: 'Horas', property: 'hora', customValue: '07:50 - 08:40', unit: '', fator: 1, isLeftColumn: true },

  // Segundo grupo de indicadores normais
  { id: 'indicator5', title: 'Temperature', property: 'temp', customValue: 26, unit: 'C', fator: 1 },
  { id: 'indicator6', title: 'Pressure', property: 'pressure', customValue: 1012, unit: 'hPa', fator: 1 },
  { id: 'indicator7', title: 'Humidity', property: 'humidity', customValue: 60, unit: '%', fator: 1 },
  { id: 'indicator8', title: 'Wind Speed', property: 'wind', customValue: 14, unit: 'km/h', fator: 1 },

  // Terceiro horário
  { id: 'hour3', title: 'Horas', property: 'hora', customValue: '08:55 - 09:45', unit: '', fator: 1, isLeftColumn: true },

  // Terceiro grupo de indicadores normais
  { id: 'indicator9', title: 'Temperature', property: 'temp', customValue: 27, unit: 'C', fator: 1 },
  { id: 'indicator10', title: 'Pressure', property: 'pressure', customValue: 1011, unit: 'hPa', fator: 1 },
  { id: 'indicator11', title: 'Humidity', property: 'humidity', customValue: 65, unit: '%', fator: 1 },
  { id: 'indicator12', title: 'Wind Speed', property: 'wind', customValue: 15, unit: 'km/h', fator: 1 },

  // Quarto horário
  { id: 'hour4', title: 'Horas', property: 'hora', customValue: '09:45 - 10:35', unit: '', fator: 1, isLeftColumn: true },

  // Quarto grupo de indicadores normais
  { id: 'indicator13', title: 'Temperature', property: 'temp', customValue: 28, unit: 'C', fator: 1 },
  { id: 'indicator14', title: 'Pressure', property: 'pressure', customValue: 1010, unit: 'hPa', fator: 1 },
  { id: 'indicator15', title: 'Humidity', property: 'humidity', customValue: 70, unit: '%', fator: 1 },
  { id: 'indicator16', title: 'Wind Speed', property: 'wind', customValue: 18, unit: 'km/h', fator: 1 },

  // Quinto horário
  { id: 'hour5', title: 'Horas', property: 'hora', customValue: '10:50 - 11:40', unit: '', fator: 1, isLeftColumn: true },

  // Quinto grupo de indicadores normais
  { id: 'indicator17', title: 'Temperature', property: 'temp', customValue: 29, unit: 'C', fator: 1 },
  { id: 'indicator18', title: 'Pressure', property: 'pressure', customValue: 1009, unit: 'hPa', fator: 1 },
  { id: 'indicator19', title: 'Humidity', property: 'humidity', customValue: 72, unit: '%', fator: 1 },
  { id: 'indicator20', title: 'Wind Speed', property: 'wind', customValue: 20, unit: 'km/h', fator: 1 },

  // Sexto horário
  { id: 'hour6', title: 'Horas', property: 'hora', customValue: '11:40 - 12:30', unit: '', fator: 1, isLeftColumn: true },

  // Sexto grupo de indicadores normais
  { id: 'indicator21', title: 'Temperature', property: 'temp', customValue: 30, unit: 'C', fator: 1 },
  { id: 'indicator22', title: 'Pressure', property: 'pressure', customValue: 1008, unit: 'hPa', fator: 1 },
  { id: 'indicator23', title: 'Humidity', property: 'humidity', customValue: 75, unit: '%', fator: 1 },
  { id: 'indicator24', title: 'Wind Speed', property: 'wind', customValue: 22, unit: 'km/h', fator: 1 },

  // Sétimo horário
  { id: 'hour7', title: 'Horas', property: 'hora', customValue: '12:30 - 13:20', unit: '', fator: 1, isLeftColumn: true },

  // Sétimo grupo de indicadores normais
  { id: 'indicator25', title: 'Temperature', property: 'temp', customValue: 31, unit: 'C', fator: 1 },
  { id: 'indicator26', title: 'Pressure', property: 'pressure', customValue: 1007, unit: 'hPa', fator: 1 },
  { id: 'indicator27', title: 'Humidity', property: 'humidity', customValue: 78, unit: '%', fator: 1 },
  { id: 'indicator28', title: 'Wind Speed', property: 'wind', customValue: 25, unit: 'km/h', fator: 1 },

  // Oitavo horário
  { id: 'hour8', title: 'Horas', property: 'hora', customValue: '13:20 - 14:10', unit: '', fator: 1, isLeftColumn: true },

  // Oitavo grupo de indicadores normais
  { id: 'indicator29', title: 'Temperature', property: 'temp', customValue: 32, unit: 'C', fator: 1 },
  { id: 'indicator30', title: 'Pressure', property: 'pressure', customValue: 1006, unit: 'hPa', fator: 1 },
  { id: 'indicator31', title: 'Humidity', property: 'humidity', customValue: 80, unit: '%', fator: 1 },
  { id: 'indicator32', title: 'Wind Speed', property: 'wind', customValue: 28, unit: 'km/h', fator: 1 },

  // Nono horário
  { id: 'hour9', title: 'Horas', property: 'hora', customValue: '14:10 - 15:00', unit: '', fator: 1, isLeftColumn: true },

  // Nono grupo de indicadores normais
  { id: 'indicator33', title: 'Temperature', property: 'temp', customValue: 33, unit: 'C', fator: 1 },
  { id: 'indicator34', title: 'Pressure', property: 'pressure', customValue: 1005, unit: 'hPa', fator: 1 },
  { id: 'indicator35', title: 'Humidity', property: 'humidity', customValue: 82, unit: '%', fator: 1 },
  { id: 'indicator36', title: 'Wind Speed', property: 'wind', customValue: 30, unit: 'km/h', fator: 1 },

  // Décimo horário
  { id: 'hour10', title: 'Horas', property: 'hora', customValue: '15:00 - 15:50', unit: '', fator: 1, isLeftColumn: true },

  // Décimo grupo de indicadores normais
  { id: 'indicator37', title: 'Temperature', property: 'temp', customValue: 34, unit: 'C', fator: 1 },
  { id: 'indicator38', title: 'Pressure', property: 'pressure', customValue: 1004, unit: 'hPa', fator: 1 },
  { id: 'indicator39', title: 'Humidity', property: 'humidity', customValue: 85, unit: '%', fator: 1 },
  { id: 'indicator40', title: 'Wind Speed', property: 'wind', customValue: 32, unit: 'km/h', fator: 1 },

  // Décimo primeiro horário
  { id: 'hour11', title: 'Horas', property: 'hora', customValue: '15:50 - 16:40', unit: '', fator: 1, isLeftColumn: true },

  // Décimo primeiro grupo de indicadores normais
  { id: 'indicator41', title: 'Temperature', property: 'temp', customValue: 35, unit: 'C', fator: 1 },
  { id: 'indicator42', title: 'Pressure', property: 'pressure', customValue: 1003, unit: 'hPa', fator: 1 },
  { id: 'indicator43', title: 'Humidity', property: 'humidity', customValue: 88, unit: '%', fator: 1 },
  { id: 'indicator44', title: 'Wind Speed', property: 'wind', customValue: 34, unit: 'km/h', fator: 1 },

  // Décimo segundo horário
  { id: 'hour12', title: 'Horas', property: 'hora', customValue: '16:50 - 17:40', unit: '', fator: 1, isLeftColumn: true },

  // Décimo segundo grupo de indicadores normais
  { id: 'indicator45', title: 'Temperature', property: 'temp', customValue: 36, unit: 'C', fator: 1 },
  { id: 'indicator46', title: 'Pressure', property: 'pressure', customValue: 1002, unit: 'hPa', fator: 1 },
  { id: 'indicator47', title: 'Humidity', property: 'humidity', customValue: 90, unit: '%', fator: 1 },
  { id: 'indicator48', title: 'Wind Speed', property: 'wind', customValue: 36, unit: 'km/h', fator: 1 },

  // Décimo terceiro horário
  { id: 'hour13', title: 'Horas', property: 'hora', customValue: '17:40 - 18:30', unit: '', fator: 1, isLeftColumn: true },

  // Décimo terceiro grupo de indicadores normais
  { id: 'indicator49', title: 'Temperature', property: 'temp', customValue: 37, unit: 'C', fator: 1 },
  { id: 'indicator50', title: 'Pressure', property: 'pressure', customValue: 1001, unit: 'hPa', fator: 1 },
  { id: 'indicator51', title: 'Humidity', property: 'humidity', customValue: 92, unit: '%', fator: 1 },
  { id: 'indicator52', title: 'Wind Speed', property: 'wind', customValue: 38, unit: 'km/h', fator: 1 },

  // Décimo quarto horário
  { id: 'hour14', title: 'Horas', property: 'hora', customValue: '18:45 - 19:35', unit: '', fator: 1, isLeftColumn: true },

  // Décimo quarto grupo de indicadores normais
  { id: 'indicator53', title: 'Temperature', property: 'temp', customValue: 38, unit: 'C', fator: 1 },
  { id: 'indicator54', title: 'Pressure', property: 'pressure', customValue: 1000, unit: 'hPa', fator: 1 },
  { id: 'indicator55', title: 'Humidity', property: 'humidity', customValue: 94, unit: '%', fator: 1 },
  { id: 'indicator56', title: 'Wind Speed', property: 'wind', customValue: 40, unit: 'km/h', fator: 1 },

  // Décimo quinto horário
  { id: 'hour15', title: 'Horas', property: 'hora', customValue: '19:35 - 20:25', unit: '', fator: 1, isLeftColumn: true },

  // Décimo quinto grupo de indicadores normais
  { id: 'indicator57', title: 'Temperature', property: 'temp', customValue: 39, unit: 'C', fator: 1 },
  { id: 'indicator58', title: 'Pressure', property: 'pressure', customValue: 999, unit: 'hPa', fator: 1 },
  { id: 'indicator59', title: 'Humidity', property: 'humidity', customValue: 96, unit: '%', fator: 1 },
  { id: 'indicator60', title: 'Wind Speed', property: 'wind', customValue: 42, unit: 'km/h', fator: 1 },

  // Décimo sexto horário
  { id: 'hour16', title: 'Horas', property: 'hora', customValue: '20:35 - 21:25', unit: '', fator: 1, isLeftColumn: true },

  // Décimo sexto grupo de indicadores normais
  { id: 'indicator61', title: 'Temperature', property: 'temp', customValue: 40, unit: 'C', fator: 1 },
  { id: 'indicator62', title: 'Pressure', property: 'pressure', customValue: 998, unit: 'hPa', fator: 1 },
  { id: 'indicator63', title: 'Humidity', property: 'humidity', customValue: 98, unit: '%', fator: 1 },
  { id: 'indicator64', title: 'Wind Speed', property: 'wind', customValue: 44, unit: 'km/h', fator: 1 },

  // Décimo sétimo horário
  { id: 'hour17', title: 'Horas', property: 'hora', customValue: '21:25 - 22:15', unit: '', fator: 1, isLeftColumn: true },

  { id: 'indicator65', title: 'Temperature', property: 'temp', customValue: 40, unit: 'C', fator: 1 },
  { id: 'indicator66', title: 'Pressure', property: 'pressure', customValue: 998, unit: 'hPa', fator: 1 },
  { id: 'indicator67', title: 'Humidity', property: 'humidity', customValue: 98, unit: '%', fator: 1 },
  { id: 'indicator68', title: 'Wind Speed', property: 'wind', customValue: 44, unit: 'km/h', fator: 1 },

  // Continue até o final...
];

//resolver as properties depois

export const fetchProperties = async () => {
  try {
    const data = await fetchInitializationData();
    const properties = {};
    data.curves.forEach(curve => {
      properties[curve.id] = curve.name;
    });
    return properties;
  } catch (error) {
    console.error('Erro ao buscar as propriedades:', error);
    return {};
  }
};

export let properties = [];

const initializeProperties = async () => {
  try {
    const fetchedProperties = await fetchProperties();
    properties = Object.values(fetchedProperties);
  } catch (error) {
    console.error('Erro ao inicializar as propriedades:', error);
  }
};

(async () => {
  await initializeProperties();
})();

let initializationData = null;

export const setInitializationData = (data) => {
  initializationData = data;
};

export const getInitializationData = () => {
  return initializationData;
};

export const fetchCountry = async () => {
  const data = getInitializationData();
  return data ? data.header.state : null;
};

export const fetchWellname = async () => {
  const data = getInitializationData();
  return data ? data.header.wellname : null;
};

export const fetchLocation = async () => {
  const data = getInitializationData();
  return data ? data.header.location : null;
};

export const fetchField = async () => {
  const data = getInitializationData();
  return data ? data.header.fieldname : null;
};

export const fetchRigname = async () => {
  const data = getInitializationData();
  return data ? data.header.rigname : null;
};

export const fetchCurrentDate = async () => {
  const data = getInitializationData();
  return data ? data.header.currentDate : null;
};

export const fetchUnits = async () => {
  await fetchInitializationData();
  const data = getInitializationData();
  return data ? data.curves.map(curve => ({
    name: curve.name,
    units: curve.units
  })) : [];
};

export const fetchUnitsFromAPI = async (property: string) => {
  const data = getInitializationData();
  const curve = data ? data.curves.find(curve => curve.name === property) : null;
  return curve ? curve.units : [];
};

export const fetchStartTime = async () => {
  const data = getInitializationData();
  return data ? data.header.startTime : null;
};

export const fetchStartDepth = async () => {
  const data = getInitializationData();
  return data ? data.header.startDepth !== undefined ? data.header.startDepth : null : null;
};

export const fetchEndTime = async () => {
  try {
    const lab_number = getLabNumber();
    const accessToken = getAccessToken();
    const response = await fetch(`${BASE_URL}/wellexds/acquisitions/currentdepth?lab_number=${lab_number}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('currentdepth', data.currentDepth)
    return data.currentDepth;

  } catch (error) {
    console.error('Erro ao buscar o current depth:', error);
    return null;
  }
};


export const initialState = {
  data: {
    Type: 0.0000,
    idpoco: 0.0000,


  },
  brushInterval: { startIndex: 0, endIndex: 30 },
};

export const getWindowDimensions = () => {
  if (typeof window !== "undefined") {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
  }
  return { width: 0, height: 0 };
};

export const initialWindowDimensions = getWindowDimensions();

export const propertyTitles = {
  Torque: "Torque",
  MudTempOut: "MudTemp",
  MudDensityIn: "MudDenIn",
  MudDensityOut: "MudDenOut",
  HookPosition: "HookPos",
  HoleDepthAcq: "HoleDepAcq",
  HoleCorrection: "HoleCorrect",
  StandPipePressure: "StaPipePres",
  ActiveTotalPitLevel: "ActTotPitLv",
  ChockePressure: "ChockePress",
};
