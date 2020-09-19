import { Router } from 'express';

const router = Router();

router.all('/vue-element-admin/user/login', (req, res) => {
    res.json({ code: 20000, data: { token: 'JWT_TOKEN' } });
});

router.all('/vue-element-admin/user/info', (req, res) => {
    res.json({
        code: 20000,
        data: {
            roles: ['admin'],
            name: 'Anas',
            avatar:
                'http://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            introduction: 'Owner of Anas Traders',
        },
    });
});

export default router;
