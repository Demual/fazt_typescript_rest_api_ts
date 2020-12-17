"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const post_routes_1 = __importDefault(require("./routes/post.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
class Server {
    constructor() {
        this.server = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        let MONGO_URI = 'mongodb://localhost:27017/databasets';
        mongoose_1.default.set('useFindAndModify', false);
        mongoose_1.default.connect(MONGO_URI || process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
            .then(() => console.log('Database is connected'))
            .catch((err) => console.log('Database NOT connected', err));
        this.server.set('port', process.env.PORT || 3000);
        this.server.use(compression_1.default());
        this.server.use(helmet_1.default());
        this.server.use(morgan_1.default('dev'));
        this.server.use(cors_1.default());
        this.server.use(express_1.default.json());
        this.server.use(express_1.default.urlencoded({ extended: false }));
    }
    ;
    routes() {
        this.server.use(index_routes_1.default);
        this.server.use('/api/posts', post_routes_1.default);
        this.server.use('/api/users', user_routes_1.default);
    }
    ;
    start() {
        this.server.listen(this.server.get('port'), () => console.log(`Server on port ${this.server.get('port')}`));
    }
    ;
}
exports.Server = Server;
;
