import { Router } from 'express';
import {
  createPresentation,
  getPresentation,
  listPresentations,
  removePresentation
} from '../controllers/presentationController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.use(requireAuth);
router.get('/', listPresentations);
router.post('/', createPresentation);
router.get('/:id', getPresentation);
router.delete('/:id', removePresentation);

export default router;
