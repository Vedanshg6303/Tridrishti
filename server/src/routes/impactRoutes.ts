import { Router } from 'express';
import { getImpactProjects } from '../controllers/impactController';

const router = Router();

router.get('/projects', getImpactProjects);

export default router;
