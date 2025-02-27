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

    Router.post('/resources', async (req, res) => {
        try {
            const resource = new Resource(req.body);
            await resource.save();
            res.status(201).json(resource);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    Router.post('/submit', async (req, res) => {
        try {
            const resource = new Resource({
                name: req.body.name,
                url: req.body.url,
                description: req.body.description,
                image: req.body.image,
                categories: req.body.categories
            });
            await resource.save();
            res.status(201).json(resource);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });
      
    Router.get('/resources/:id', async (req, res) => {
        try {
            const resource = await Resource.findById(req.params.id);
            if (!resource) {
                return res.status(404).json({ error: 'data not found' });
            }
            res.json(resource);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
      
    Router.put('/resources/:id', async (req, res) => {
        try {
            const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!resource) {
                return res.status(404).json({ error: 'data not found' });
            }
            res.json(resource);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });
      
    Router.delete('/resources/:id', async (req, res) => {
        try {
            const resource = await Resource.findByIdAndDelete(req.params.id);
            if (resource) {
              return res.status(200).json( 'data has been deleted' );
            }
              else {
                return res.status(404).json({ error: 'data not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

export default Router