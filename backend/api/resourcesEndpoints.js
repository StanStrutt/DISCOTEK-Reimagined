import Resource from "../models/Resource.js"
import router from "express"

const Router = router()

    Router.get('/resources', async (req, res) => {
        try {
            const resources = await Resource.find();
            res.json(resources);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

export default Router