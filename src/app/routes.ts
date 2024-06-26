import { Router } from 'express';
import authController from './auth/auth.controller';
import postsController from './posts/posts.controller';
import usersController from './users/users.controller';

const controllers = [postsController, usersController, authController];

const api = Router();

controllers.forEach(controller => {
  api.use(controller);
});

export default Router().use('/api', api);
