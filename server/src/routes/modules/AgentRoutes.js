import { Router } from 'express';
import AgentService from '../../db/AgentService';

const router = Router();
const agentService = new AgentService();

router.get('/agents', async (req, res) => {
    try {
        const agents = await agentService.getAll();
        res.json(agents);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error.');
    }
});

export default router;
