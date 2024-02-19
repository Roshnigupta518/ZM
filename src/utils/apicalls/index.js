import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getApi = async (api, token) => {
  const ZRID = await AsyncStorage.getItem('ZRID');
  const GUID = await AsyncStorage.getItem('GUID');
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      XCorrelationIdentifier: GUID,
      XAgentIdentifier: ZRID,
    },
  };
  console.log({api, config})
  return new Promise((resolve, reject) => {
    axios(api, config)
      .then(resolve)
      .catch(err => {
        reject(err.response);
        handleAuthorization(err.response?.status);
      });
  });
};

export const postApi = async (api, data, token) => {
  const ZRID = await AsyncStorage.getItem('ZRID');
  const GUID = await AsyncStorage.getItem('GUID');
   console.log(api, data, token);
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      XCorrelationIdentifier: GUID,
      XAgentIdentifier: ZRID,
    },
  };
  return new Promise((resolve, reject) => {
    axios
      .post(api, data, config)
      .then(resolve)
      .catch(err => {
        reject(err.response);
        handleAuthorization(err.response?.status);
      });
  });
};

export const uploadApi = async (api, data, token) => {
  const ZRID = await AsyncStorage.getItem('ZRID');
  const GUID = await AsyncStorage.getItem('GUID');
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + token,
      XCorrelationIdentifier: GUID,
      XAgentIdentifier: ZRID,
    },
  };

  return new Promise((resolve, reject) => {
    axios
      .post(api, data, config)
      .then(resolve)
      .catch(err => {
        reject(err.response);
        handleAuthorization(err.response?.status);
      });
  });
};

export const putApi = async (api, data, token) => {
  const ZRID = await AsyncStorage.getItem('ZRID');
  const GUID = await AsyncStorage.getItem('GUID');
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
      XCorrelationIdentifier: GUID,
      XAgentIdentifier: ZRID,
    },
  };

  return new Promise((resolve, reject) => {
    axios
      .put(api, data, config)
      .then(resolve)
      .catch(err => {
        reject(err.response);
        handleAuthorization(err.response?.status);
      });
  });
};

const handleAuthorization = status => {
  if (status !== 401) return;
  AsyncStorage.clear();
};
