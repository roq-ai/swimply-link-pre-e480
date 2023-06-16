import axios from 'axios';
import queryString from 'query-string';
import { PreviewPageInterface, PreviewPageGetQueryInterface } from 'interfaces/preview-page';
import { GetQueryInterface } from '../../interfaces';

export const getPreviewPages = async (query?: PreviewPageGetQueryInterface) => {
  const response = await axios.get(`/api/preview-pages${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createPreviewPage = async (previewPage: PreviewPageInterface) => {
  const response = await axios.post('/api/preview-pages', previewPage);
  return response.data;
};

export const updatePreviewPageById = async (id: string, previewPage: PreviewPageInterface) => {
  const response = await axios.put(`/api/preview-pages/${id}`, previewPage);
  return response.data;
};

export const getPreviewPageById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/preview-pages/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePreviewPageById = async (id: string) => {
  const response = await axios.delete(`/api/preview-pages/${id}`);
  return response.data;
};
