import axios from 'axios';

// Use deployed backend for both Dev and Prod (Frontend-Only Mode)
const API_BASE_URL = 'https://my-portfolio-s2nv.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Projects API
export const getAllProjects = () => api.get('/projects');
export const getFeaturedProjects = () => api.get('/projects/featured');
export const getProjectById = (id) => api.get(`/projects/${id}`);

// Skills API
export const getAllSkills = () => api.get('/skills');
export const getSkillsByCategory = (category) => api.get(`/skills/category/${category}`);

// Contact API
export const submitContact = (data) => api.post('/contact', data);

export default api;
