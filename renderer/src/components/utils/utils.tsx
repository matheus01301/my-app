import { debounce } from 'lodash'

export let BASE_URL = 'http://127.0.0.1:8089';

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
