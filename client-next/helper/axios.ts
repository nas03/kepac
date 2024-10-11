import axios from 'axios';

const api = axios.create({
	baseURL: 'https://kepac.onrender.com/api',
});

export default api;
