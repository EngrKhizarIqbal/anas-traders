import { Router } from 'express';
import ShopService from '../../db/ShopService';
import { getPaginationParams } from '../../helpers/requestQueryHelpers';

const router = Router();
const shopService = new ShopService();

router.get('/shops', async (req, res) => {
    try {
        const paginationData = getPaginationParams(req);
        const shops = await shopService.getAll(paginationData);

        res.json({ code: 20000, data: { shops } });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error.');
    }
});

router.post('/shops', async (req, res) => {
    try {
        const { name, address } = req.body;
        await shopService.addShop({ name, address });

        res.json({ code: 20000 });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error.');
    }
});

router.patch('/shops', async (req, res) => {
    try {
        const { id, name, address } = req.body;
        await shopService.updateShop({ id, name, address });

        res.json({ code: 20000 });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error.');
    }
});

router.delete('/shops', async (req, res) => {
    try {
        const { id } = req.body;
        await shopService.removeShops([id]);

        res.json({ code: 20000 });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error.');
    }
});

export default router;
