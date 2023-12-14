import axios from 'axios';
const token="ok"

// const token = localStorage.getItem('yourTokenKey'); // change with sessionStorage 
const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    Authorization: `Bearer ${token}`
  }
});
if (token) {
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
export default apiClient;
