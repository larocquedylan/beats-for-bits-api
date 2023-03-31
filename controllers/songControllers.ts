import { Request, Response } from 'express';
import fs from 'fs';
import { Song } from '../interfaces/songs';

export const getAllSongs = async (req: Request, res: Response) => {
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
};

export const getSongById = async (req: Request, res: Response) => {
  const songs = await getSongs();
  const songId = req.params.id;

  const song = songs.find((song: Song) => song.id === songId);

  if (!song) {
    // return res.status(404).json({ error: 'File not found bro!' });
    return handleError(res, 404, 'File not found bro!');
  }

  res.status(200).json(song);
};

export const downloadSong = async (req: Request, res: Response) => {
  const songId = req.params.songId;
  const songList = await getSongs();

  const song = songList.find((song: Song) => song.id === songId);

  if (!song) {
    return handleError(res, 404, 'File not found bro!');
  }

  res.download(`./public/songs/${song.song}`, song.song, (err) => {
    if (err) {
      return handleError(res, 500, 'Something went wrong');
    }
  });
};

export const streamSong = async (req: Request, res: Response) => {
  const songId = req.params.songId;
  const songList = await getSongs();

  const song = songList.find((song: Song) => song.id === songId);

  if (!song) {
    return handleError(res, 404, 'File not found bro!');
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
        .send('Resquested range not satisfiable\n' + start + ' >= ' + fileSize);
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
};

function handleError(res: Response, statusCode: number, message: string) {
  res.status(statusCode).json({ error: message });
}

async function getSongs() {
  const songsData = await fs.promises.readFile('data/songs.json');
  return JSON.parse(songsData);
}
