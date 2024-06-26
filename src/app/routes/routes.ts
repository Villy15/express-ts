import { Router } from 'express';
import authController from '../api/auth/auth.controller';
import postsController from '../api/posts/posts.controller';
import usersController from '../api/users/users.controller';

const controllers = [postsController, usersController, authController];

const api = Router();

controllers.forEach(controller => {
  api.use(controller);
});

export default Router().use('/api', api);
