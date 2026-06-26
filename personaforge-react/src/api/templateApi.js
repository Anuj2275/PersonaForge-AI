import api from './axios';

export const getTemplates = () =>
  api.get('/templates');

export default {
  getTemplates,
};
