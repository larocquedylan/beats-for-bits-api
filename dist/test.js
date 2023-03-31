"use strict";
// Import necessary modules and dependencies
// ...
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
test('GET / should return a list of songs', () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('title');
    // ... test other properties
}));
// Import necessary modules and dependencies
// ...
test('GET /:id should return a specific song', () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield request(app).get('/1'); // Assuming there's a song with ID '1'
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', '1');
    expect(response.body).toHaveProperty('title');
    // ... test other properties
}));
// Import necessary modules and dependencies
// ...
test('GET /download/:songId should return a file', () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield request(app).get('/download/1');
})); // Assuming there's a song with
