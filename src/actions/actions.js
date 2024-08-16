import axios from 'axios';
import { httpToMqtt } from '../utils/http';

export async function fetchMqttTopics() {
  return httpToMqtt
    .get('/topics', {
      auth: {
        username: 'b10b96e9d6812ea0',
        password: 'C9Bvjura7Y2T0GWYYugana7lNDbkb8Ib38lN62yrhuqB',
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      console.log(res);
      return res.data;
    });
}
