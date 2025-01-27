import axios from "axios";

// const base_url = "http://localhost:3001"; 
 const base_url = "https://recipiemanagementapp.onrender.com";


export const addRecipeApi = (data) => {
  return axios.post(`${base_url}/recipices`, data);
};


export const getRecipesApi = () => {
  return axios.get(`${base_url}/recipices`);
};


export const deleteRecipeApi = (id) => {
  return axios.delete(`${base_url}/recipices/${id}`);
};

export const updateRecipeApi = (id, data) => {
  return axios.put(`${base_url}/recipices/${id}`, data);
};
