import { Router } from 'express';

import AgentRoutes from './modules/AgentRoutes';
import VuewAdminElementThemeRoutes from './modules/VuewAdminElementThemeRoutes';

const router = Router();

router.use(VuewAdminElementThemeRoutes);
router.use(AgentRoutes);

router.all('*', (req, res) => {
    res.render('index', { msg: 'Hello From Anas Traders.' });
});

export default router;
