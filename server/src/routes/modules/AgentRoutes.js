import { Router } from 'express';
import AgentService from '../../db/AgentService';
import { getPaginationParams } from '../../helpers/requestQueryHelpers';

const router = Router();
const agentService = new AgentService();

router.get('/agents', async (req, res) => {
    try {
        const paginationData = getPaginationParams(req);
        const agents = await agentService.getAll(paginationData);

        res.json({ code: 20000, data: { agents } });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error.');
    }
});

router.post('/agents', async (req, res) => {
    try {
        const { name } = req.body;
        await agentService.add({ name });

        res.json({ code: 20000 });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error.');
    }
});

router.patch('/agents', async (req, res) => {
    try {
        const { id, name } = req.body;
        await agentService.update({ name, id });

        res.json({ code: 20000, data: { id, name } });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error.');
    }
});

router.delete('/agents', async (req, res) => {
    try {
        const { id } = req.body;
        await agentService.delete([id]);

        res.json({ code: 20000, data: { id } });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error.');
    }
});

export default router;
