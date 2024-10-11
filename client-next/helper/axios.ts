import axios from 'axios';

const api = axios.create({
	baseURL: 'http://47.128.81.197:5500/api',
});

export default api;
