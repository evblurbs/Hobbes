import axios from 'axios';
import { db } from '../config/constants';
const FB_URL = 'https://us-central1-hobbes-e64a1.cloudfunctions.net';

export function login (email, name) {
  return axios.post(`${FB_URL}/login`, {
    email,
    name,
  })
  .catch((error) => {
    console.log('error', error);
  });
}

export function updateOwner (data) {
  return axios.post(`${FB_URL}/updateOwner`, data)
  .catch((error) => {
    console.log('error', error);
  });
}

export function inviteUser (data) {
  return axios.post(`${FB_URL}/inviteUser`, data)
  .catch((error) => {
    console.log('error', error);
  });
}

export function updatePupProfile (pupId, data) {
  return db.collection('pups').doc(pupId).update(data)
}

export function addLog (pupId, log) {
  return axios.post(`${FB_URL}/addLog`, {
    pupId: pupId,
    data: log,
  });
}

export function deleteLog (pupId, logId) {
  return axios.post(`${FB_URL}/deleteLog`, {
    pupId: pupId,
    logId: logId,
  });
}