import express, { Router } from 'express';
import {
  downloadSong,
  getAllSongs,
  getSongById,
  streamSong,
} from '../controllers/songControllers';

const router: Router = express.Router();

router.use(express.json());

router.get('/', getAllSongs);
router.get('/:id', getSongById);
router.get('/download/:songId', downloadSong);
router.get('/stream/:songId', streamSong);

export default router;
