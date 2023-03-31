import express, { Request, Response, Router } from 'express';
// import res from 'express/lib/response';
import fs from 'fs';
import { Song } from '../interfaces/songs';

const router: Router = express.Router();

router.use(express.json());

// get all songs endpoint for gallery
router.get('/', async (req: Request, res: Response) => {
  const songs = await getSongs();

  const songList = songs.map(
    ({
      id,
      title,
      song,
      image,
      alt,
      author,
      vibes,
      lyrics,
      download,
    }: Song) => {
      return { id, title, song, image, alt, author, vibes, lyrics, download };
    }
  );

  res.status(200).json(songList);
});

// get a specific song for details page
router.get('/:id', async (req: Request, res: Response) => {
  const songs = await getSongs();
  const songId = req.params.id;

  const song = songs.find((song: Song) => song.id === songId);

  if (!song) {
    return res.status(404).json({ error: 'File not found bro!' });
  }

  res.status(200).json(song);
});

// download individual song
router.get('/download/:songId', async (req: Request, res: Response) => {
  const songId = req.params.songId;
  const songList = await getSongs();

  const song = songList.find((song: Song) => song.id === songId);

  if (!song) {
    return res.status(404).json({ error: 'File not found bro!' });
  }

  try {
    res.download(`./public/songs/${songId}.wav`);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error while downloading song' });
  }
});

// stream
router.get('/stream/:songId', async (req: Request, res: Response) => {
  const songId = req.params.songId;
  const songList = await getSongs();

  const song = songList.find((song: Song) => song.id === songId);

  if (!song) {
    return res.status(404).json({ error: 'File not found bro!' });
  }

  const filePath = `./public/songs/${songId}.wav`;
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    if (start >= fileSize) {
      res
        .status(416)
        .send('Requested range not satisfiable\n' + start + ' >= ' + fileSize);
      return;
    }

    const chunksize = end - start + 1;
    const file = fs.createReadStream(filePath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'audio/wav',
    };

    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'audio/wav',
    };
    res.writeHead(200, head);
    fs.createReadStream(filePath).pipe(res);
  }
});

// read song data
async function getSongs() {
  const songsData = await fs.promises.readFile('data/songs.json');
  return JSON.parse(songsData);
}

// get all songs
// async function getAllSongs() {
//   const songs = await getSongs();

//   const songList = songs.map(({ id, title, song, image }: Song) => {
//     return { id, title, song, image };
//   });

//   res.status(200).json(songList);
// }

function handleError(res: Response, statusCode: number, message: string) {
  res.status(statusCode).json({ error: message });
}

export default router;