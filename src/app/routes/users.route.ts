import { Router } from 'express';
import {
  addUser,
  deleteAllUsers,
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
router.delete('/', deleteAllUsers);

export default router;
