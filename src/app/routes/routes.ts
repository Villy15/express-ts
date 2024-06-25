import { Router } from 'express';
import postsController from '../api/posts/posts.controller';
import usersController from '../api/users/users.controller';

const api = Router().use(postsController).use(usersController);

export default Router().use('/api', api);
