import { Router } from 'express';
import {
  addUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '../controllers/users.controller';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', addUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
