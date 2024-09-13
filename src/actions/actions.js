import axios from 'axios';
import { httpToMqtt, httpToBackend } from '../utils/http';

export async function fetchMqttTopics() {
  return httpToMqtt
    .get('/topics', {
      auth: {
        //aws mqtt
        username: 'freeflow',
        password: 'KTiO9BpJ9BLrJA6mfaQzEkWOp59Bpt9AI9CxLhKhzPpd64fI',
        //office mqtt
        // username: 'b10b96e9d6812ea0',
        // password: 'C9Bvjura7Y2T0GWYYugana7lNDbkb8Ib38lN62yrhuqB',
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

export async function fetchAllNodeRed() {
  const params = {
    tenant_name: 'dt',
    component_name: 'nodered',
  };
  return httpToBackend
    .get('/tenant/component/get', { params: params })
    .then((res) => {
      console.log(res);
      return res.data;
    });
}

export async function fetchNodeRedByName(name) {
  const params = {
    tenant_name: 'dt',
    component_name: name,
  };
  return httpToBackend
    .get('/tenant/component/get', { params: params })
    .then((res) => {
      console.log(res);
      return res.data;
    });
}

export async function addNodeRed() {
  const body = {
    tenant_name: 'dt',
    component_name: 'nodered',
  };
  return httpToBackend.post('/tenant/component/add', body).then((res) => {
    console.log(res);
    return res.data;
  });
}

export async function deleteNodeRed(noderedName) {
  const body = {
    tenant_name: 'dt',
    component_name: noderedName,
  };
  return httpToBackend.post('/tenant/component/delete', body).then((res) => {
    console.log(res);
    return res.data;
  });
}

export async function fetchAllGrafana() {
  const params = {
    tenant_name: 'dt',
    component_name: 'grafana',
  };
  return httpToBackend
    .get('/tenant/component/get', { params: params })
    .then((res) => {
      console.log(res);
      return res.data;
    });
}

export async function fetchGrafanaByName(name) {
  const params = {
    tenant_name: 'dt',
    component_name: name,
  };
  return httpToBackend
    .get('/tenant/component/get', { params: params })
    .then((res) => {
      console.log(res);
      return res.data;
    });
}

export async function addGrafana() {
  const body = {
    tenant_name: 'dt',
    component_name: 'grafana',
  };
  return httpToBackend.post('/tenant/component/add', body).then((res) => {
    console.log(res);
    return res.data;
  });
}

export async function deleteGrafana(grafanaName) {
  const body = {
    tenant_name: 'dt',
    component_name: grafanaName,
  };
  return httpToBackend.post('/tenant/component/delete', body).then((res) => {
    console.log(res);
    return res.data;
  });
}
