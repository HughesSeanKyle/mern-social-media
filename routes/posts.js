import express from 'express';
import { upload } from '../middleware/multer/upload.js';
import {
	createPost,
	getFeedPosts,
	getUserPosts,
	likePost,
} from '../controllers/posts.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/* CREATE */
router.post('/post', upload.single('picture'), createPost);

/* READ */
router.get('/', verifyToken, getFeedPosts);
router.get('/:userId/posts', verifyToken, getUserPosts);

/* UPDATE */
router.patch('/:id/like', verifyToken, likePost);

export default router;
