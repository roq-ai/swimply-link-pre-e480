import axios from 'axios';
import queryString from 'query-string';
import { HostInterface, HostGetQueryInterface } from 'interfaces/host';
import { GetQueryInterface } from '../../interfaces';

export const getHosts = async (query?: HostGetQueryInterface) => {
  const response = await axios.get(`/api/hosts${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createHost = async (host: HostInterface) => {
  const response = await axios.post('/api/hosts', host);
  return response.data;
};

export const updateHostById = async (id: string, host: HostInterface) => {
  const response = await axios.put(`/api/hosts/${id}`, host);
  return response.data;
};

export const getHostById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/hosts/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteHostById = async (id: string) => {
  const response = await axios.delete(`/api/hosts/${id}`);
  return response.data;
};
