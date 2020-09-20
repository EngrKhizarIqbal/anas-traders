import { Router } from 'express';

import AgentRoutes from './modules/AgentRoutes';
import ShopRoutes from './modules/ShopRoutes';
import VuewAdminElementThemeRoutes from './modules/VuewAdminElementThemeRoutes';

const router = Router();

router.use(VuewAdminElementThemeRoutes);
router.use(AgentRoutes);
router.use(ShopRoutes);

router.all('*', (req, res) => {
    res.render('index', { msg: 'Hello From Anas Traders.' });
});

export default router;
