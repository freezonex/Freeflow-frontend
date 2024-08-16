import axios from 'axios';

export const httpToMqtt = axios.create({
  baseURL: '/mqttapi',
  withCredentials: true,
  timeout: 100000,
});
