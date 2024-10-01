import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const server = express();

// init
const PORT = 5500 || process.env.PORT;

server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

const startupServer = () => {
	server.listen(PORT, () => {
		console.log(`[⚡️ server]: Server started at http://localhost:${PORT}`);
	});
};

startupServer();
