require('dotenv').config();
const express = require('express');
const router = express.Router();

const { Site }  = require('../models');


const getAll = async(req, res) => {
    
    try {
        const sites = await Site.find({});
        
        res.json({sites: sites})
        
    } catch (error) {
        console.log('Error inside of /api/sites')
        console.log(error);
        return res.status(400).json({ message: 'site not found. Please try again.' });
        
    }
    
}
    
    const getById = async(req, res) => {
        const { id } = req.params;
        console.log(req.query)
        try {
    
            const site = await Site.findById(id);
            res.json({ site });
        } catch (error) {
            console.log('Error inside of /api/site/:id');
            console.log(error);
            return res.status(400).json({ message: 'Site not found. Try again...' });
        }
    }
    
const create = async(req, res) => {
    console.log(req.body)
   

    try {
        const newSite = await Site.create(req.body);
        console.log('new site created', newSite);
        res.json({ site: newSite });

    } catch (error) {
        console.log('Error inside of POST of /api/site');
        console.log(error);
        return res.status(400).json({ message: 'site was not added. Please try again...' });
    }
}

const update = async(req, res) => {
    console.log(req.body);
    try {

        const updatedSite = await Site.findByIdAndUpdate( req.params.id, req.body); // updating the site
        const site = await Site.findById(req.params.id);


        console.log(updatedSite); 
        console.log(site); 

        res.json({ site: updatedSite });

    } catch (error) {
        console.log('Error inside of UPDATE route');
        console.log(error);
        return res.status(400).json({ message: 'site could not be updated. Please try again...' });
    }
}

const deleteSite = async(req, res) => {
    const { id } = req.params;
    try {
        console.log(id);
        const result = await Site.findByIdAndRemove(id);
        console.log(result);
        res.json({site: result})
    } catch (error) {
        console.log('inside of DELETE route');
        console.log(error);
        return res.status(400).json({ message: 'site was not deleted. Please try again...' });
    }
}


// GET -> /api/site/
router.get('/', getAll);
// GET -> /api/site/:id
router.get('/:id', getById);
// POST -> /api/site/
router.post('/', create)

router.put('/:id', update)

router.delete('/:id', deleteSite);

module.exports = router;