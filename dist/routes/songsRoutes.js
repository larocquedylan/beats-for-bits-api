"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import res from 'express/lib/response';
const fs_1 = __importDefault(require("fs"));
const router = express_1.default.Router();
router.use(express_1.default.json());
// get all songs endpoint for gallery
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songs = yield getSongs();
    const songList = songs.map(({ id, title, song, image, alt, author, vibes, lyrics, download, }) => {
        return { id, title, song, image, alt, author, vibes, lyrics, download };
    });
    res.status(200).json(songList);
}));
// get a specific song for details page
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songs = yield getSongs();
    const songId = req.params.id;
    const song = songs.find((song) => song.id === songId);
    if (!song) {
        return res.status(404).json({ error: 'File not found bro!' });
    }
    res.status(200).json(song);
}));
// download individual song
router.get('/download/:songId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songId = req.params.songId;
    const songList = yield getSongs();
    const song = songList.find((song) => song.id === songId);
    if (!song) {
        return res.status(404).json({ error: 'File not found bro!' });
    }
    try {
        res.download(`./public/songs/${songId}.wav`);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error while downloading song' });
    }
}));
// stream
router.get('/stream/:songId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songId = req.params.songId;
    const songList = yield getSongs();
    const song = songList.find((song) => song.id === songId);
    if (!song) {
        return res.status(404).json({ error: 'File not found bro!' });
    }
    const filePath = `./public/songs/${songId}.wav`;
    const stat = fs_1.default.statSync(filePath);
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
        const file = fs_1.default.createReadStream(filePath, { start, end });
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'audio/wav',
        };
        res.writeHead(206, head);
        file.pipe(res);
    }
    else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'audio/wav',
        };
        res.writeHead(200, head);
        fs_1.default.createReadStream(filePath).pipe(res);
    }
}));
// read song data
function getSongs() {
    return __awaiter(this, void 0, void 0, function* () {
        const songsData = yield fs_1.default.promises.readFile('data/songs.json');
        return JSON.parse(songsData);
    });
}
// get all songs
// async function getAllSongs() {
//   const songs = await getSongs();
//   const songList = songs.map(({ id, title, song, image }: Song) => {
//     return { id, title, song, image };
//   });
//   res.status(200).json(songList);
// }
function handleError(res, statusCode, message) {
    res.status(statusCode).json({ error: message });
}
exports.default = router;
