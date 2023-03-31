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
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const songRoutes_1 = __importDefault(require("../routes/songRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/songs', songRoutes_1.default);
describe('Song routes', () => {
    it('GET /songs - should return all songs', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get('/songs');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        res.body.forEach((song) => {
            expect(song).toHaveProperty('id');
            expect(song).toHaveProperty('title');
            expect(song).toHaveProperty('song');
            expect(song).toHaveProperty('image');
        });
    }));
    it('GET /songs/:id - should return a specific song', () => __awaiter(void 0, void 0, void 0, function* () {
        const validId = '1'; // Replace this with a valid song ID from your data
        const res = yield (0, supertest_1.default)(app).get(`/songs/${validId}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('id', validId);
        const invalidId = 'nonexistent-id';
        const res2 = yield (0, supertest_1.default)(app).get(`/songs/${invalidId}`);
        expect(res2.status).toBe(404);
    }));
    it('GET /songs/download/:songId - should download a song', () => __awaiter(void 0, void 0, void 0, function* () {
        const validId = '1'; // Replace this with a valid song ID from your data
        const res = yield (0, supertest_1.default)(app).get(`/songs/download/${validId}`);
        expect(res.status).toBe(200);
        expect(res.header['content-type']).toBe('audio/wav');
        const invalidId = 'nonexistent-id';
        const res2 = yield (0, supertest_1.default)(app).get(`/songs/download/${invalidId}`);
        expect(res2.status).toBe(404);
    }));
    it('GET /songs/stream/:songId - should stream a song', () => __awaiter(void 0, void 0, void 0, function* () {
        const validId = '1'; // Replace this with a valid song ID from your data
        const res = yield (0, supertest_1.default)(app)
            .get(`/songs/stream/${validId}`)
            .set('Range', 'bytes=0-');
        expect(res.status).toBe(206);
        expect(res.header['content-type']).toBe('audio/wav');
        expect(res.header).toHaveProperty('content-range');
        expect(res.header).toHaveProperty('accept-ranges');
        expect(res.header).toHaveProperty('content-length');
        const invalidId = 'nonexistent-id';
        const res2 = yield (0, supertest_1.default)(app).get(`/songs/stream/${invalidId}`);
        expect(res2.status).toBe(404);
    }));
});
