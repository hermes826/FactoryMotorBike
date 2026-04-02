import { Router } from 'express';
import multer from 'multer';
import {
  addBikeImage,
  createBike,
  deleteBike,
  deleteBikeImage,
  getBike,
  listBikes,
  updateBike,
} from '../controllers/bikeController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 },
});

router.get('/', listBikes);
router.get('/:id', getBike);
router.post('/', protect, createBike);
router.put('/:id', protect, updateBike);
router.delete('/:id', protect, deleteBike);
router.post('/:id/images', protect, upload.single('file'), addBikeImage);
router.delete('/:id/images/:imagePath(*)', protect, deleteBikeImage);

export default router;
