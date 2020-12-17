// Imports //
import { Request, Response, Router } from 'express';

// Imports schemas //
import postModel from '../models/post.model';

// Class //
class PostRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    };

    public async getPosts(req: Request, res: Response): Promise <void> {
        let allPosts = await postModel.find();
        res.json({ Menssage: 'List of Post', allPosts });
    };

    public async getPost(req: Request, res: Response): Promise <void> {
        let postUrl = await postModel.findOne({ url: req.params.url });
        res.json({ Menssage: 'Post Find', postUrl });
    };

    public async createPost(req: Request, res: Response): Promise <void> {
        // let { title, url, content, image } = req.body;
        // let newPost = new postModel({ title, url, content, image });
        let newPost = new postModel(req.body);
        await newPost.save();
        res.json({ Message: 'Post Created', newPost });
    };

    public async updatePost(req: Request, res: Response): Promise <void> {
        let { url } = req.params;
        let postUpdated = await postModel.findOneAndUpdate({ url }, req.body, { new: true });
        res.json({ Menssage: 'Post Updated', postUpdated });
    };
    
    public async deletePost(req: Request, res: Response): Promise <void> {
        let { url } = req.params;
        await postModel.findOneAndDelete({ url });
        res.json({ Message: 'Post Deleted' });
    };

    routes() {
        this.router.get('/', this.getPosts);
        this.router.get('/:url', this.getPost);
        this.router.post('/', this.createPost);
        this.router.put('/:url', this.updatePost);
        this.router.delete('/:url', this.deletePost);
    };
};

let postRoutes = new PostRoutes();
export default postRoutes.router;