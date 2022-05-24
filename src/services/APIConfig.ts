import axios from 'axios';

export const API = axios.create({
  baseURL: process.env.REACT_APP_MAIN_API_HOST,
  headers: {
    "Content-type": "application/json"
  }
});