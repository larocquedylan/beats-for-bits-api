"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// install dependcies
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const songsRoutes_1 = __importDefault(require("./routes/songsRoutes"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static('./public'));
const PORT = process.env.PORT || 5050;
app.use('/songs', songsRoutes_1.default);
app.get('/', (req, res) => {
    res.send('hello');
});
app.listen(PORT, () => {
    console.log(` App listening on port ${PORT} `);
});
