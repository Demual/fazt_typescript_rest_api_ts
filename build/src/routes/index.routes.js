"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    ;
    routes() {
        this.router.get('/hello', (req, res) => res.json({ message: 'NodeJS and TypeScript' }));
        this.router.get('/', (req, res) => res.json({ message: 'Api: /api/posts' }));
    }
    ;
}
;
let indexRoutes = new IndexRoutes();
indexRoutes.routes();
exports.default = indexRoutes.router;
