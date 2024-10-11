import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import routes from './api/routes';

const PORT = process.env.PORT || 3000;
const server = express();

// config server
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan('dev'));
// config api
server.use('/api', routes);

server.listen(PORT, () => {
	console.log(`[⚡️server]: Server is running on http://localhost:${PORT}`);
});
