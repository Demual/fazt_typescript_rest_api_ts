// Imports //
import express from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';

// Imports routes //
import indexRoutes from './routes/index.routes';
import postRoutes from './routes/post.routes';
import userRoutes from './routes/user.routes';

// Class //
class Server {
    public server: express.Application;
    constructor() {
        this.server = express();
        this.config();
        this.routes();
    }
    config() {
        // Mongoose //
        let MONGO_URI = 'mongodb://localhost:27017/databasets';
        mongoose.set('useFindAndModify', false);
        mongoose.connect(MONGO_URI || process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        .then(() => console.log('Database is connected'))
        .catch((err) => console.log('Database NOT connected', err));

        // Settings //
        this.server.set('port', process.env.PORT || 3000);

        // Middlewares //
        this.server.use(compression());
        this.server.use(helmet());
        this.server.use(morgan('dev'));
        this.server.use(cors());
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: false }));
    };
    routes() {
        this.server.use(indexRoutes);
        this.server.use('/api/posts', postRoutes);
        this.server.use('/api/users', userRoutes);
    };
    start() {
        this.server.listen(this.server.get('port'), () => console.log(`Server on port ${this.server.get('port')}`));
    };
};

// Exports //
export { Server };