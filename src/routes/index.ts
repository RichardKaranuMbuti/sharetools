import { Router } from 'express';
import authRoutes from './authRoutes';

// Create main router instance
const router = Router();

// Register all routes
router.use('/auth', authRoutes);
// Add other routes as they are created, for example:
// router.use('/tools', toolRoutes);
// router.use('/members', memberRoutes);

// This route can be used to verify the router is working
router.get('/status', (req, res) => {
  res.json({ status: 'Router is functioning properly' });
});

export default router;