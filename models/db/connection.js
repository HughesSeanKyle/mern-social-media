import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

export const dbConnection = () => {
	return mongoose.connect(process.env.MONGO_DB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
};
