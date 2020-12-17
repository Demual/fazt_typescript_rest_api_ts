// Imports //
import { Request, Response, Router } from 'express';

// Class //
class IndexRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    };
    routes() {
        this.router.get('/hello', (req: Request, res: Response) => res.json({ message: 'NodeJS and TypeScript' }));
        this.router.get('/', (req: Request, res: Response) => res.json({ message: 'Api: /api/posts' }));
    };
};

let indexRoutes = new IndexRoutes();
indexRoutes.routes();

export default indexRoutes.router;