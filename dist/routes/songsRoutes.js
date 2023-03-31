"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const songControllers_1 = require("../controllers/songControllers");
const router = express_1.default.Router();
router.use(express_1.default.json());
router.get('/', songControllers_1.getAllSongs);
router.get('/:id', songControllers_1.getSongById);
router.get('/download/:songId', songControllers_1.downloadSong);
router.get('/stream/:songId', songControllers_1.streamSong);
exports.default = router;
