// Imports //
import { Request, Response, Router } from 'express';

// Imports schemas //
import userModel from '../models/user.model';

// Class //
class UserRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    };

    public async getUsers(req: Request, res: Response): Promise <void> {
        let allUsers = await userModel.find();
        res.json({ Message: 'List of Users', allUsers});
    };

    public async getUser(req: Request, res: Response): Promise <void> {
        let userUrl = await userModel.findOne({ username: req.params.username }).populate('posts -_id');
        res.json({ Message: 'User Find', userUrl} );
    };

    public async createUser(req: Request, res: Response): Promise <void> {
        // let { name, email, password, username } = req.body;
        // let newUser = new userModel({ name, email, password, username });
        let newUser = new userModel(req.body);
        await newUser.save();
        res.json({ Message: 'User Created', newUser});
    };

    public async updateUser(req: Request, res: Response): Promise <void> {
        let { username } = req.params; 
        let userUpdated = await userModel.findOneAndUpdate({ username }, req.body, { new: true });
        res.json({ Message: 'User Updated', userUpdated});
    };
    
    public async deleteUser(req: Request, res: Response): Promise <void> {
        let { username } = req.params;
        await userModel.findOneAndDelete({ username });
        res.json({ Message: 'User Deleted' });
    };

    routes() {
        this.router.get('/', this.getUsers);
        this.router.get('/:username', this.getUser);
        this.router.post('/', this.createUser);
        this.router.put('/:username', this.updateUser);
        this.router.delete('/:username', this.deleteUser);
    };
};

let userRoutes = new UserRoutes();
export default userRoutes.router;