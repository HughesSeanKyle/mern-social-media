import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import { dbConnection } from './models/db/connection.js';
// add dummy data
import User from './models/User.js';
import Post from './models/Post.js';
import { users, posts } from './data/index.js';

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

/* ROUTES */
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

/* TEST ROUTE */
app.get('/test-get', (req, res) => {
	res.send('Hello from the root route. Update, Two three four ');
});

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 3001;

dbConnection()
	.then(() => {
		app.listen(PORT, () => console.log(`Connected to Server Port: ${PORT}`));

		/* ADD DATA ONE TIME */
		// User.insertMany(users);
		// Post.insertMany(posts);
	})
	.catch((error) => console.log(`${error} did not connect`));
